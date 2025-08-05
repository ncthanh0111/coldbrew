import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/api/apiHelper';
import { ApiConfig } from '../../config/apiConfig';
import { GetUsersResponse } from '../../models/user.model';

test.describe('API Integration Tests', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async () => {
        apiHelper = new ApiHelper();
        await apiHelper.initialize();
    });

    test.afterEach(async () => {
        await apiHelper.dispose();
    });

    test('should perform get user list workflow', async () => {
        // 1. Login
        const { username, password } = ApiConfig.TEST_DATA.VALID_USER;
        await apiHelper.login(username, password);

        // 2. Get user list
        const response: GetUsersResponse = await apiHelper.userApi.getUsers();
        // Verify response structure
        expect(response).toHaveProperty('data');
        expect(response).toHaveProperty('meta');
        expect(response).toHaveProperty('rels');
        
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.meta).toHaveProperty('total');
        expect(response.meta).toHaveProperty('page');
        expect(response.meta).toHaveProperty('limit');
        expect(response.meta).toHaveProperty('totalPages');
        
        // Verify user data structure
        if (response.data.length > 0) {
            const user = response.data[0];
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('userName');
            expect(user).toHaveProperty('deleted');
            expect(user).toHaveProperty('status');
            expect(user).toHaveProperty('employee');
            expect(user).toHaveProperty('userRole');
            
            // Verify employee structure
            expect(user.employee).toHaveProperty('empNumber');
            expect(user.employee).toHaveProperty('employeeId');
            expect(user.employee).toHaveProperty('firstName');
            expect(user.employee).toHaveProperty('lastName');
            
            // Verify userRole structure
            expect(user.userRole).toHaveProperty('id');
            expect(user.userRole).toHaveProperty('name');
            expect(user.userRole).toHaveProperty('displayName');
        }
    });
});