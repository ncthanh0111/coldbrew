import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/apiHelper';
import { ApiConfig } from '../../config/apiConfig';

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
        const getUserResponse = await apiHelper.get(`${ApiConfig.ENDPOINTS.USERS.LIST}`);
        expect(getUserResponse.data.username).toContain(username);
    });
});