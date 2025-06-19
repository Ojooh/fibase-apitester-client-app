
import { createRouter, createWebHistory } from "vue-router";
const APIListView = () => import("@/modules/api_list/views/api_list_view.vue");


// Define the RouterManager class
class RouterManager {
    constructor(helper_util) {
        this.helper             = helper_util;
        this.meta_data_util     = this.helper?.meta_data_util;
        this.routes             = this.getRoutes();
        this.router             = this.createRouter();

        this.setupRouterGuards();
    }

    // Method to create the router instance
    createRouter = () => {
        return createRouter({ history: createWebHistory("/api-tester-ui"), routes: this.routes });
    }

    getRoutes = () => {
        return [
            { path: "/", name: "Home", requires_auth: false, component: APIListView },
        ];
    }

    // Method to set up router guards
    setupRouterGuards = () => {
        // Define global before guard for the router
        this.router.beforeEach(async (to, from, next) => {
            const route = this.routes.find((el) => el.name === to.name);

            if (!route) {
                console.warn("Route not found, redirecting back...");
                return next(from.fullPath); // Go back to previous route
            }
            
            // set meta data
            this.meta_data_util.setRouteMetaData(route);

            // authenticate member can view page resource
            return next();
        });
    }

}

export default RouterManager
