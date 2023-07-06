import axios from "axios";
import env from "../config/env";

export const service = axios.create({
    baseURL: env.apiBaseURL,
    timeout: 45000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Baerer ${env.token}`
    }
});