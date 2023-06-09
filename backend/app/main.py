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


@app.get(
    "/veterinarians/", response_model=list[schemas.Veterinarian], tags=["veterinarians"]
)
def read_veterinarians(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    veterinarians = crud.get_veterinarians(db, skip=skip, limit=limit)
    return veterinarians


@app.get(
    "/veterinarians/{veterinarian_id}",
    response_model=schemas.Veterinarian,
    tags=["veterinarians"],
)
def read_veterinarian(veterinarian_id: int, db: Session = Depends(get_db)):
    db_veterinarian = crud.get_veterinarian(db, veterinarian_id=veterinarian_id)
    if db_veterinarian is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found",
        )
    return db_veterinarian


@app.post(
    "/veterinarians/", response_model=schemas.Veterinarian, tags=["veterinarians"]
)
def create_veterinarian(
    veterinarian: schemas.VeterinarianCreate, db: Session = Depends(get_db)
):
    return crud.create_veterinarian(db=db, veterinarian=veterinarian)


@app.put(
    "/veterinarians/{veterinarian_id}",
    response_model=schemas.Veterinarian,
    tags=["veterinarians"],
)
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


@app.delete(
    "/veterinarians/{veterinarian_id}",
    response_model=schemas.Veterinarian,
    tags=["veterinarians"],
)
def delete_veterinarian(veterinarian_id: int, db: Session = Depends(get_db)):
    db_veterinarian = crud.get_veterinarian(db, veterinarian_id=veterinarian_id)
    if db_veterinarian is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veterinarian not found",
        )
    return crud.delete_veterinarian(db=db, veterinarian_id=veterinarian_id)


@app.get("/clients/", response_model=list[schemas.Client], tags=["clients"])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clients = crud.get_clients(db, skip=skip, limit=limit)
    return clients


@app.get("/clients/{client_id}", response_model=schemas.Client, tags=["clients"])
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found",
        )
    return db_client


@app.post("/clients/", response_model=schemas.Client, tags=["clients"])
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    return crud.create_client(db=db, client=client)


@app.put("/clients/{client_id}", response_model=schemas.Client, tags=["clients"])
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


@app.delete("/clients/{client_id}", response_model=schemas.Client, tags=["clients"])
def delete_client(client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found",
        )
    return crud.delete_client(db=db, client_id=client_id)


@app.get("/pets/", response_model=list[schemas.Pet], tags=["pets"])
def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets = crud.get_pets(db, skip=skip, limit=limit)
    return pets


@app.get("/pets/{pet_id}", response_model=schemas.Pet, tags=["pets"])
def read_pet(pet_id: int, db: Session = Depends(get_db)):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pet not found",
        )
    return db_pet


@app.post("/pets/", response_model=schemas.Pet, tags=["pets"])
def create_pet(pet: schemas.PetCreate, db: Session = Depends(get_db)):
    return crud.create_pet(db=db, pet=pet)


@app.put("/pets/{pet_id}", response_model=schemas.Pet, tags=["pets"])
def update_pet(
    pet_id: int,
    pet: schemas.PetUpdate,
    db: Session = Depends(get_db),
):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pet not found",
        )
    return crud.update_pet(pet_id=pet_id, db=db, pet=pet)


@app.delete("/pets/{pet_id}", response_model=schemas.Pet, tags=["pets"])
def delete_pet(pet_id: int, db: Session = Depends(get_db)):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pet not found",
        )
    return crud.delete_pet(db=db, pet_id=pet_id)


@app.get(
    "/appointments/", response_model=list[schemas.Appointment], tags=["appointments"]
)
def read_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    appointments = crud.get_appointments(db, skip=skip, limit=limit)
    return appointments


@app.get(
    "/appointments/{appointment_id}",
    response_model=schemas.Appointment,
    tags=["appointments"],
)
def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = crud.get_appointment(db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )
    return db_appointment


@app.post("/appointments/", response_model=schemas.Appointment, tags=["appointments"])
def create_appointment(
    appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)
):
    return crud.create_appointment(db=db, appointment=appointment)


@app.put(
    "/appointments/{appointment_id}",
    response_model=schemas.Appointment,
    tags=["appointments"],
)
def update_appointment(
    appointment_id: int,
    appointment: schemas.AppointmentUpdate,
    db: Session = Depends(get_db),
):
    db_appointment = crud.get_appointment(db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )
    return crud.update_appointment(
        appointment_id=appointment_id, db=db, appointment=appointment
    )


@app.delete(
    "/appointments/{appointment_id}",
    response_model=schemas.Appointment,
    tags=["appointments"],
)
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = crud.get_appointment(db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )
    return crud.delete_appointment(db=db, appointment_id=appointment_id)


@app.get("/", include_in_schema=False)
def docs():
    return RedirectResponse(url="/docs")
