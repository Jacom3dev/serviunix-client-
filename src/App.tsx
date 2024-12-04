import { Form, Table } from "./components";
import { useEmployee } from "./hooks/useEmployee";

function App() {
  const {employees,isLoading,createEmployees,deleteEmployee} = useEmployee();

  return (
    <div className="container mx-auto mt-20">
       <h1 className="font-black text-5xl text-center">
       Serviunix - registro de <span className="text-indigo-600 block">empleados</span>
      </h1>
      <div className="mt-2 md:flex">
        <Form
          createEmployees={createEmployees}
          isLoading={isLoading}
        />

        <div className="md:w-2/3 md:h-screen overflow-y-scroll">
          <h3 className="font-black text-3xl text-center">
           Empleados registrados
          </h3>

          <div>
            <Table
              employees={employees}
              isLoading={isLoading}
              deleteEmployee={deleteEmployee}
            />
          </div>
    
        </div>
      </div>
    </div>
  );
}

export default App
