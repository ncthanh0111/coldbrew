import { APIRequestContext, request, expect } from '@playwright/test';
import { ApiConfig } from '../config/apiConfig';

export class ApiHelper {
    private request: APIRequestContext;
    private baseURL: string;
    private authToken: string | null = null;

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
            data: { username, password }
        });

        expect(response.status()).toBe(200);
        const data = await response.json();
        this.authToken = data.data.token;
        
        // Update headers with auth token
        this.request = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                ...ApiConfig.HEADERS.DEFAULT,
                'Authorization': `Bearer ${this.authToken}`
            }
        });

        // Ensure authToken is always a string when returned
        if (this.authToken === null) {
            throw new Error('Login failed: authToken is null');
        }
        return this.authToken;
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