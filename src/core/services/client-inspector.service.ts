import {ClientInspectorModel} from "../models/client-inspector.model";
import {IpLocationService} from "./ip-location.service";
import {City} from "@maxmind/geoip2-node";
import {LocationInspectorModel} from "../models/location-inspector.model";
import {IpAddressService} from "./ip-address.service";


export class ClientInspectorService {
    /**
     * Get client data as a service.
     * @param {any} req - Request object.
     * @returns {ClientInspectorService} - Client data object.
     */
    static async inspect(req: any): Promise<ClientInspectorModel> {
        // Extract IP address
        const clientIp: string = <string>IpAddressService.getClientIp(req);

        // Extract browser type
        const browserType: string = <string>req.headers['user-agent'];

        // Extract user location
        const city = await IpLocationService.getLocation(clientIp);
        if (!!city){
            const {country, continent, location} = city;
            const clientLocation: LocationInspectorModel = {
                isoCode: country?.isoCode,
                country: country?.names.en,
                continent: continent?.names.en,
                timeZone: location?.timeZone
            }
            return {
                ip: clientIp,
                browser: browserType,
                location: clientLocation,
            };
        } else {
            return {
                ip: clientIp,
                browser: browserType
            };
        }

    }
}
