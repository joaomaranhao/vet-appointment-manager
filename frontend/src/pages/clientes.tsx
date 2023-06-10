import { Cliente } from "@/components/cliente";
import { Layout } from "@/components/layout";
import { ClienteType } from "@/types/cliente";
import { useEffect, useState } from "react";

export default function Clientes() {
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newCliente, setNewCliente] = useState<ClienteType>({
        id: 0,
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        endereco: '',
        pets: []
    });

    useEffect(() => {
        const fetchClientes = async () => {
            const res = await fetch("http://localhost:8000/clients/");
            const data = await res.json();
            setClientes(data);
            setLoading(false);
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        const fetchClientes = async () => {
            const res = await fetch("http://localhost:8000/clients/");
            const data = await res.json();
            setClientes(data);
            setLoading(false);
        };
        fetchClientes();
    }, [clientes]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCliente),
            });
            const data = await res.json();
            setClientes([...clientes, data]);
            setNewCliente({
                id: 0,
                nome: '',
                cpf: '',
                telefone: '',
                email: '',
                endereco: '',
                pets: []
            });
            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCliente({
            ...newCliente,
            [e.target.name]: e.target.value
        });
    }

    const handleShowForm = () => {
        setShowForm(true);
    }

    const handleCancel = () => {
        setShowForm(false);
        setNewCliente({
            id: 0,
            nome: '',
            cpf: '',
            telefone: '',
            email: '',
            endereco: '',
            pets: []
        });
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Layout>
                <h1 className="text-xl font-bold mt-4 mb-2">Clientes Cadastrados</h1>
                <div className="flex space-x-4"></div>
                <div className="my-4">
                    {!showForm && (
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full"
                            onClick={handleShowForm}
                        >
                            Adicionar Cliente
                        </button>
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
                                    className="border border-gray-400 rounded-md px-3 py-2 text-black text-black"
                                />
                                <input
                                    type="text"
                                    placeholder="CPF"
                                    value={newCliente.cpf}
                                    onChange={handleChange}
                                    name="cpf"
                                    className="border border-gray-400 rounded-md px-3 py-2 text-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Telefone"
                                    value={newCliente.telefone}
                                    onChange={handleChange}
                                    name="telefone"
                                    className="border border-gray-400 rounded-md px-3 py-2 text-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={newCliente.email}
                                    onChange={handleChange}
                                    name="email"
                                    className="border border-gray-400 rounded-md px-3 py-2 text-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Endereço"
                                    value={newCliente.endereco}
                                    onChange={handleChange}
                                    name="endereco"
                                    className="border border-gray-400 rounded-md px-3 py-2 text-black"
                                />
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                        Cadastrar Cliente
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
                            {clientes.map((cliente) => (
                                <li className="my-2" key={cliente.id}>
                                    <Cliente cliente={cliente} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Layout>
        </main>
    );
}