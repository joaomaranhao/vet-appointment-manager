from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vet Appointment Manager",
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


@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")
