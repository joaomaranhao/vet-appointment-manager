import { useState } from "react";

type ClienteProps = {
    cliente: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
        email: string;
        endereco: string;
    };
};

export const Cliente = ({ cliente }: ClienteProps) => {
    const [showForm, setShowForm] = useState(false);
    const [newCliente, setNewCliente] = useState({
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        email: cliente.email,
        endereco: cliente.endereco
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCliente({
            ...newCliente,
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
            </div>
            {!showForm && (
                <div className="flex justify-center mt-4">
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
    );
};
