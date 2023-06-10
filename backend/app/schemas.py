from typing import Optional

from pydantic import BaseModel


class VeterinarianBase(BaseModel):
    nome: str
    cpf: str
    telefone: str
    email: str
    especialidade: str
    appointments: list


class VeterinarianCreate(VeterinarianBase):
    pass


class VeterinarianUpdate(BaseModel):
    nome: Optional[str]
    cpf: Optional[str]
    telefone: Optional[str]
    email: Optional[str]
    especialidade: Optional[str]
    appointments: Optional[list]


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
    appointments: list


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    nome: Optional[str]
    cpf: Optional[str]
    telefone: Optional[str]
    email: Optional[str]
    endereco: Optional[str]
    pets: Optional[list]
    appointments: Optional[list]


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
    appointments: list


class PetCreate(PetBase):
    pass


class PetUpdate(BaseModel):
    nome: Optional[str]
    especie: Optional[str]
    raca: Optional[str]
    idade: Optional[int]
    owner_id: Optional[int]
    appointments: Optional[list]


class Pet(PetBase):
    id: int

    class Config:
        orm_mode = True


class AppointmentBase(BaseModel):
    data: str
    hora: str
    veterinarian_id: int
    pet_id: int
    owner_id: int


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(BaseModel):
    data: Optional[str]
    hora: Optional[str]
    veterinarian_id: Optional[int]
    pet_id: Optional[int]
    owner_id: Optional[int]


class Appointment(AppointmentBase):
    id: int

    class Config:
        orm_mode = True
