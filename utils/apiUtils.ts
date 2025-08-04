// utils/apiTestUtils.ts
import { expect } from '@playwright/test';

export class ApiTestUtils {
    static validateResponseSchema(response: any, expectedSchema: any): void {
        // Basic schema validation
        for (const key of Object.keys(expectedSchema)) {
            expect(response).toHaveProperty(key);
            expect(typeof response[key]).toBe(expectedSchema[key]);
        }
    }

    static validateErrorResponse(response: any, expectedStatus: number, expectedMessage?: string): void {
        expect(response.status()).toBe(expectedStatus);
        
        if (expectedMessage) {
            response.json().then((data: any) => {
                expect(data.message).toContain(expectedMessage);
            });
        }
    }

    static async waitForCondition(condition: () => Promise<boolean>, timeout: number = 10000): Promise<void> {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            if (await condition()) {
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        throw new Error(`Condition not met within ${timeout}ms`);
    }
}