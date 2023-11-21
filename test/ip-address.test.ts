import {IpAddressService} from "../src/core/services/ip-address.service";

describe('IpAddressService', () => {
    describe('ip method', () => {
        it('should correctly validate IPv4 addresses', () => {
            expect(IpAddressService.ip('192.168.1.1')).toBe(true);
            expect(IpAddressService.ip('256.0.0.1')).toBe(false); // Invalid IPv4
        });

        it('should correctly validate IPv6 addresses', () => {
            expect(IpAddressService.ip('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
            expect(IpAddressService.ip('invalid_ipv6')).toBe(false); // Invalid IPv6
        });

        it('should return false for non-IP values', () => {
            expect(IpAddressService.ip('not_an_ip')).toBe(false);
            expect(IpAddressService.ip(null)).toBe(false);
            expect(IpAddressService.ip(undefined)).toBe(false);
        });
    });

    describe('getClientIp method', () => {
        // Mock request object for testing
        const mockRequest = {
            headers: {
                'x-forwarded-for': '192.168.1.1, 10.0.0.1, proxy-server',
                'cf-connecting-ip': '203.0.113.1',
            },
            socket: {
                remoteAddress: '127.0.0.1',
            },
        };

        it('should correctly extract client IP from x-forwarded-for header', () => {
            expect(IpAddressService.getClientIp(mockRequest)).toBe('192.168.1.1');
        });

        it('should fallback to socket remote address if x-forwarded-for is unavailable', () => {
            const requestWithoutHeaders = {
                socket: {
                    remoteAddress: '127.0.0.1',
                },
            };
            expect(IpAddressService.getClientIp(requestWithoutHeaders)).toBe('127.0.0.1');
        });

        it('should return null if client IP cannot be determined', () => {
            const requestWithoutHeadersAndSocket = {};
            expect(IpAddressService.getClientIp(requestWithoutHeadersAndSocket)).toBe(null);
        });

        it('should handle Cloudflare pseudo-IPv4 header', () => {
            const requestWithCloudflareHeader = {
                headers: {
                    'Cf-Pseudo-IPv4': '203.0.113.1',
                },
            };
            expect(IpAddressService.getClientIp(requestWithCloudflareHeader)).toBe('203.0.113.1');
        });
    });
});
