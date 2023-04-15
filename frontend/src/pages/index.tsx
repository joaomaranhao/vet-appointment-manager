import { Layout } from '@/components/layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Layout>
        <h1 className="text-4xl font-bold">Consultas</h1>
      </Layout>
    </main>
  )
}
