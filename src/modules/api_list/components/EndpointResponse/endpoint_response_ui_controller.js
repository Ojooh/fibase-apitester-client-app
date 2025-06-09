import { getCurrentInstance } from "vue";

import AccordionUI from "@ui/Display/Accordion/accordion_ui.vue";

import EndpointResponseUIUtil from "./endpoint_response_ui_util";

class EndpointResponseUIController {
    constructor() {
        this.name                   = "endpoint_detail_ui";
        this.vm                     = null; 
        this.content_manager        = null;
        this.util                   = new EndpointResponseUIUtil(this.name, this.vm)
    }

    // Public method to expose components
    getUIComponents = () => {
        return { AccordionUI };
    };

    // Method to get ui props
    getUIProps = () => { 
        return {
            endpoint: { type: Object, required: true },
        } 
    }

    // State data
    getAppStateData = () => {
        this.vm                             = getCurrentInstance();
        this.content_manager                = this.vm?.proxy?.$content_manager;
        this.util.vm                        = this.vm;
        this.util.content_manager           = this.content_manager;

        const accordion_prop                = this.util.getAccordionUIProp;
    

        return { accordion_prop  }
    };

    // Computed variables
    getAppComputedVariables = () => { return {}; };

    // Watchers
    getAppWatchers = () => { return {}; };

    // Lifecycle: created
    handleOnCreatedLogic = () => {
        try {
            console.log(`[Created] Component ${this.name} has been created`);
        } catch (error) {
            console.error(`[Created] Error in Component ${this.name}:`, error);
        }
    };

    // Lifecycle: mounted
    handleOnMountedLogic = () => {
        try {
            console.log(`[Mounted] Component ${this.name} has been mounted`);
        } catch (error) {
            console.error(`[Mounted] Error in Component ${this.name}:`, error);
        }
    };

    // Lifecycle: beforeUnmount
    handleBeforeUnmountedLogic = () => {
        try {
            console.log(`[BeforeUnmount] Component ${this.name} will unmount`);
        } catch (error) {
            console.error(`[BeforeUnmount] Error in component ${this.name}:`, error);
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
            methods: this.util.getUtilMethods()
        };
    };
}


export default new EndpointResponseUIController().setVueJson();
