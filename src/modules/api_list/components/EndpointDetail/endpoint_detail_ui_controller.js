import { getCurrentInstance } from "vue";

import LoggerUtil from "@ui/Logger/logger_util.js";

import FieldsetUI from "@ui/Form/Fieldset/fieldset_ui.vue";
import InputGroupUI from "@ui/Form/InputGroup/input_group_ui.vue";
import ActionButtonUI from "@ui/Form/Button/action_button_ui.vue";
import EndpointResponseUI from "../EndpointResponse/endpoint_response_ui.vue";

import EndpointDetailUIUtil from "./endpoint_detail_ui_util";

class EndpointDetailUIController {
    constructor() {
        this.name                   = "endpoint_detail_ui";
        this.vm                     = null; 
        this.content_manager        = null;
        this.util                   = null;
        this.logger                 = new LoggerUtil({ prefix: this.name?.toUpperCase() });
    }

    // Public method to expose components
    getUIComponents = () => {
        return { FieldsetUI, InputGroupUI, ActionButtonUI, EndpointResponseUI };
    };

    // Method to get ui props
    getUIProps = () => { 
        return {
            endpoint: { type: Object, required: true },

            index: { type: Number, required: true },
        } 
    }

    // State data
    getAppStateData = () => {
        this.vm                             = getCurrentInstance();
        this.content_manager                = this.vm?.proxy?.$content_manager;
        this.util                           = new EndpointDetailUIUtil(this.name, this.vm);
        
        const header_input_group_prop       = this.util?.getHeaderInputGroupProp();
        const query_prop                    = this.util?.getQueryInputGroupProp();
        const params_prop                   = this.util?.getParamsInputGroupProp();
        const body_prop                     = this.util?.getBodyInputGroupProp();
        const submit_btn_prop               = this.util?.getSubmitBtnProp();

        return { 
            header_input_group_prop, query_prop, params_prop,  body_prop, submit_btn_prop,
            util: this.util 
        }
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


export default new EndpointDetailUIController().setVueJson();
