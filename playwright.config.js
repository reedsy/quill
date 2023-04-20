"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const config = {
    testDir: './e2e',
    testMatch: '*.spec.ts',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 10 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'list',
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'Chrome', use: Object.assign({}, test_1.devices['Desktop Chrome']) },
        { name: 'Firefox', use: Object.assign({}, test_1.devices['Desktop Firefox']) },
        { name: 'Safari', use: Object.assign({}, test_1.devices['Desktop Safari']) },
        { name: 'Edge', use: { channel: 'msedge' } },
    ],
};
exports.default = config;
//# sourceMappingURL=playwright.config.js.map