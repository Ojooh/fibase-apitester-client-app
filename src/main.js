import { createApp } from "vue";

import App from "@/App.vue";
import RouterManager from "@/router";
import HelperUtil from "@/utils/index_util";

class FibaseApitesterApp {
    constructor(app_component) {
        this.app_component              = app_component;
        this.ENV                        = import.meta.env;
        this.MODE                       = this.ENV.VITE_MODE;

        this.helper                     = new HelperUtil(this.ENV);
        
        this.meta_data_util             = this.helper?.meta_data_util;
        this.content_manager_util       = this.helper?.content_manager_util;
        this.event_system_util          = this.helper?.event_system_util;
        this.socket_manager_util        = this.helper?.socket_manager_util;

        this.router_manager             = new RouterManager(this.helper);
        this.router                     = this.router_manager.router;

        this.app                        = createApp(this.app_component);

        this.initializeAppGlobalProperties();
    }

    // method to get app content_data
    getAppContentData = async () => {
        const app_content_data_url      = this.ENV?.VITE_APP_CONTENT_DATA_URL;
        const icon_content_data_url     = this.ENV?.VITE_ICON_CONTENT_DATA_URL;

        if(app_content_data_url) { await this.content_manager_util.load(app_content_data_url, "content_resource"); }

        if ( icon_content_data_url) { await this.content_manager_util.load(icon_content_data_url, "icon_resource"); }
    }

    //initialze app gloabl variables
    initializeAppGlobalProperties = () => {
        this.app.config.globalProperties.$ENV               = this.ENV;
        this.app.config.globalProperties.$event_system      = this.event_system_util;
        this.app.config.globalProperties.$socket_link       = this.socket_manager_util?.socket_link;
        this.app.config.globalProperties.$content_manager   = this.content_manager_util;
        this.app.config.globalProperties.$helper            = this.helper;
    }

    // Method to mount the Vue app
    mountApp = async (selector) => {
        await this.getAppContentData();
        this.app.use(this.router);
        this.app.mount(selector);

        const meta_data_content     = this.content_manager_util.get("content_resource.meta_data", {});

        this.meta_data_util.setAppMetaData(meta_data_content);
    }

}

const main = async() => {
    // Create and mount the Vue app
    const vueApp = new FibaseApitesterApp(App);
    await vueApp.mountApp('#app');

}

main()



