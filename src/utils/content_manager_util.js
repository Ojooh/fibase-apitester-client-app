
class ContentManagerUtil {
    constructor(global_var_instance) {
        this.global_var_instance    = global_var_instance;
        this.content_data_key       = "CONTENT_DATA";
        this.content_data           = this.global_var_instance.getVariable(this.content_data_key) || {}
        this.is_loaded              = false;
    }

    // Load content data from a given JSON URL.
    load = async (json_url, json_key) => {
        if (this.is_loaded) { return; }

        try {
            const response = await fetch(json_url);

            if (!response?.ok) {
                throw new Error(`Failed to fetch content data: ${response.statusText}`);
            }

            const content           = await response.json();
            const response_data     = { [json_key]: content };
            this.content_data       = { ...response_data };
            this.is_loaded          = Object.keys(this.content_data).length > 0;
            
            this.global_var_instance.setVariable(this.content_data_key, this.content_data);
            
            return this.is_loaded;
        } 
        catch (error) {
            console.error("[ContentDataManager] Error loading content data:", error);
            throw error;
        }
    }

    // Get a value from the loaded content data using a key.
    get = (key_path, default_value = null) => {
        if (!this.is_loaded) {
            console.warn(`[ContentDataManager] Missing key path: ${key_path}`);
            return default_value;
        }

        if (!this.content_data || Object.keys(this.content_data).length === 0) {
            console.warn("[ContentDataManager] No content data found in memory.");
            return default_value;
        }

        const value = key_path.split('.').reduce((obj, key) => {
            return (obj && Object.prototype.hasOwnProperty.call(obj, key)) ? obj[key] : undefined;
        }, this.content_data);

        if (value === undefined) {
            console.warn(`[ContentDataManager] Missing key path: ${key_path}`);
            return default_value;
        }

        return value;
    }

    // Reset/clear stored data (useful for hot reload or manual refresh).
    reset = () => {
        this.content_data   = {};
        this.is_loaded      = Object.keys(this.content_data).length > 0;

        this.global_var_instance.setVariable(this.content_data_key, this.content_data)
    }
}

export default ContentManagerUtil
