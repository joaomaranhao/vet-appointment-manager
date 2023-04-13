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
