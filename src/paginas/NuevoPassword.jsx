import { useState,useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const NuevoPassword = () => {
  const [password,setPassword] = useState('')
  const [alerta,setAlerta] = useState({})
  const [tokenValido,setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params
  
  useEffect(() => {
    const comprobarToken = async () => {
        try {
          const url = `/veterinarios/olvide-password/${token}`
          await clienteAxios(url)
          setTokenValido(true)
          setAlerta({
            msg: 'Coloca tu nuevo Password'
          })
          
        } catch (error) {
          setAlerta({
            msg: 'Hubo un error con el enlace',
            error: true
          })
        }
    }
      comprobarToken()
    
    


  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }
 

  try {
    const url = `/veterinarios/olvide-password/${token}`
    const { data } = await clienteAxios.post(url, { password} )

    

    setAlerta({
      msg: data.msg
    })

    setPasswordModificado(true)

  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true
    })
  }
}


  const { msg } = alerta
  
  
  
  
  return (
    <>
        <div>
              <h1 className="text-indigo-500 text-center font-black text-5xl">
              Reestablece tu password y no pierdas acceso a tus 
              <span className="text-black"> Clientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-2xl bg-sky-50">

        { msg && <Alerta alerta={alerta}/>}

        { tokenValido &&  (
            <>
              <form onSubmit={handleSubmit}>
                  <div className="my-6">
                      <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Nuevo Password: </label>
                      <input type="password" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Tu nuevo Password" value={password} onChange={ e => setPassword(e.target.value)}/>

                      <input type="submit" value="Guardar Nuevo Password" className="bg-blue-100 w-full py-3 px-10 rounded-2xl text-slate-900 uppercase font-bold mt-5 cursor-pointer hover:bg-slate-400 md:w-auto" />
                  </div>
              </form>

             
            </>
          )}

          {passwordModificado && <Link className="block text-center my-5 text-gray-500 font-bold" to="/">Iniciar Sesión</Link>}

        </div>
    </>  
  )
}

export default NuevoPassword