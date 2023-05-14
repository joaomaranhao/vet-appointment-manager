from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import mapped_column, relationship

from .database import Base


class Veterinarian(Base):
    __tablename__ = "veterinarians"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    cpf = Column(String, index=True, unique=True)
    telefone = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    especialidade = Column(String, index=True)


# cliente com lista de pets com relacionamento 1:N
class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    cpf = Column(String, index=True, unique=True)
    telefone = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    endereco = Column(String, index=True)
    pets = relationship("Pet", back_populates="owner")


class Pet(Base):
    __tablename__ = "pets"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    especie = Column(String, index=True)
    raca = Column(String, index=True)
    idade = Column(Integer, index=True)
    owner_id = Column(Integer, ForeignKey("clients.id"))
    owner = relationship("Client", back_populates="pets")
