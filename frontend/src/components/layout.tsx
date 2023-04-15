import { Navbar } from "./navbar"

type LayoutProps = {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col flex-grow items-center mt-8">
                {children}
            </main>
        </div>
    )
}