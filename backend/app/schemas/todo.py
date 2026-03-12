from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional
from enum import Enum


class PriorityEnum(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"


class TodoCreate(BaseModel):
    title: str
    description: str = ""
    priority: PriorityEnum = PriorityEnum.medium


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[PriorityEnum] = None


class TodoResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
