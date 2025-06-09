import io from 'socket.io-client';

class SocketManagerUtil {
    constructor(env_variables) {
        this.ENV                = env_variables;
        this.server_base_url    = this.#getSocketBaseUrl();
        this.socket_link        = this.initializeSocket();
    }

    // Private method to get socket URL
    #getSocketBaseUrl = () => {
        const is_local_host = window.location.origin.includes('localhost');
        const is_production = this.ENV?.VITE_MODE === 'production';

        return is_local_host
            ? this.ENV?.VITE_SOCKET_BASEURL_TEST
            : is_production
            ? this.ENV?.VITE_SOCKET_BASEURL_LIVE
            : this.ENV?.VITE_SOCKET_BASEURL_TEST;
    }

    // Initialize socket connection
    initializeSocket = () => {
        try {
            return this.server_base_url ? io.connect(this.server_base_url) : null
        } 
        catch (error) {
            console.error("[SocketManagerUtil] Failed to connect to socket:", {
                baseUrl: this.server_base_url,
                error: error?.message || error,
            });
            return null;
        }
    }
}

export default SocketManagerUtil;
