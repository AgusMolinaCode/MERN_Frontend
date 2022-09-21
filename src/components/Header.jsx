import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Header = () => {

    const { cerrarSesion } = useAuth();

  return (
    <header className="py-10 bg-indigo-500">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">
                Administrador de <span className="text-white font-black">Clientes</span>
            </h1>

            <nav className="flex gap-5 items-center flex-col lg:flex-row mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-xl uppercase font-bold">Clientes</Link>
                <Link to="/admin/perfil" className="text-white text-xl uppercase font-bold">Perfil</Link>

                <button type="button" className="text-white text-xl uppercase font-bold" onClick={cerrarSesion}>
                    Cerrar Sesión
                </button>
            </nav>

        </div>

    </header>
  )
}

export default Header;