from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
import os
import razorpay
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

import models
import schemas
from database import engine, get_db

RAZORPAY_API_KEY    = os.getenv("RAZORPAY_API_KEY")
RAZORPAY_API_SECRET = os.getenv("RAZORPAY_API_SECRET")

if not RAZORPAY_API_KEY or not RAZORPAY_API_SECRET:
    print("⚠️  WARNING: RAZORPAY_API_KEY or RAZORPAY_API_SECRET is not set in fastapi-backend/.env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
def health_check():
    return {"message": "Lead Genius Backend API with FastAPI is running..."}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    print(f"🔥 GLOBAL ERROR: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"error": f"Internal Server Error: {str(exc)}"}
    )

@app.post("/api/register", response_model=schemas.RegistrationResponse, status_code=status.HTTP_201_CREATED)
def register(reg_in: schemas.RegistrationCreate, db: Session = Depends(get_db)):
    try:
        new_registration = models.Registration(
            fullname=reg_in.fullName,
            email=reg_in.email,
            password=reg_in.password,
            linkedin=reg_in.linkedin,
            startupname=reg_in.startupName,
            startupurl=reg_in.startupUrl,
            stage=reg_in.stage,
            industry=reg_in.industry,
            lookingfor=reg_in.lookingFor,
            betaperk=reg_in.betaPerk
        )
        db.add(new_registration)
        db.commit()
        db.refresh(new_registration)
        print('Registration saved with SQLAlchemy:', new_registration.id)
        return new_registration
    except Exception as e:
        print('Error saving registration with SQLAlchemy:', str(e))
        db.rollback()
        return JSONResponse(status_code=500, content={"error": "Failed to save registration"})

@app.get("/api/registrations", response_model=List[schemas.RegistrationResponse])
def get_registrations(db: Session = Depends(get_db)):
    try:
        registrations = db.query(models.Registration).order_by(desc(models.Registration.timestamp)).all()
        return registrations
    except Exception as e:
        print('Error fetching registrations with SQLAlchemy:', str(e))
        return JSONResponse(status_code=500, content={"error": "Failed to fetch registrations"})

@app.post("/api/create-order")
def create_order(body: dict):
    if not RAZORPAY_API_KEY or not RAZORPAY_API_SECRET:
        return JSONResponse(
            status_code=500,
            content={"error": "Razorpay credentials missing in backend environment"}
        )

    try:
        amount = body.get("amount")
        if amount is None:
            raise HTTPException(status_code=400, detail="Amount is required")
        
        # Razorpay strictly requires an integer for the amount (paise)
        try:
            amount_val = int(float(amount))
        except (ValueError, TypeError):
            raise HTTPException(status_code=400, detail="Invalid amount format")

        if amount_val <= 0:
            raise HTTPException(status_code=400, detail="Amount must be greater than 0")

        client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))
        
        order_params = {
            "amount": amount_val,
            "currency": "INR",
            "payment_capture": 1
        }
        
        order = client.order.create(order_params)
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": RAZORPAY_API_KEY
        }
    except HTTPException as he:
        return JSONResponse(status_code=he.status_code, content={"error": he.detail})
    except Exception as e:
        print(f"Razorpay Order Error: {str(e)}")
        return JSONResponse(status_code=500, content={"error": f"Razorpay error: {str(e)}"})
