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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"message": "Lead Genius Backend API with FastAPI is running..."}

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
    print(f"📦 Received order request: {body}")
    try:
        amount = body.get("amount")
        if not amount:
            print("❌ Error: Amount missing in request body")
            raise HTTPException(status_code=400, detail="Amount is required")

        print(f"🔌 Connecting to Razorpay with Key: {RAZORPAY_API_KEY[:10]}...")
        client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))
        
        print("💸 Creating Razorpay order...")
        order = client.order.create({
            "amount": int(amount),
            "currency": "INR",
            "payment_capture": 1
        })
        print(f"✅ Order Created Successfully: {order['id']}")
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": RAZORPAY_API_KEY
        }
    except Exception as e:
        print(f"🔥 Razorpay Error: {str(e)}")
        return JSONResponse(status_code=500, content={"error": f"Failed to create payment order: {str(e)}"})
