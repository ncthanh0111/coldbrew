import { Employee } from "./employee.model";

export interface User {
    id: number;
    userName: string;
    deleted: boolean;
    status: boolean;
    employee: Employee;
    userRole: UserRole;
}

export interface UserRole {
    id: number;
    name: string;
    displayName: string;
}

export interface GetUsersRequest {
    limit?: 50;
    offset?: 0;
    sortField?: 'u.userName';
    searchTerm?: 'ASC' | 'DESC';
}

export interface GetUsersResponse {
    data: User[];
    meta: {
        total: number;
    };
    rels: [];
}