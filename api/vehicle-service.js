import axios from "axios";
import { settings } from "../utils/settings";
import { authHeader } from "./auth-header";

const API_URL = settings.apiUrl;

//token olmadan da calısıyor kullanıc olsanda olmasadan arabaları gormen ıcın
export const getVehicle  = ()=> {
    return axios.get(`${API_URL}/car/visitors/all`);
}