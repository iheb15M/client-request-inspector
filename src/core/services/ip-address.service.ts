interface IpRegexes {
    ipv4: RegExp,
    ipv6: RegExp,
}

export class IpAddressService {

    public static regexes: IpRegexes = {
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
    };

    private static headersParams: string[] = [
        'x-client-ip',
        'cf-connecting-ip',
        'do-connecting-ip',
        'fastly-client-ip',
        'true-client-ip',
        'x-real-ip',
        'x-cluster-client-ip',
        'x-forwarded',
        'forwarded-for',
        'forwarded',
        'x-appengine-user-ip'
    ];

    /**
     * Replaces is.ip from is_js.
     * @param {*} value - The value to test
     * @returns {boolean} True if the value is an IP address, otherwise false
     */
    public static ip(value: any): boolean {
        return (!!value && this.regexes.ipv4.test(value)) || this.regexes.ipv6.test(value);
    }


    /**
     * Replaces is,.string from is_js.
     * @param {*} value - The value to test
     * @returns True if the value is a string, otherwise false
     */
    public static string(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object String]';
    }

    /**
     * Parse x-forwarded-for headers.
     *
     * @param {string} value - The value to be parsed.
     * @return {string|null} First known IP address, if any.
     */
    private static getClientIpFromXForwardedFor(value: string): string | null {
        if (!value) { return null;}

        if (!this.string(value)) {
            throw new TypeError(`Expected a string, got "${typeof value}"`);
        }

        const forwardedIps = value.split(',').map((e) => {
            const ip = e.trim();
            if (ip.includes(':')) {
                const splitted = ip.split(':');
                if (splitted.length === 2) { return splitted[0];}
            }
            return ip;
        });

        for (const element of forwardedIps) {
            if (this.ip(element)) { return element; }
        }
        return null;
    }

    /**
     * Determine client IP address.
     *
     * @param req
     * @returns {string} ip - The IP address if known, defaulting to empty string if unknown.
     */
    public static getClientIp(req: any): string | null {

        if (req && req.headers) {
            const xForwardedFor = this.getClientIpFromXForwardedFor(
                req.headers['x-forwarded-for'],
            );
            if (this.ip(xForwardedFor)) {
                return xForwardedFor;
            }
            const headerParam = this.headersParams.find((param) => this.ip(req.headers[param]));
            if (!!headerParam){ return req.headers[headerParam]; }
        }

        if (!!req.socket && this.ip(req.socket.remoteAddress)) {
            return req.socket.remoteAddress;
        }

        if (!!req.info && this.ip(req.info.remoteAddress)) {
            return req.info.remoteAddress;
        }

        // AWS Api Gateway + Lambda
        if (!!req.requestContext && !!req.requestContext.identity && this.ip(req.requestContext.identity.sourceIp)) {
            return req.requestContext.identity.sourceIp;
        }

        if (req.headers) {
            if (this.ip(req.headers['Cf-Pseudo-IPv4'])) {
                return req.headers['Cf-Pseudo-IPv4'];
            }
        }

        if (!!req.raw) {
            return this.getClientIp(req.raw);
        }

        return null;
    }

}
