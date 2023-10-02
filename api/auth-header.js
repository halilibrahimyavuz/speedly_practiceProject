import * as SecureStore from "expo-secure-store";


export const authHeader = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
        return { Authorization: `Bearer ${token}` }
    }
    else {
        return {}
    }
}