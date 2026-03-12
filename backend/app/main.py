from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.todos import router as todo_router
from app.models.database import engine, Base

# 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI(title="To-Do List API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo_router, prefix="/api/todos", tags=["todos"])


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
