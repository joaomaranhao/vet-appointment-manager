from typing import Optional

from pydantic import BaseModel


class VeterinarianBase(BaseModel):
    nome: str
    cpf: str
    telefone: str
    email: str
    especialidade: str


class VeterinarianCreate(VeterinarianBase):
    pass


class VeterinarianUpdate(BaseModel):
    nome: Optional[str]
    cpf: Optional[str]
    telefone: Optional[str]
    email: Optional[str]
    especialidade: Optional[str]


class Veterinarian(VeterinarianBase):
    id: int

    class Config:
        orm_mode = True
