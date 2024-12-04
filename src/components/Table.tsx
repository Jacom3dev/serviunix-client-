import Swal from "sweetalert2";

import { IEmployee } from "../interfaces"

interface Props {
    employees: IEmployee[],
    isLoading: boolean,
    deleteEmployee: (id: number) => Promise<void>
}
export const Table = ({ employees, isLoading, deleteEmployee }: Props) => {

    const showAlert = (id: number) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "bg-green-500 text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2", // Botón verde con padding y márgenes
                cancelButton: "bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",   // Botón rojo con padding y márgenes
            },
            buttonsStyling: false, 
        });

        swalWithBootstrapButtons.fire({
            title: "Eliminar",
            text: "¿Quieres eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No, cancelar",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployee(id); 
                swalWithBootstrapButtons.fire({
                    title: "¡Eliminado!",
                    text: "El registro ha sido eliminado.",
                    icon: "success",
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "El registro está seguro :)",
                    icon: "error",
                });
            }
        });
    };


    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left">Nombres</th>
                        <th className="border px-4 py-2 text-left">Apellidos</th>
                        <th className="border px-4 py-2 text-left">comentarios</th>
                        <th className="border px-4 py-2 text-left">Fecha de Ingreso</th>
                        <th className="border px-4 py-2 text-left">Género</th>
                        <th className="border px-4 py-2 text-left">Departamento</th>
                        <th className="border px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-blue-500">
                                Cargando...
                            </td>
                        </tr>
                    ) : employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{employee.firstName}</td>
                                <td className="border px-4 py-2">{employee.lastName}</td>
                                <td className="border px-4 py-2">{employee.comments}</td>
                                <td className="border px-4 py-2">{employee.hireDate}</td>
                                <td className="border px-4 py-2">{employee.gender.genderName}</td>
                                <td className="border px-4 py-2">{employee.department.departmentName}</td>
                                <td className="border px-4 py-2">
                                    <p onClick={() => showAlert(employee.id)}>Eliminar</p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                No hay registros
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
