import APIBase from "./base_api";

class APIListAPI extends APIBase {
    constructor(ENV) { super(ENV); }

    getAllAPIRoutes = async (params = {}) => {
        const url = `/api-tester/all-routes/`;
        const config = { url, params, method: "GET" };
        return await this.queryAPI(config);
    }

    testEndpoint = async (url, method, query, body, headers) => {
        const config = { url, method };

        if(query && Object.keys(query).length) { config.params = query }

        if(body && Object.keys(body).length) { config.data = body }

        if(headers && Object.keys(headers).length) { config.headers = headers }

        return await this.queryAPI(config);
    }
}

export default APIListAPI;