import { Layout } from "@/components/layout";
import { Veterinario } from "@/components/veterinario";
import { VeterinarioType } from "@/types/veterinario";
import { useEffect, useState } from "react";

export default function Veterinarios() {
    const [veterinarios, setVeterinarios] = useState<VeterinarioType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newVeterinario, setNewVeterinario] = useState<VeterinarioType>({
        id: 0,
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        especialidade: ''
    });

    useEffect(() => {
        const fetchVeterinarios = async () => {
            const res = await fetch("http://localhost:8000/veterinarians/");
            const data = await res.json();
            setVeterinarios(data);
            setLoading(false);
        };
        fetchVeterinarios();
    }, []);

    // useEffect to reload list of veterinarios a veterinarian is deleted
    useEffect(() => {
        const fetchVeterinarios = async () => {
            const res = await fetch("http://localhost:8000/veterinarians/");
            const data = await res.json();
            setVeterinarios(data);
            setLoading(false);
        };
        fetchVeterinarios();
    }, [veterinarios]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/veterinarians', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVeterinario),
            });
            const data = await res.json();
            setVeterinarios([...veterinarios, data]);
            setNewVeterinario({
                id: 0,
                nome: '',
                cpf: '',
                telefone: '',
                email: '',
                especialidade: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVeterinario({
            ...newVeterinario,
            [e.target.name]: e.target.value
        });
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setNewVeterinario({
            id: 0,
            nome: '',
            cpf: '',
            telefone: '',
            email: '',
            especialidade: ''
        });
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Layout>
                <h1 className="text-xl font-bold mt-4 mb-2">Veterinários Cadastrados</h1>
                <div className="flex space-x-4"></div>
                <div className="my-4">
                    {!showForm && (
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full"
                            onClick={handleShowForm}
                        >
                            Adicionar Veterinário
                        </button>
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
                                        Cadastrar Veterinário
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
                <div>
                    {loading ? (
                        <p className="text-gray-800 font-bold">Carregando...</p>
                    ) : (
                        <ul>
                            {veterinarios.map((veterinario) => (
                                <li className="my-2" key={veterinario.id}>
                                    <Veterinario veterinario={veterinario} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Layout>
        </main>
    );
}

