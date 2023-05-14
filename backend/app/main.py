from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vet Appointment Manager",
)


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/veterinarians/", response_model=list[schemas.Veterinarian])
def read_veterinarians(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    veterinarians = crud.get_veterinarians(db, skip=skip, limit=limit)
    return veterinarians


@app.get("/veterinarians/{veterinarian_id}", response_model=schemas.Veterinarian)
def read_veterinarian(veterinarian_id: int, db: Session = Depends(get_db)):
    db_veterinarian = crud.get_veterinarian(db, veterinarian_id=veterinarian_id)
    if db_veterinarian is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found",
        )
    return db_veterinarian


@app.post("/veterinarians/", response_model=schemas.Veterinarian)
def create_veterinarian(
    veterinarian: schemas.VeterinarianCreate, db: Session = Depends(get_db)
):
    return crud.create_veterinarian(db=db, veterinarian=veterinarian)


@app.put("/veterinarians/{veterinarian_id}", response_model=schemas.Veterinarian)
def update_veterinarian(
    veterinarian_id: int,
    veterinarian: schemas.VeterinarianUpdate,
    db: Session = Depends(get_db),
):
    db_veterinarian = crud.get_veterinarian(db, veterinarian_id=veterinarian_id)
    if db_veterinarian is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found",
        )
    return crud.update_veterinarian(vet_id=veterinarian_id, db=db, vet=veterinarian)


@app.delete("/veterinarians/{veterinarian_id}", response_model=schemas.Veterinarian)
def delete_veterinarian(veterinarian_id: int, db: Session = Depends(get_db)):
    db_veterinarian = crud.get_veterinarian(db, veterinarian_id=veterinarian_id)
    if db_veterinarian is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found",
        )
    return crud.delete_veterinarian(db=db, veterinarian_id=veterinarian_id)


@app.get("/clients/", response_model=list[schemas.Client])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clients = crud.get_clients(db, skip=skip, limit=limit)
    return clients


@app.get("/clients/{client_id}", response_model=schemas.Client)
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found",
        )
    return db_client


@app.post("/clients/", response_model=schemas.Client)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    return crud.create_client(db=db, client=client)


@app.put("/clients/{client_id}", response_model=schemas.Client)
def update_client(
    client_id: int,
    client: schemas.ClientUpdate,
    db: Session = Depends(get_db),
):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found",
        )
    return crud.update_client(client_id=client_id, db=db, client=client)


@app.delete("/clients/{client_id}", response_model=schemas.Client)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found",
        )
    return crud.delete_client(db=db, client_id=client_id)


@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")
