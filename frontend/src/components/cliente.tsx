import { useState } from "react";

type ClienteProps = {
    cliente: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
        email: string;
        endereco: string;
        pets: {
            id: number;
            nome: string;
            especie: string;
            raca: string;
            idade: number;
            cliente: number;
        }[];
    };
};

export const Cliente = ({ cliente }: ClienteProps) => {
    const [showForm, setShowForm] = useState(false);
    const [showPetForm, setShowPetForm] = useState(false);
    const [newCliente, setNewCliente] = useState({
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        email: cliente.email,
        endereco: cliente.endereco,
        pets: cliente.pets
    });
    const [newPet, setNewPet] = useState({
        id: undefined,
        nome: '',
        especie: '',
        raca: '',
        idade: undefined,
        cliente: cliente.id
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCliente({
            ...newCliente,
            [e.target.name]: e.target.value
        });
    }

    const handleChangePet = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPet({
            ...newPet,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { id } = newCliente;
            const response = await fetch(`http://localhost:8000/clients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCliente)
            });

            setShowForm(false);

            if (response.status === 200) {
                console.log("Cliente atualizado com sucesso!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleShowForm = () => {
        setShowForm(true);
    }

    const handleCancel = () => {
        setShowForm(false);
    }

    const handleShowPetForm = () => {
        setShowPetForm(true);
    }

    const handleCancelPet = () => {
        setShowPetForm(false);
    }

    const handleAddPet = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { id } = cliente;
            const pet = {
                ...newPet,
                owner_id: id
            };
            const response = await fetch(`http://localhost:8000/pets/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pet)
            });

            setShowPetForm(false);

            if (response.status === 200) {
                console.log("Pet adicionado com sucesso!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeletePet = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/pets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log("Pet deletado com sucesso!");
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleDeleteCliente = async () => {
        const { id } = cliente;

        const response = await fetch(`http://localhost:8000/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("Cliente deletado com sucesso!");
        }
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-bold text-gray-600 mb-2 text-center">{cliente.nome}</h2>
            <div className="grid grid-cols-2 gap-4 mb-2">
                <p className="font-bold text-gray-600">CPF:</p>
                <p className="text-gray-800">{cliente.cpf}</p>
                <p className="font-bold text-gray-600">Telefone:</p>
                <p className="text-gray-800">{cliente.telefone}</p>
                <p className="font-bold text-gray-600">Email:</p>
                <p className="text-gray-800">{cliente.email}</p>
                <p className="font-bold text-gray-600">Endereço:</p>
                <p className="text-gray-800">{cliente.endereco}</p>
                <div className="col-span-2">
                    <h3 className="text-lg font-bold text-gray-600 mb-2">Pets:</h3>
                    {cliente.pets.length == 0 ? (
                        <p className="text-gray-800 font-bold">Nenhum pet cadastrado</p>
                    ) : (
                        <ul>
                            {cliente.pets.map((pet) => (
                                <li key={pet.id} className="flex justify-between items-center">
                                    <p className="text-gray-800">{pet.nome} | {pet.especie} | {pet.raca} | {pet.idade} anos</p>
                                    <div className="flex">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2 mr-2"
                                            onClick={() => handleDeletePet(pet.id)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {!showForm && (
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                            onClick={handleShowPetForm}
                        >
                            Adicionar Pet
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                            onClick={handleShowForm}
                        >
                            Editar
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={handleDeleteCliente}
                        >
                            Excluir
                        </button>
                    </div>
                )}
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-2">
                            <input
                                type="text"
                                placeholder="Nome"
                                value={newCliente.nome}
                                onChange={handleChange}
                                name="nome"
                                className="border border-gray-400 p-2 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="CPF"
                                value={newCliente.cpf}
                                onChange={handleChange}
                                name="cpf"
                                className="border border-gray-400 p-2 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Telefone"
                                value={newCliente.telefone}
                                onChange={handleChange}
                                name="telefone"
                                className="border border-gray-400 p-2 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={newCliente.email}
                                onChange={handleChange}
                                name="email"
                                className="border border-gray-400 p-2 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Endereço"
                                value={newCliente.endereco}
                                onChange={handleChange}
                                name="endereco"
                                className="border border-gray-400 p-2 rounded-md"
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
            {showPetForm && (
                <form onSubmit={handleAddPet}>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            placeholder="Nome"
                            value={newPet.nome}
                            onChange={handleChangePet}
                            name="nome"
                            className="border border-gray-400 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Espécie"
                            value={newPet.especie}
                            onChange={handleChangePet}
                            name="especie"
                            className="border border-gray-400 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Raça"
                            value={newPet.raca}
                            onChange={handleChangePet}
                            name="raca"
                            className="border border-gray-400 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Idade"
                            value={newPet.idade}
                            onChange={handleChangePet}
                            name="idade"
                            className="border border-gray-400 p-2 rounded-md"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelPet}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full mt-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

