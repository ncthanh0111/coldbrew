import { APIRequestContext } from '@playwright/test';
import { ApiConfig } from '../../config/apiConfig';
import { GetUsersRequest, GetUsersResponse, User } from '../../models/user.model';

export class UserApiHelper {
    private request: APIRequestContext;
    private baseURL: string;
    private cookie: string | null = null;

    constructor(request: APIRequestContext, baseURL: string = ApiConfig.BASE_URLS.PROD) {
        this.request = request;
        this.baseURL = baseURL;
    }

    setCookie(cookie: string): void {
        this.cookie = cookie;
    }

    async getUsers(params: GetUsersRequest = {}): Promise<GetUsersResponse> {
        const queryParams = this.buildQueryParams(params);
        const endpoint = `${ApiConfig.ENDPOINTS.USERS.LIST}${queryParams}`;
        
        const response = await this.request.get(endpoint, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok()) {
            throw new Error(`Get users failed: ${response.status()} ${response.statusText()}`);
        }

        return await response.json() as GetUsersResponse;
    }

    private buildQueryParams(params: GetUsersRequest): string {
        const searchParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });
        
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
    }

    private getAuthHeaders(): Record<string, string> {
        const headers = { ...ApiConfig.HEADERS.DEFAULT };
        
        if (this.cookie) {
            headers['Cookie'] = `orangehrm=${this.cookie}`;
        }
        
        return headers;
    }
}