import { settings } from "../settings";

const API_URL = settings.apiUrl;

export const getVehicleImage = (id) => {
    return { uri: `${API_URL}/files/display/${id}` }
}