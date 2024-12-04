import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { IDepartment, IFormData, IGender } from '../interfaces';
import { API } from '../api';


interface Props {
    createEmployees: (data: IFormData) => Promise<void>,
    isLoading: boolean
}
export const Form = ({createEmployees,isLoading}:Props) => {
    const [formData, setFormData] = useState<IFormData>({
        firstName: "",
        lastName: "",
        hireDate: "",
        comments: "",
        genderId: "",
        departmentId: "",
    });

    const [genders, setGenders] = useState<IGender[]>([]);
    const [departments, setDepartments] = useState<IDepartment[]>([]);

    const getGenders = async () => {
        try {
            const response = await API.get('/genders');
            setGenders(response.data);
        } catch (error) {
            setGenders([]);
            console.error(error);
        }
    }

    const getDepartments = async () => {
        try {
            const response = await API.get('/departments');
            setDepartments(response.data);
        } catch (error) {
            setDepartments([]);
            console.error(error);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createEmployees(formData);

        setFormData({
            firstName: "",
            lastName: "",
            hireDate: "",
            comments: "",
            genderId: "",
            departmentId: ""
        });
    };

    useEffect(() => {
        getGenders();
        getDepartments();
    }, [])


    return (
        <div className="md:w-1/3">
            <h2 className="font-black text-3xl text-center">Formulario de Registro</h2>
            <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Nombres</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Apellidos</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Ingreso</label>
                    <input
                        type="date"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Comentarios</label>
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Género</label>
                        <select
                            name="genderId"
                            value={formData.genderId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccione</option>
                            {genders.map(({ id, genderName }) => (
                                <option key={id} value={id}>{genderName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Departamento</label>
                        <select
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccione</option>
                            {departments.map(({ id, departmentName }) => (
                                <option key={id} value={id}>{departmentName}</option>
                            ))}

                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};
