import { useState } from 'react';

type VeterinarioProps = {
    veterinario: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
        email: string;
        especialidade: string;
    };
};

export const Veterinario = ({ veterinario }: VeterinarioProps) => {
    const [showForm, setShowForm] = useState(false);
    const [newVeterinario, setNewVeterinario] = useState({
        id: veterinario.id,
        nome: veterinario.nome,
        cpf: veterinario.cpf,
        telefone: veterinario.telefone,
        email: veterinario.email,
        especialidade: veterinario.especialidade
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVeterinario({
            ...newVeterinario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { id } = newVeterinario;
            const response = await fetch(`http://localhost:8000/veterinarians/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVeterinario)
            });

            setShowForm(false);

            if (response.status === 200) {
                console.log("Veterinario atualizado com sucesso!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleDeleteVeterinario = async () => {
        const { id } = veterinario;

        const response = await fetch(`http://localhost:8000/veterinarians/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("Veterinario excluído com sucesso!");
        }
    };


    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-bold text-gray-600 mb-2 text-center">{veterinario.nome}</h2>
            <div className="grid grid-cols-2 gap-4 mb-2">
                <p className="font-bold text-gray-600">CPF:</p>
                <p className="text-gray-800">{veterinario.cpf}</p>
                <p className="font-bold text-gray-600">Telefone:</p>
                <p className="text-gray-800">{veterinario.telefone}</p>
                <p className="font-bold text-gray-600">E-mail:</p>
                <p className="text-gray-800">{veterinario.email}</p>
                <p className="font-bold text-gray-600">Especialidade:</p>
                <p className="text-gray-800">{veterinario.especialidade}</p>
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
                        onClick={handleDeleteVeterinario}
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
                            value={newVeterinario.nome}
                            onChange={handleChange}
                            name="nome"
                            className="border border-gray-400 rounded-md px-3 py-2 text-black text-black"
                        />
                        <input
                            type="text"
                            placeholder="CPF"
                            value={newVeterinario.cpf}
                            onChange={handleChange}
                            name="cpf"
                            className="border border-gray-400 rounded-md px-3 py-2 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Telefone"
                            value={newVeterinario.telefone}
                            onChange={handleChange}
                            name="telefone"
                            className="border border-gray-400 rounded-md px-3 py-2 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={newVeterinario.email}
                            onChange={handleChange}
                            name="email"
                            className="border border-gray-400 rounded-md px-3 py-2 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Especialidade"
                            value={newVeterinario.especialidade}
                            onChange={handleChange}
                            name="especialidade"
                            className="border border-gray-400 rounded-md px-3 py-2 text-black"
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