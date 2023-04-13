from sqlalchemy import Column, Integer, String

from .database import Base


class Veterinarian(Base):
    __tablename__ = "veterinarians"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    cpf = Column(String, index=True, unique=True)
    telefone = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    especialidade = Column(String, index=True)
