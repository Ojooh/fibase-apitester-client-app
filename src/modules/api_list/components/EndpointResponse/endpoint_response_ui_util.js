
import LoggerUtil from "@ui/Logger/logger_util.js";
import SVGIcons from "@ui/Resources/svg_icon_resource";

class EndpointResponseUIUtil {
    constructor (name, vue_isnatnce) {
        this.name               = name
        this.vm                 = vue_isnatnce
        this.content_manager    = this.vm?.proxy?.$content_manager;
        this.logger             = new LoggerUtil({ prefix: this.name?.toUpperCase() });
    }

    // Method to retrun accordion prop
    getAccordionUIProp = (response_type) => {
        const header_content_data           = this.content_manager?.get("content_resource.api_list_view.endpoint_detail");

        const { response_header_title_text, response_body_title_text } = header_content_data;

        const title_text = response_type.includes("response_header") ? response_header_title_text : response_body_title_text;

        return {
            id: `endpoint_response_accordion_${response_type}`,

            group_id: response_type,

            accordion_class_style: "p-0 gap-2 bg-white",

            accordion_head_id: `accordion_head_${response_type}`,

            accordion_head_class_style: "border border-[#232759] p-4 bg-gray-100 text-[#232759]",

            accordion_head_show_class_style: "border border-[#232759] p-4 bg-gray-100 text-[#232759]",

            accordion_head_title_content: `<span class="w-6 h-6 mr-2 flex items-center">${SVGIcons?.invox_arrow_down_svg_icon}</span> ${title_text}`,

            accordion_head_title_class_style: "",

            accordion_head_btn_class_style: "bg-[#232759] text-white font-black",

            accordion_body_id: `accordion_body_${response_type}`,

            accordion_body_class_style: "border-[#232759] p-0 hidden",

            accordion_body_show_class_style: "border-[#232759] p-0 block"
        }
    }

    // Method to return util methods in object
    getUtilMethods = () => {
        return {}
    }

}

export default EndpointResponseUIUtil