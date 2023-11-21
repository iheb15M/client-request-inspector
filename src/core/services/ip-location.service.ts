import {City, Reader} from "@maxmind/geoip2-node";
import { readFileSync } from "fs";

export class IpLocationService {
    private static readonly dbPath: string = `${__dirname}/../../data/GeoLite2-City.mmdb`;

    static async getLocation(ip: string): Promise<City | null> {
        try {
            const dbBuffer = readFileSync(this.dbPath);
            const [reader] = await Promise.all([Reader.openBuffer(dbBuffer)]);
            return reader.city(ip);
        } catch (error) {
            console.error("Error in IpLocationService:", error);
            // Handle the error appropriately
            return null;
        }
    }
}
