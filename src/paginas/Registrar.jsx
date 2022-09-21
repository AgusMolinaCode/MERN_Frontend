import { useState } from 'react'
import { Link } from 'react-router-dom'
import  Alerta  from "../components/Alerta";
import clienteAxios from '../config/axios';

export const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta,setAlerta] = useState({})
    
    const handleSubmit = async e => {
      e.preventDefault();

      if ([nombre,email,password,repetirPassword].includes('')) {
        setAlerta({ msg: "Hay campos vacios...", error:true})
        return;
      }

      if (password !== repetirPassword) {
        setAlerta({ msg: "Contraseñas no son iguales...", error:true})
        return;
      }

      if (password.length < 8) {
        setAlerta({ msg: "Contraseña muy corta...", error:true})
        return;
      }

      setAlerta({})

      try {
        await clienteAxios.post('/veterinarios',{nombre,email,password})
        setAlerta({
          msg: 'Creado correctamente,revisa tu email',
          error: false
        })
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
            Crea tu cuenta y administra tus 
            <span className="text-black"> Clientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-2xl bg-sky-50">
            
            { msg && <Alerta alerta={alerta}/>}
            
            <form onSubmit={handleSubmit}>
            
              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Nombre y Apellido: </label>
                <input type="text" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Tu Nombre" value={nombre} onChange={ e => setNombre(e.target.value)}  />
              </div>
              
              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email: </label>
                <input type="email" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Tu Email" value={email} onChange={ e => setEmail(e.target.value)} />
              </div>

              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Password: </label>
                <input type="password" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Crea tu Password" value={password} onChange={ e => setPassword(e.target.value)}/>
              </div>  

              <div className="my-6">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Repetir Password: </label>
                <input type="password" className="border w-full p-3 mt-3 bg-blue-100 rounded-2xl" placeholder="Repite tu Password" value={repetirPassword} onChange={ e => setRepetirPassword(e.target.value)}/>
              </div> 

              <input type="submit" value="Iniciar Sesión" className="bg-blue-100 w-full py-3 px-10 rounded-2xl text-slate-900 uppercase font-bold mt-5 cursor-pointer hover:bg-slate-400 md:w-auto" />

              
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link className="block text-center my-5 text-gray-500 font-bold" to="/">¿No tienes una cuenta? Inicia Sesión!</Link>
              <Link className="block text-center my-5 text-gray-500 font-bold" to="/olvide-password">Olvide mi Password</Link>
            </nav>
      </div>        
          
      </>
    )
  }
  
  export default Registrar;