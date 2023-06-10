import { Layout } from '@/components/layout'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [appointments, setAppointments] = useState([])
  const [veterinarians, setVeterinarians] = useState([])
  const [pets, setPets] = useState([])
  const [owners, setOwners] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState("")
  const [selectedVeterinarian, setSelectedVeterinarian] = useState(0)
  const [selectedPet, setSelectedPet] = useState(0)
  const [selectedOwner, setSelectedOwner] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const fetchAppointments = async () => {
    const response = await fetch('http://localhost:8000/appointments/')
    const data = await response.json()
    setAppointments(data)
  }

  const fetchVeterinarians = async () => {
    const response = await fetch('http://localhost:8000/veterinarians/')
    const data = await response.json()
    setVeterinarians(data)
  }

  const fetchPets = async () => {
    const response = await fetch('http://localhost:8000/pets/')
    const data = await response.json()
    setPets(data)
    console.log(data)
  }

  const fetchOwners = async () => {
    const response = await fetch('http://localhost:8000/clients/')
    const data = await response.json()
    setOwners(data)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const owner_id = pets.find((pet) => pet.id === selectedPet)?.owner_id
      const stringfied_body = JSON.stringify({
        date: date,
        time: time,
        veterinarian_id: selectedVeterinarian,
        pet_id: selectedPet,
        owner_id: owner_id,
      })
      console.log(stringfied_body)
      console.log(owner_id)
      const res = await fetch('http://localhost:8000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: date,
          hora: time,
          veterinarian_id: selectedVeterinarian,
          pet_id: selectedPet,
          owner_id: parseInt(owner_id),
        }),
      })
      const data = await res.json()
      // Checar se status é 200
      if (res.status === 200) {
        console.log('OK')
        setAppointments([...appointments, data])
        setSelectedAppointment("")
        setSelectedVeterinarian(0)
        setSelectedPet(0)
        setSelectedOwner("")
        setDate("")
        setTime("")
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    fetchVeterinarians()
    fetchPets()
    fetchOwners()
    fetchAppointments()
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [appointments])



  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/appointments/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      setAppointments(appointments.filter((appointment) => appointment.id !== id))
    } catch (err) {
      console.log(err)
    }
    fetchAppointments()
  }

  const handleEdit = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/appointments/${id}`)
      const data = await res.json()
      setSelectedAppointment(data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white text-center">
      <Layout>
        <h1 className="text-4xl font-bold">Consultas</h1>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mt-8">Agendar consulta</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setDate(e.target.value)
                  }}
                  className="border border-gray-400 rounded-md p-2 text-black"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="time">Horário</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={time}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setTime(e.target.value)
                  }}
                  className="border border-gray-400 rounded-md p-2 text-black"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="veterinarian">Veterinário</label>
                <select
                  name="veterinarian"
                  id="veterinarian"
                  value={selectedVeterinarian}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setSelectedVeterinarian(parseInt(e.target.value))
                  }}
                  className="border border-gray-400 rounded-md p-2 text-black"
                >
                  <option value="">Selecione um veterinário</option>
                  {veterinarians.map((veterinarian) => (
                    <option key={veterinarian.id} value={veterinarian.id}>
                      {veterinarian.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="pet">Pet</label>
                <select
                  name="pet"
                  id="pet"
                  value={selectedPet}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setSelectedPet(parseInt(e.target.value))
                  }}
                  className="border border-gray-400 rounded-md p-2 text-black"
                >
                  <option value="">Selecione um pet</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-200"
              >
                Agendar
              </button>
            </form>
          </div>
          <div className="flex flex-col mt-8">
            <h2 className="text-2xl font-bold">Consultas agendadas</h2>
            {appointments.length === 0 && (
              <p className="text-xl">Não há consultas agendadas</p>
            )}
            {appointments.length > 0 && (

              <table className="table-auto border border-gray-400 mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-400">Data</th>
                    <th className="border border-gray-400">Horário</th>
                    <th className="border border-gray-400">Veterinário</th>
                    <th className="border border-gray-400">Pet</th>
                    <th className="border border-gray-400">Dono</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="border border-gray-400 p-2">{appointment.data}</td>
                      <td className="border border-gray-400 p-2">{appointment.hora}</td>
                      <td className="border border-gray-400 p-2">{veterinarians.find((veterinarian) => veterinarian.id === appointment.veterinarian_id)["nome"]}</td>
                      <td className="border border-gray-400 p-2">{pets.find((pet) => pet.id === appointment.pet_id).nome}</td>
                      <td className="border border-gray-400 p-2">{owners.find((owner) => owner.id === pets.find((pet) => pet.id === appointment.pet_id).owner_id)["nome"]}</td>
                      <td className="border border-gray-400 p-2">
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
            }
          </div>
        </div>

      </Layout>
    </main>
  )
}
