export interface Employee {
    empNumber: number;
    employeeId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    terminationId?: number | null;
}