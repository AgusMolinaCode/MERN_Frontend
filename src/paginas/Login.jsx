import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email,password].includes('')) {
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password})

      localStorage.setItem('token', data.token)
      setAuth(data)

      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta



  return (
    <>
       
       <div>
          <h1 className="text-indigo-500 text-center font-black text-5xl">
            Administra tus 
            <span className="text-black"> Clientes</span></h1>
            <img className="pt-9" src="../public/1.jpg" alt="" />
       </div>
       <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-2xl bg-sky-50">

       { msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email: </label>
                <input type="email" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Tu Email" 
                value={email} 
                onChange={ e => setEmail(e.target.value)}/>
              </div>
              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Password: </label>
                <input type="password" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Tu Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>
              </div>

              <input type="submit" value="Iniciar Sesión" className="bg-blue-100 w-full py-3 px-10 rounded-2xl text-slate-900 uppercase font-bold mt-5 cursor-pointer hover:bg-slate-400 md:w-auto" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link className="block text-center my-5 text-gray-500 font-bold" to="/registrar">¿No tienes una cuenta? Registrate!</Link>
              <Link className="block text-center my-5 text-gray-500 font-bold" to="/olvide-password">Olvide mi Password</Link>
            </nav>
       </div>

       
    </>
  )
}

export default Login;
