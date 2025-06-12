
import { LOCAL_STORAGE_KEY_FIELD_NAMES } from "@/enums/constants.enums";

class LocalStorageManagerUtil {
    constructor(env_variables, encryptor_decryptor_util) {
        this.env_variables              = env_variables
        this.encryptor_decryptor_util   = encryptor_decryptor_util;
    }

    // Method to get temp data
    getTempData = (key) => {
        try {
            if(!key) { return null }

            const key_field_name    = this.env_variables?.VITE_LOCAL_STORAGE_KEY_FIELD_NAME;
            const store_keys        = localStorage.getItem(key_field_name);
            const keys              = store_keys ? JSON.parse(store_keys) : [];
            const field_name        = LOCAL_STORAGE_KEY_FIELD_NAMES[key];

            if (!field_name || !keys.includes(key)){ return null; }

            const raw_data = localStorage.getItem(field_name);

            if (!raw_encrypted) return null;

            const decrypted = this.encryptor_decryptor_util.decrypt(raw_data);

            return decrypted ? JSON.parse(decrypted)?.encrypted_data : null;
        }
        catch (err) {
			console.warn(`Failed to decrypt localStorage key: ${field_name}`, err);
			return null;
		}
    }

    // Method to store data in local storage
    storeData = (key, value) => {
        try {
            if (!key || value == null) {
                console.error("Key or value missing");
                return false;
            }

            if ((typeof value === "object" && Object.keys(value).length <= 0) || (Array.isArray(value) && value.length <= 0)) {
                console.error("Invalid value: empty object or array");
                return false;
            }

            const keys_field_name    = this.env_variables?.VITE_LOCAL_STORAGE_KEY_FIELD_NAME;
            const store_keys        = localStorage.getItem(keys_field_name);
            const keys              = store_keys ? JSON.parse(store_keys) : [];
            const data_obj          = { encrypted_data: value };
            const field_name        = LOCAL_STORAGE_KEY_FIELD_NAMES[key];

            if(!field_name) { return false }

            if (!keys.includes(key)) { keys.push(key); }

            const encrypted = this.encryptor_decryptor_util.encrypt(JSON.stringify(data_obj))

            localStorage.removeItem(field_name);
            localStorage.setItem(field_name, encrypted);
            localStorage.setItem(keys_field_name, JSON.stringify(keys));
            return true
        }
        catch (err) {
			console.error("Failed to encrypt and store data", err);
			return false;
		}
    }

    // Method to delete data from local storage
    deleteData = (key) => {
        if (!key) {  return false; }

        const keys_field_name   = this.env_variables?.VITE_LOCAL_STORAGE_KEY_FIELD_NAME;
        const store_keys        = localStorage.getItem(keys_field_name);
        const keys              = store_keys ? JSON.parse(store_keys) : [];
        const field_name        = LOCAL_STORAGE_KEY_FIELD_NAMES[key];
        const new_keys          = keys.filter(item => item !== key);

		if (!field_name)  { return false; }

        localStorage.removeItem(field_name);
        localStorage.setItem(keys_field_name, JSON.stringify(new_keys));

        return true;
    }
}

export default LocalStorageManagerUtil