from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func
from database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fullname = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    startupname = Column(String, nullable=True)
    startupurl = Column(String, nullable=True)
    stage = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    lookingfor = Column(ARRAY(String), nullable=True)
    betaperk = Column(String, nullable=True)
    email = Column(String, nullable=True)
    password = Column(String, nullable=True)
    timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=True)
