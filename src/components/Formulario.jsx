import { useState, useEffect } from "react"
import Alerta from './Alerta'
import usePacientes from "../hooks/usePacientes"
 
 
 const Formulario = () => {
    const [nombre,setNombre] = useState('')
    const [propietario,setPropietario] = useState('')
    const [email,setEmail] = useState('')
    const [fecha,setFecha] = useState('')
    const [sintomas,setSintomas] = useState('')
    const [id,setId] = useState(null)

    const [alerta,setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)

        }
    }, [paciente])
    

    

    const handleSubmit = e => {
        e.preventDefault()

        if ([nombre,propietario,email,fecha,sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        setAlerta({})
        guardarPaciente({nombre,propietario,email,fecha,sintomas, id})
        setAlerta({
            msg: 'Gaurdado Correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
        
    }

    const { msg } = alerta
    return (
    
    <>
    
    <h2 className='font-black text-3xl text-center'>Agrega tus clientes</h2>
    

    <p className='text-xl mt-5 mb-10 text-center'>Añade tus Clientes y <span className='text-indigo-600 font-bold'>Administralos</span></p>


    <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-xl" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Cliente</label>
            <input type="text" id="nombre" placeholder="Nombre del Cliente" 
            className="border-2 w-full m-2 p-2 placeholder-gray-300 rounded-xl" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>

        <div className="mb-5">
            <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Empresa</label>
            <input type="text" id="propietario" placeholder="Nombre de la propietario" 
            className="border-2 w-full m-2 p-2 placeholder-gray-300 rounded-xl" value={propietario} onChange={e => setPropietario(e.target.value)} />
        </div>

        <div className="mb-5">
            <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Cliente</label>
            <input type="email" id="email" placeholder="Email del cliente" 
            className="border-2 w-full m-2 p-2 placeholder-gray-300 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-5">
            <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
            <input type="date" id="fecha" 
            className="border-2 w-full m-2 p-2 placeholder-gray-300 rounded-xl" value={fecha} onChange={e => setFecha(e.target.value)} />
        </div>

        <div className="mb-5">
            <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Notas Cliente</label>
            <textarea id="sintomas" placeholder="Notas o apuntes para Clientes"
            className="border-2 w-full m-2 p-2 placeholder-gray-300 rounded-xl" value={sintomas} onChange={e => setSintomas(e.target.value)} />
        </div>

        <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-xl" />
    </form>

    {msg && <Alerta alerta={alerta} />}


    </>
  )
}

export default Formulario
