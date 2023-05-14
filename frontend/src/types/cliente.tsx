import { PetType } from "./pet";

export type ClienteType = {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    endereco: string;
    pets: PetType[];
};