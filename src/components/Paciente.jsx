import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {

    const { setEdicion, eliminarPaciente } = usePacientes()
  
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
     }

    return (
    <div className="mx-5 my-10 bg-sky-50 shadow-2xl px-5 py-10 rounded-2xl">
        <p className="font-bold uppercase text-sky-900 text-lg">Nombre: <span className="font-bold text-indigo-500 normal-case">{nombre}</span></p>
        <p className="font-bold uppercase text-sky-900 text-lg">Email: <span className="font-bold text-indigo-500 normal-case">{email}</span></p>
        <p className="font-bold uppercase text-sky-900 text-lg">Propietario: <span className="font-bold text-indigo-500 normal-case">{propietario}</span></p>
        <p className="font-bold uppercase text-sky-900 text-lg">Fecha de Alta: <span className="font-bold text-indigo-500 normal-case">{formatearFecha(fecha)}</span></p>
        <p className="font-bold uppercase text-sky-900 text-lg">Sintomas: <span className="font-bold text-indigo-500 normal-case">{sintomas}</span></p>

        <div className="flex justify-around my-5">
            <button onClick={() => setEdicion(paciente)} className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-xl" type="button">
                Editar
            </button>
            <button onClick={() => eliminarPaciente(_id)} className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-xl" type="button">
                Eliminar
            </button>

        </div>
    </div>
    
  )
}

export default Paciente