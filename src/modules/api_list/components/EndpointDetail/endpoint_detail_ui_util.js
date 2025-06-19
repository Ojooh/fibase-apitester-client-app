
import LoggerUtil from "@ui/Logger/logger_util.js";
import SVGIcons from "@ui/Resources/svg_icon_resource";

import APIListAPI from "@/api/api_list_api";

class EndpointDetailUIUtil {
    constructor (name, vue_isnatnce) {
        this.name               = "endpoint_detail_ui_uitl"
        this.vm                 = vue_isnatnce
        this.content_manager    = this.vm?.proxy?.$content_manager;
        this.ENV                = import.meta.env;
        this.api                = new APIListAPI(this.ENV);
        this.logger             = new LoggerUtil({ prefix: this.name?.toUpperCase() });
    }

    // Method to resolve endppoint url
    #resolveEndpointPath = (endpoint, params = {}, base_prefix = '/web-api/v1') => {
        let path = endpoint.startsWith(base_prefix) ? endpoint.slice(base_prefix.length) : endpoint;

        path = path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
            return params[key] !== undefined ? params[key] : `:${key}`; // fallback to original if missing
        });

        return path;
    }

    // method to get inpt data from input group
    #getInputDataFromInputGroup = (input_group) => { return JSON.parse(input_group?.input_config?.value); }

    // method to handle submit btn click
    handleSubmitBtnClickEvent = async (e) => {
        try {
            this.vm.data.btn_loading = true;
            const { body_prop, query_prop, params_prop, header_input_group_prop } = this?.vm?.data;
            const { path, method, headers, query, params, body } = this.vm?.props?.endpoint;
            const updated_body     = body && Object.keys(body).length ? this.#getInputDataFromInputGroup(body_prop) : null;
            const updated_query    = query && Object.keys(query).length ? this.#getInputDataFromInputGroup(query_prop) : null;
            const updated_params   = params && Object.keys(params).length ? this.#getInputDataFromInputGroup(params_prop) : {};
            const updaed_headers   = headers && Object.keys(header_input_group_prop).length ? this.#getInputDataFromInputGroup(header_input_group_prop) : {};
            const resolved_url     = this.#resolveEndpointPath(path, updated_params);

            const { status, msg, data, full_response } = await this.api.testEndpoint(resolved_url, method, updated_query, updated_body, updaed_headers);

            console.log({ full_response })
            this.vm.data.response_obj = full_response;

            return;
        }
        catch(error) {
            this.logger.error(`Error Occurred in ${this.name}`, error)
            return;
        }
        finally { this.vm.data.btn_loading = false }
    }

    // Method to get submit button prop
    getSubmitBtnProp = () => {
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");
        const { submit_btn_text }           = header_content_data;

        return {
            config: {
                btn_type: "button", class_style: "py-2 px-4 shadow text-white font-bold flex justify-center items-center bg-[#33b27b] hover:scale-105 rounded-lg", 
                btn_text: `<span class="w-6 h-6 mr-2 flex items-center">${SVGIcons?.paper_airplane_send_svg_icon}</span> <strong>${submit_btn_text}</strong>`, 
                handleClickEvent: this.handleSubmitBtnClickEvent
            }
        }
    }

    // Method to get body input group
    getBodyInputGroupProp = () => {
        const { endpoint }                  = this.vm?.props
        const default_body_value            = JSON.stringify(endpoint?.body, null, 4);
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");

        const { body_label_text, body_placeholder_text } = header_content_data;
        
        return {
            input_group_class_style: "flex flex-col items-center justify-start",

            label_config: { for: "body", class_style: "font-bold text-lg w-full truncate", label_text: body_label_text },

            input_config: { input_type: "textarea", id: "body", rows: 8, value: default_body_value, placeholder: body_placeholder_text, input_class_style: "border border-[#232759] rounded-lg bg-gray-50"  }
        }
    }

    // Method to get parameters input group
    getParamsInputGroupProp = () => {
        const { endpoint }                  = this.vm?.props;
        const default_params_value          = JSON.stringify(endpoint?.params, null, 4);
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");

        const { params_label_text, params_placeholder_text } = header_content_data;
        
        return {
            input_group_class_style: "flex flex-col items-center justify-start",

            label_config: { for: "params", class_style: "font-bold text-lg w-full truncate", label_text: params_label_text },

            input_config: { input_type: "textarea", id: "params", rows: 8, value: default_params_value, placeholder: params_placeholder_text, input_class_style: "border border-[#232759] rounded-lg bg-gray-50"  }
        }
    }

    // Method to get query parameters input group
    getQueryInputGroupProp = () => {
        const { endpoint } = this.vm?.props;
        const default_query_value    = JSON.stringify(endpoint?.query, null, 4);
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");

        const { query_label_text, query_placeholder_text } = header_content_data;
        
        return {
            input_group_class_style: "flex flex-col items-center justify-start",

            label_config: { for: "query", class_style: "font-bold text-lg w-full truncate", label_text: query_label_text },

            input_config: { input_type: "textarea", id: "query", rows: 8, value: default_query_value, placeholder: query_placeholder_text, input_class_style: "border border-[#232759] rounded-lg bg-gray-50"  }
        }
    }

    // Method to get headers input group
    getHeaderInputGroupProp = () => {
        const { endpoint } = this.vm?.props
        const { device_id, device_name }    = this.api.getDeviceHeaders();
        const updated_headers               = {...endpoint?.headers, "x-device-id": device_id, "x-device-name": device_name}
        const default_header_config_value   = JSON.stringify(updated_headers, null, 4);
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");

        const { headers_label_text, headers_placeholder_text } = header_content_data;

        return {
            input_group_class_style: "flex flex-col items-center justify-start",

            label_config: { for: "header_config", class_style: "font-bold text-lg w-full truncate", label_text: headers_label_text },

            input_config: { input_type: "textarea", id: "header_config", rows: 8, value:default_header_config_value, placeholder: headers_placeholder_text, input_class_style: "border border-[#232759] rounded-lg bg-gray-50"  }
        }
    }

    // Method to return util methods in object
    getUtilMethods = () => {
        return {}
    }

}

export default EndpointDetailUIUtil