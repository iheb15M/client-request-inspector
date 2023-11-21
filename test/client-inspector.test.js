"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_inspector_service_1 = require("../src/core/services/client-inspector.service");
describe('ClientInspectorService', () => {
    it('should inspect client data correctly', () => {
        // Mocking a request object with headers and socket information
        const reqMock = {
            headers: {
                'x-forwarded-for': '102.156.114.4',
                'user-agent': 'Test Browser',
            },
            socket: {
                remoteAddress: '102.156.114.4',
            },
        };
        // Assuming that your inspect method processes the user-agent and extracts browser information
        const clientData = client_inspector_service_1.ClientInspectorService.inspect(reqMock);
        // Expectation: The inspect method should correctly process the client data
        expect(clientData).toEqual({
            ip: reqMock.headers['x-forwarded-for'],
            browser: 'Test Browser',
            location: {
                isoCode: "TN",
                country: "Tunisia",
                continent: "Africa",
                timeZone: "Africa/Tunis"
            },
        });
    });
});
