import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

key_id = os.getenv("RAZORPAY_API_KEY")
key_secret = os.getenv("RAZORPAY_API_SECRET")

print(f"Testing with Key ID: {key_id}")

try:
    client = razorpay.Client(auth=(key_id, key_secret))
    order = client.order.create({
        "amount": 100,
        "currency": "INR",
        "payment_capture": 1
    })
    print(f"Success! Order ID: {order['id']}")
except Exception as e:
    print(f"Error: {str(e)}")
