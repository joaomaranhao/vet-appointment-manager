

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
    const handleEditVeterinario = () => {
        console.log("Editar Veterinario");
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
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                    onClick={handleEditVeterinario}
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
        </div>
    );
};