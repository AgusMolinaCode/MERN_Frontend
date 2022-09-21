import {useState} from 'react';
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

export const OlvidePassword = () => {
  
  const[email,setEmail] = useState('')
  const[alerta,setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if(email === ''){
      setAlerta({msg: 'El Email es obligatorio', error: true})
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })

      setAlerta({msg: data.msg})
      

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  
  return (
    <>
       
      <div>
          <h1 className="text-indigo-500 text-center font-black text-5xl">
            Recupera tu 
            <span className="text-black"> Cuenta</span></h1>
      </div>

      <div className="mt-20 sm:m-5 md:mt-5 shadow-2xl px-5 py-10 rounded-2xl bg-sky-50">
            
      { msg && <Alerta alerta={alerta}/>}
            
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email: </label>
                <input type="email" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Tu Email" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              <input type="submit" value="Iniciar Sesión" className="bg-blue-100 w-full py-3 px-10 rounded-2xl text-slate-900 uppercase font-bold mt-5 cursor-pointer hover:bg-slate-400 md:w-auto" />
            </form>  

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link className="block text-center my-5 text-gray-500 font-bold" to="/">¿No tienes una cuenta? Inicia Sesión!</Link>
              <Link className="block text-center my-5 text-gray-500 font-bold" to="/registrar">¿No tienes una cuenta? Registrate!</Link>
            </nav>

      </div>
       
    </>
  )
}

export default OlvidePassword;
