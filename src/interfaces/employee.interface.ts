import { IDepartment, IGender} from "./";

export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    comments: string;
    genderId: number;
    departmentId: number;
    department: IDepartment;
    gender: IGender;
}
