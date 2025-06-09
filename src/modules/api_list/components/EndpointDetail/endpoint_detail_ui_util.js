import SVGIcons from "@ui/Resources/svg_icon_resource";

class EndpointDetailUIUtil {
    constructor (name, vue_isnatnce) {
        this.name               = name
        this.vm                 = vue_isnatnce
        this.content_manager    = this.vm?.proxy?.$content_manager;
    }

    // Method to get submit button prop
    getSubmitBtnProp = () => {
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");
        const { submit_btn_text }           = header_content_data;

        return {
            config: {
                btn_type: "button", class_style: "py-2 px-4 shadow text-white font-bold flex justify-center items-center bg-[#33b27b] hover:scale-105 rounded-lg", 
                btn_text: `<span class="w-6 h-6 mr-2 flex items-center">${SVGIcons?.paper_airplane_send_svg_icon}</span> <strong>${submit_btn_text}</strong>`, 
                handleInputClickEvent: null
            }
        }
    }

    // Method to get body input group
    getBodyInputGroupProp = () => {
        const default_body_value            = JSON.stringify({});
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");

        const { body_label_text, body_placeholder_text } = header_content_data;
        
        return {
            input_group_class_style: "flex flex-col items-center justify-start",

            label_config: { for: "body", class_style: "font-bold text-lg w-full truncate", label_text: body_label_text },

            input_config: { input_type: "textarea", id: "body", rows: 8, value: default_body_value, placeholder: body_placeholder_text, input_class_style: "border border-[#232759] rounded-lg bg-gray-50"  }
        }
    }

    // Method to get query parameters input group
    getQueryParametersInputGroupProp = () => {
        const default_query_params_value    = JSON.stringify({});
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail.fieldset");

        const { query_params_label_text, query_params_placeholder_text } = header_content_data;
        
        return {
            input_group_class_style: "flex flex-col items-center justify-start",

            label_config: { for: "query_params", class_style: "font-bold text-lg w-full truncate", label_text: query_params_label_text },

            input_config: { input_type: "textarea", id: "query_params", rows: 8, value: default_query_params_value, placeholder: query_params_placeholder_text, input_class_style: "border border-[#232759] rounded-lg bg-gray-50"  }
        }
    }

    // Method to get headers input group
    getHeaderInputGroupProp = () => {
        const default_header_config_value   = JSON.stringify({});
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