import { useEffect, useState } from "react";
import { IEmployee, IFormData } from "../interfaces";
import { API } from "../api";

export const useEmployee = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEmployees = async() =>{
    try {

      setIsLoading(true);
      const response = await API.get('/employees');
      setEmployees(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      setEmployees([]);
      setIsLoading(false);
      console.error(error);
    }
  }

  const createEmployees = async(data:IFormData) =>{
    try {
      setIsLoading(true);
      await API.post('/employee',data);
      getEmployees();  

    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  const deleteEmployee = async(id:number) =>{
    try {
      setIsLoading(true);
      await API.delete(`/employee/${id}`);
      getEmployees();  

    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }
  

  useEffect(() => {
    getEmployees();
  }, [])
  
  return {
    employees,
    isLoading,
    createEmployees,
    deleteEmployee
  }
}
