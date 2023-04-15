import Link from "next/link"

export const Navbar = () => {
    return (
        <nav>
            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="text-2xl font-bold bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Consultas
                    </Link>
                </li>
                <li>
                    <Link href="/veterinarios" className="text-2xl font-bold bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Veterinários
                    </Link>
                </li>
                <li>
                    <Link href="/clientes" className="text-2xl font-bold bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/pets" className="text-2xl font-bold bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Pets
                    </Link>
                </li>
            </ul>
        </nav>
    )
}