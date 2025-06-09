import { getCurrentInstance } from "vue";


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
        this.util                   = new EndpointDetailUIUtil(this.name, this.vm)
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
        this.util.vm                        = this.vm;
        this.util.content_manager           = this.content_manager;
        
        const header_input_group_prop       = this.util.getHeaderInputGroupProp();
        const query_params_prop             = this.util.getQueryParametersInputGroupProp();
        const body_prop                     = this.util.getBodyInputGroupProp();
        const submit_btn_prop               = this.util.getSubmitBtnProp();

        return { header_input_group_prop, query_params_prop, body_prop, submit_btn_prop }
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


export default new EndpointDetailUIController().setVueJson();
