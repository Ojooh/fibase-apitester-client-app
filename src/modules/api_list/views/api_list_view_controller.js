import { markRaw, getCurrentInstance } from "vue";

import LoggerUtil from "@ui/Logger/logger_util.js";

import XBarLoaderUI from "@ui/Loader/ListLoader/x_bar_loader_ui.vue";
import AccordionUI from "@ui/Display/Accordion/accordion_ui.vue";
import EndpointDetailUI from "../components/EndpointDetail/endpoint_detail_ui.vue";

import APIListViewUtil from "./api_list_view_util";

class APIListViewController {
    constructor() {
        this.name                   = "api_list_view_controller";
        this.vm                     = null; 
        this.content_manager        = null;
        this.util                   = null;
        this.logger                 = new LoggerUtil({ prefix: this.name?.toUpperCase() });
    }

    // Public method to expose components
    getUIComponents = () => {
        return { XBarLoaderUI, AccordionUI, EndpointDetailUI };
    };

    // State data
    getAppStateData = () => {
        this.vm                             = getCurrentInstance();
        this.util                           = new APIListViewUtil(this.name, this.vm);
        this.content_manager                = this.vm?.proxy?.$content_manager;
        const accordion_prop                = this.util?.getAccordionUIProp;

        return { accordion_prop, loading: true, route_groups: {}, util: this.util  }
    };

    // Computed variables
    getAppComputedVariables = () => { return {}; };

    // Watchers
    getAppWatchers = () => { return {}; };

    // Lifecycle: created
    handleOnCreatedLogic = async () => {
        try { await this.util?.getAllAPIRoutes() } 

        catch (error) {
            this.logger.error(`[Created] Error in Component ${this.name}:`, error);
        }
    };

    // Lifecycle: mounted
    handleOnMountedLogic = () => {
        try {
            this.logger.log(`[Mounted] Component ${this.name} has been mounted`);
        } catch (error) {
            this.logger.error(`[Mounted] Error in Component ${this.name}:`, error);
        }
    };

    // Lifecycle: beforeUnmount
    handleBeforeUnmountedLogic = () => {
        try {
            this.logger.log(`[BeforeUnmount] Component ${this.name} will unmount`);
        } catch (error) {
            this.logger.error(`[BeforeUnmount] Error in component ${this.name}:`, error);
        }
    };

    // Get final Vue component definition
    setVueJson = () => {
        return {
            components: this.getUIComponents(),
            data: this.getAppStateData,
            computed: this.getAppComputedVariables(),
            watch: this.getAppWatchers(),
            created: this.handleOnCreatedLogic,
            mounted: this.handleOnMountedLogic,
            beforeUnmount: this.handleBeforeUnmountedLogic,
        };
    };
}


export default new APIListViewController().setVueJson();