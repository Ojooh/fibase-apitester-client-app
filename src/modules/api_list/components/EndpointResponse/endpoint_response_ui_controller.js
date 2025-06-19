import { getCurrentInstance } from "vue";

import LoggerUtil from "@ui/Logger/logger_util.js";
import AccordionUI from "@ui/Display/Accordion/accordion_ui.vue";
import JSONViewerUI from "@ui/Display/JSONViewer/json_viewer_ui.vue";

import EndpointResponseUIUtil from "./endpoint_response_ui_util";

class EndpointResponseUIController {
    constructor() {
        this.name                   = "endpoint_detail_ui";
        this.vm                     = null; 
        this.content_manager        = null;
        this.util                   = null;
        this.logger                 = new LoggerUtil({ prefix: this.name?.toUpperCase() });
    }

    // Public method to expose components
    getUIComponents = () => {
        return { AccordionUI, JSONViewerUI };
    };

    // Method to get ui props
    getUIProps = () => { 
        return {
            response_obj: { type: Object, required: true },

            id: { type: String, require: true }
        } 
    }

    // State data
    getAppStateData = () => {
        this.vm                             = getCurrentInstance();
        this.content_manager                = this.vm?.proxy?.$content_manager;
        this.util                           = new EndpointResponseUIUtil(this.name, this.vm);
        const accordion_prop                = this.util?.getAccordionUIProp;
    

        return { accordion_prop, util: this.util   }
    };

    // Computed variables
    getAppComputedVariables = () => { return {}; };

    // Watchers
    getAppWatchers = () => { return {}; };

    // Lifecycle: created
    handleOnCreatedLogic = () => {
        try {
            this.logger.log(`[Created] Component ${this.name} has been created`);
        } catch (error) {
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
            props: this.getUIProps(),
            data: this.getAppStateData,
            computed: this.getAppComputedVariables(),
            watch: this.getAppWatchers(),
            created: this.handleOnCreatedLogic,
            mounted: this.handleOnMountedLogic,
            beforeUnmount: this.handleBeforeUnmountedLogic,
        };
    };
}


export default new EndpointResponseUIController().setVueJson();
