from fastapi import Body, HTTPException
from sqlalchemy.orm import Session

from . import models, schemas


def get_veterinarian(db: Session, veterinarian_id: int):
    return (
        db.query(models.Veterinarian)
        .filter(models.Veterinarian.id == veterinarian_id)
        .first()
    )


def get_veterinarians(db: Session, skip: int = 0, limit: int = 100):
    veterinarians = db.query(models.Veterinarian).offset(skip).limit(limit).all()
    return veterinarians


def create_veterinarian(db: Session, veterinarian: schemas.VeterinarianCreate):
    db_veterinarian = models.Veterinarian(
        nome=veterinarian.nome,
        cpf=veterinarian.cpf,
        telefone=veterinarian.telefone,
        email=veterinarian.email,
        especialidade=veterinarian.especialidade,
    )
    db.add(db_veterinarian)
    db.commit()
    db.refresh(db_veterinarian)
    return db_veterinarian


def update_veterinarian(
    vet_id: int, db: Session, vet: schemas.VeterinarianUpdate = Body(..., embed=True)
):
    db_vet = (
        db.query(models.Veterinarian).filter(models.Veterinarian.id == vet_id).first()
    )
    if not db_vet:
        raise HTTPException(status_code=404, detail="Veterinarian not found")
    update_data = vet.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_vet, key, value)
    db.commit()
    db.refresh(db_vet)
    return db_vet


def delete_veterinarian(db: Session, veterinarian_id: int):
    db_veterinarian = (
        db.query(models.Veterinarian)
        .filter(models.Veterinarian.id == veterinarian_id)
        .first()
    )
    db.delete(db_veterinarian)
    db.commit()
    return db_veterinarian


def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()


def get_clients(db: Session, skip: int = 0, limit: int = 100):
    clients = db.query(models.Client).offset(skip).limit(limit).all()
    return clients


def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(
        nome=client.nome,
        cpf=client.cpf,
        telefone=client.telefone,
        email=client.email,
        endereco=client.endereco,
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client


def update_client(
    client_id: int, db: Session, client: schemas.ClientUpdate = Body(..., embed=True)
):
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    update_data = client.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_client, key, value)
    db.commit()
    db.refresh(db_client)
    return db_client


def delete_client(db: Session, client_id: int):
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    db.delete(db_client)
    db.commit()
    return db_client


def get_pet(db: Session, pet_id: int):
    return db.query(models.Pet).filter(models.Pet.id == pet_id).first()


def get_pets(db: Session, skip: int = 0, limit: int = 100):
    pets = db.query(models.Pet).offset(skip).limit(limit).all()
    return pets


def create_pet(db: Session, pet: schemas.PetCreate):
    db_pet = models.Pet(
        nome=pet.nome,
        especie=pet.especie,
        raca=pet.raca,
        idade=pet.idade,
        owner_id=pet.owner_id,
    )
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet


def update_pet(
    pet_id: int, db: Session, pet: schemas.PetUpdate = Body(..., embed=True)
):
    db_pet = db.query(models.Pet).filter(models.Pet.id == pet_id).first()
    if not db_pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    update_data = pet.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_pet, key, value)
    db.commit()
    db.refresh(db_pet)
    return db_pet


def delete_pet(db: Session, pet_id: int):
    db_pet = db.query(models.Pet).filter(models.Pet.id == pet_id).first()
    db.delete(db_pet)
    db.commit()
    return db_pet


def get_appointment(db: Session, appointment_id: int):
    return (
        db.query(models.Appointment)
        .filter(models.Appointment.id == appointment_id)
        .first()
    )


def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    appointments = db.query(models.Appointment).offset(skip).limit(limit).all()
    return appointments


def create_appointment(db: Session, appointment: schemas.AppointmentCreate):
    db_appointment = models.Appointment(
        data=appointment.data,
        hora=appointment.hora,
        pet_id=appointment.pet_id,
        veterinarian_id=appointment.veterinarian_id,
        owner_id=appointment.owner_id,
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def update_appointment(
    appointment_id: int,
    db: Session,
    appointment: schemas.AppointmentUpdate = Body(..., embed=True),
):
    db_appointment = (
        db.query(models.Appointment)
        .filter(models.Appointment.id == appointment_id)
        .first()
    )
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    update_data = appointment.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_appointment, key, value)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def delete_appointment(db: Session, appointment_id: int):
    db_appointment = (
        db.query(models.Appointment)
        .filter(models.Appointment.id == appointment_id)
        .first()
    )
    db.delete(db_appointment)
    db.commit()
    return db_appointment
