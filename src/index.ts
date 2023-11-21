import {ClientInspectorService} from "./core/services/client-inspector.service";
import {ClientInspectorModel} from "./core/models/client-inspector.model";

exports.clientInspector = async (req: any): Promise<ClientInspectorModel> => {
    return await ClientInspectorService.inspect(req);
}
