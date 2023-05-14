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


class ClientBase(BaseModel):
    nome: str
    cpf: str
    telefone: str
    email: str
    endereco: str
    pets: list


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    nome: Optional[str]
    cpf: Optional[str]
    telefone: Optional[str]
    email: Optional[str]
    endereco: Optional[str]
    pets: Optional[list]


class Client(ClientBase):
    id: int

    class Config:
        orm_mode = True


class PetBase(BaseModel):
    nome: str
    especie: str
    raca: str
    idade: int
    owner_id: int


class PetCreate(PetBase):
    pass


class PetUpdate(BaseModel):
    nome: Optional[str]
    especie: Optional[str]
    raca: Optional[str]
    idade: Optional[int]
    owner_id: Optional[int]


class Pet(PetBase):
    id: int

    class Config:
        orm_mode = True
