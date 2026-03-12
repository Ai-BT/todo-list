# To-Do List

React + FastAPI 풀스택 To-Do List 애플리케이션

## 기술 스택

| 영역 | 기술 |
|---|---|
| **Frontend** | React 18 + Vite |
| **Backend** | FastAPI + SQLAlchemy |
| **Database** | SQLite |
| **HTTP Client** | Axios |

## 주요 기능

- 할 일 CRUD (생성, 조회, 수정, 삭제)
- 우선순위 설정 (High / Medium / Low)
- 필터링 (전체 / 진행중 / 완료)
- 다크모드 토글
- 더블클릭으로 인라인 수정
- 체크박스로 완료/미완료 전환

## 프론트엔드 UI 구조

```
┌─────────────────────────────────────────┐
│  To-Do List                      [🌙]  │  ← 제목 + 다크모드 토글
├─────────────────────────────────────────┤
│  ┌──────────────────────────┐  ┌─────┐ │
│  │ 할 일을 입력하세요...     │  │ 추가│ │  ← 입력 폼
│  └──────────────────────────┘  └─────┘ │
├─────────────────────────────────────────┤
│       [전체]  [진행중]  [완료]          │  ← 필터 버튼
│            3개 남음                     │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ ☐  프로젝트 기획서 작성      [삭제] ││  ← Todo 항목
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ ☑  Git 레포 생성            [삭제] ││  ← 완료된 항목 (취소선)
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ ☐  API 엔드포인트 구현      [삭제] ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## 프로젝트 구조

```
todo-list/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI 진입점
│   │   ├── api/
│   │   │   └── todos.py         # CRUD API (GET/POST/PATCH/DELETE)
│   │   ├── models/
│   │   │   ├── database.py      # DB 연결 설정
│   │   │   └── todo.py          # Todo 모델 (priority 포함)
│   │   └── schemas/
│   │       └── todo.py          # Pydantic 스키마
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── App.jsx              # 메인 앱 (필터, 목록)
    │   ├── components/
    │   │   ├── TodoForm.jsx     # 입력 폼
    │   │   └── TodoItem.jsx     # 개별 항목
    │   ├── context/
    │   │   └── ThemeContext.jsx  # 다크모드 상태 관리
    │   └── services/
    │       └── api.js           # API 호출
    ├── index.html
    └── package.json
```

## API 엔드포인트

| Method | Endpoint | 설명 |
|---|---|---|
| `GET` | `/api/todos/` | 전체 목록 조회 |
| `POST` | `/api/todos/` | 새 할 일 생성 |
| `GET` | `/api/todos/{id}` | 단건 조회 |
| `PATCH` | `/api/todos/{id}` | 수정 (제목, 완료, 우선순위) |
| `DELETE` | `/api/todos/{id}` | 삭제 |
| `GET` | `/api/health` | 서버 상태 확인 |

## 실행 방법

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 개발 히스토리

이 프로젝트는 **Claude Code 멀티 작업 테스트**를 위해 만들어졌습니다.

- `feature-backend` — 우선순위 기능 추가 (worktree 1에서 작업)
- `feature-frontend` — 다크모드 기능 추가 (worktree 2에서 작업)

Git worktree를 활용하여 2개의 터미널에서 동시에 독립적인 기능을 개발하고, 각각 PR로 머지하는 워크플로우를 테스트했습니다.
