import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 p-5 md:flex md: justify-center md:mt-20">
        <div className="md:w-2/3 lg:1/2 " >
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
