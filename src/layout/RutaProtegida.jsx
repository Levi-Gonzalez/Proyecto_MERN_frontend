import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { autenticacion, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <span className="ml-2 font-semibold text-lg">Cargando...</span>
      </div>
    );
  }

  return (
    <>
      {autenticacion._id ? (
        <div className="bg-gray-200">
          <Header />
          <div className="md:flex sm:min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1 bg-gray-300 ">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
