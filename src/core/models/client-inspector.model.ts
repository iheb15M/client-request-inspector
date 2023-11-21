import {LocationInspectorModel} from "./location-inspector.model";

export interface ClientInspectorModel {
    ip?: string | string[],
    browser?: string,
    location?: LocationInspectorModel,
}
