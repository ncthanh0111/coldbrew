export const ApiConfig = {
    // Base URLs for different environments
    BASE_URLS: {
        DEV: 'https://opensource-demo.orangehrmlive.com',
        STAGING: 'https://opensource-demo.orangehrmlive.com',
        PROD: 'https://opensource-demo.orangehrmlive.com'
    },
    
    // API Endpoints
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login'
        },
        USERS: {
            LIST: 'web/index.php/api/v2/admin/users'
        }
    },
    
    // Headers
    HEADERS: {
        DEFAULT: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        AUTH: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer {token}'
        }
    },
    
    // Timeouts
    TIMEOUTS: {
        REQUEST: 10000,
        RESPONSE: 30000
    },
    
    // Test Data
    TEST_DATA: {
        VALID_USER: {
            username: 'Admin',
            password: 'admin123'
        }
    }
};