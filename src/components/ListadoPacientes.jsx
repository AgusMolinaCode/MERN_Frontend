import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'

 const ListadoPacientes = () => {

  const { pacientes } = usePacientes()

  return (
    <>
        { pacientes.length ?
        (
          <>
            <h2 className='font-black text-3xl text-center'>Listado clientes</h2>

            <p className='text-xl mt-5 mb-10 text-center'>Administra tus <span className='text-indigo-600 font-bold'>Clientes</span></p>

            { pacientes.map ( paciente => (
                <Paciente 
                  key={paciente._id}
                  paciente={paciente}
                />
            ))}

          </>
        ) :
        (
          <>
            <h2 className='font-black text-3xl text-center'>No hay clientes</h2>

            <p className='text-xl mt-5 mb-10 text-center'>Comienza agregando clientes <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span></p>
          </>
        )}
    </>
  )
}

export default ListadoPacientes
