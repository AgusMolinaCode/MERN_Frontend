import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios'

export const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando,setCargando] = useState(true)
  const [alerta,setAlerta] = useState({})
  
  
  const params = useParams();
  const {id} = params

  useEffect(() => {
    const ConfirmarCuenta = async () => {
      
      try {
        const url = `/veterinarios/confirmar/${id}`
        const { data } = await clienteAxios(url)

        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      }catch(error){
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    }
    ConfirmarCuenta();
  }, [])
  
  return(
      <>
          <div>
          <h1 className="text-indigo-500 text-center font-black text-5xl">
            Confirma tu cuenta y comienza a administrar tus 
            <span className="text-black"> Clientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-2xl bg-sky-50">
           
           {!cargando &&
            <Alerta 
              alerta={alerta}
            />}

            {cuentaConfirmada && (<Link className="block text-center my-5 text-gray-500 font-bold" to="/">Iniciar Sesión</Link> )}
            
      </div>        
      </>
    )
  }
  
  export default ConfirmarCuenta;