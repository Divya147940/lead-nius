from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class RegistrationCreate(BaseModel):
    fullName: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    linkedin: Optional[str] = None
    startupName: Optional[str] = None
    startupUrl: Optional[str] = None
    stage: Optional[str] = None
    industry: Optional[str] = None
    lookingFor: Optional[List[str]] = None
    betaPerk: Optional[str] = None

class RegistrationResponse(BaseModel):
    id: int
    fullname: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    linkedin: Optional[str] = None
    startupname: Optional[str] = None
    startupurl: Optional[str] = None
    stage: Optional[str] = None
    industry: Optional[str] = None
    lookingfor: Optional[List[str]] = None
    betaperk: Optional[str] = None
    timestamp: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
