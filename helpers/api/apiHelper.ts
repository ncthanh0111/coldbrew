import { APIRequestContext, request, expect } from '@playwright/test';
import { ApiConfig } from '../../config/apiConfig';
import { UserApiHelper } from './userHelper';

export class ApiHelper {
    private request: APIRequestContext;
    private baseURL: string;
    private cookie: string | null = null;
    public userApi: UserApiHelper;

    constructor(baseURL: string = ApiConfig.BASE_URLS.PROD) {
        this.baseURL = baseURL;
    }

    async initialize(): Promise<void> {
        this.request = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: ApiConfig.HEADERS.DEFAULT
        });

    }

    async login(username: string, password: string): Promise<string> {
        const response = await this.request.post(ApiConfig.ENDPOINTS.AUTH.LOGIN, {
            form: {
                username: username,
                password: password
            }
        });

        expect(response.status()).toBe(200);
        const data = await response.json();
        this.cookie = data.cookies.find(cookie => cookie.name === 'orangehrm')?.value;
        
        // Update headers with auth token
        this.request = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                ...ApiConfig.HEADERS.DEFAULT,
                'Cookie': `orangehrm=${this.cookie}`
            }
        });

        this.userApi = new UserApiHelper(this.request, this.baseURL);
        this.userApi.setCookie(this.cookie as string);

        // Ensure authToken is always a string when returned
        if (this.cookie === null) {
            throw new Error('Login failed: authToken is null');
        }
        return this.cookie;
    }

    async get(endpoint: string, params?: Record<string, any>): Promise<any> {
        const response = await this.request.get(endpoint, {
            params,
            timeout: ApiConfig.TIMEOUTS.REQUEST
        });
        
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async post(endpoint: string, data?: any): Promise<any> {
        const response = await this.request.post(endpoint, {
            data,
            timeout: ApiConfig.TIMEOUTS.REQUEST
        });
        
        expect([200, 201]).toContain(response.status());
        return await response.json();
    }

    async put(endpoint: string, data?: any): Promise<any> {
        const response = await this.request.put(endpoint, {
            data,
            timeout: ApiConfig.TIMEOUTS.REQUEST
        });
        
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async delete(endpoint: string): Promise<any> {
        const response = await this.request.delete(endpoint, {
            timeout: ApiConfig.TIMEOUTS.REQUEST
        });
        
        expect([200, 204]).toContain(response.status());
        return response.status() === 200 ? await response.json() : null;
    }

    async dispose(): Promise<void> {
        await this.request.dispose();
    }
}