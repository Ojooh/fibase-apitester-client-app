import APIBase from "./base_api";

class APIListAPI extends APIBase {
    constructor(ENV) { super(ENV); }

    getAllAPIRoutes = async (params = {}) => {
        const url = `/api-tester/all-routes/`;
        const config = { url, params, method: "GET" };
        return await this.queryAPI(config);
    }
}

export default APIListAPI;