import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const { guardarPassword } = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  })
  
  const handleSubmit = async e => {
    e.preventDefault()

    if(Object.values(password).some( campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true
      })
      return
    }
    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)
  }

  const { msg } = alerta
  
  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center font-bold">Modifica tu <span className="text-indigo-600 font-bold">Password</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-2xl p-3">
                
                {msg && <Alerta alerta={alerta} />}
                
                <form onSubmit={handleSubmit}>
                    
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold flex justify-center text-indigo-900 text-lg">Password actual</label>
                        <input type="password" placeholder="Escribe tu Password actual" className="border bg-gray-50 w-full p-2 mt-5 rounded-xl" name="pwd_actual" onChange={e => setPassword ({
                          ...password,
                          [e.target.name] : e.target.value
                        })}/>
                    </div>

                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold flex justify-center text-indigo-900 text-lg">Password nuevo</label>
                        <input type="password" placeholder="Escribe tu nuevo Password " className="border bg-gray-50 w-full p-2 mt-5 rounded-xl" name="pwd_nuevo" onChange={e => setPassword ({
                          ...password,
                          [e.target.name] : e.target.value
                        })}/>
                    </div>

                    <input type="submit" value='Actualizar Password' className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-xl w-full mt-5 shadow-lg cursor-pointer uppercase hover:bg-indigo-800"  />
                </form>
            </div>
        </div>
    
    </>
  )
}

export default CambiarPassword