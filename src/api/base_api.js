import axios from 'axios';
import Cookies from "js-cookie";
import HelperUtil from '@/utils/index_util';

class BaseAPI {
    constructor(ENV) {
        this.ENV                = ENV;
        this.api_base_url       = "";
        this.api_instance       = null;
        this.is_production      = this.ENV?.VITE_MODE === "production";
        this.is_staging         = this.ENV?.VITE_MODE === "staging";
        this.helper             = new HelperUtil(this.ENV);
        this.device_util        = this.helper?.device_fingerprint_util;
        this.local_storage_util = this.helper?.local_storage_util;
        
        this.setAPIBaseInsance();
    }

    setAPIBaseInsance = () => {
        if (window.origin.includes('localhost') || window.origin.includes('127.0.0.1')) { this.api_base_url = `${this.ENV.VITE_API_BASE_URL_TEST}`; }

        else if (this.is_production) { this.api_base_url = `${this.ENV.VITE_API_BASE_URL_LIVE}`; }

        else if (this.is_staging) { this.api_base_url = `${this.ENV.VITE_API_BASE_URL_TEST}`; }

        this.api_instance = axios.create({ baseURL: this.api_base_url, withCredentials: true, timeout: 100000 })

        // Attach interceptors to the Axios instance
        this.api_instance.interceptors.request.use(this.setTokenRefreshInterceptor);
    }

    queryAPI = async (config) => {
        try {
            const response = await this.api_instance(config);

            const status_code = response?.status;

            if (status_code == 401 || status_code == 429) { return { status: "logout", msg } }

            const { status, msg, data } = response?.data;

            if (!this.is_production && !this.is_staging) { console.log({ status, msg, data }) }

            return { status, msg, data, full_response: response };
        }
        catch (error) {
            if (this.is_production) { console.log({ api_error: error }); }

            const error_status_code     = error?.response?.status;
            const error_msg             = error?.response?.data?.msg || error.message || "invalid_error_request";

            if (error_status_code == 401 || error_status_code == 429) { return { status: "logout", msg: error_msg, full_response: error?.response } }

            return { status: 'error', msg: error_msg, full_response: error?.response };
        }
    }

    getDeviceHeaders = () => {
        const local_id_key      = "DEVICE_ID";
        const local_name_key    = "DEVICE_NAME";
        let device_id           = this.local_storage_util.getData(local_id_key);
        let device_name         = this.local_storage_util.getData(local_name_key);

        // Generate and store if not already set
        if (!device_id && this.device_util) {
            device_id       = this.device_util.generateFingerprint();
            device_name     = this.device_util.getDeviceName();

            this.local_storage_util.storeData(local_id_key, device_id);
            this.local_storage_util.storeData(local_name_key, device_name);
        }

        return { device_id, device_name };
    }

    setTokenRefreshInterceptor = (config) => {
        try {
            if (!config?.headers) { config.headers = {}; }

            const { device_id, device_name } = this.getDeviceHeaders();

            if (device_id && device_name) {
                config.headers["x-device-id"]       = device_id;
                config.headers["x-device-name"]     = device_name;
            }

            return config
            
        }
        catch (error) {
            if (!this.is_production && !this.is_staging) { console.log({ error }); }

            throw error;
        }
    }
}

export default BaseAPI;