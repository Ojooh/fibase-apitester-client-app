
import APIListAPI from "@/api/api_list_api";

import LoggerUtil from "@ui/Logger/logger_util.js";

class APIListViewUtil {
    constructor (name, vue_isnatnce) {
        this.name       = "api_list_view_util";
        this.vm         = vue_isnatnce;
        this.ENV        = import.meta.env;
        this.api        = new APIListAPI(this.ENV);
        this.logger     = new LoggerUtil({ prefix: this.name?.toUpperCase() })
        
    }

    // Method to retrun accordion prop
    getAccordionUIProp = (group_id, item, index) => {
        const _indx = index + 1;
        return {
            id: `accordion_${item?.path}_${_indx}`,

            group_id,

            accordion_class_style: "border border-[#232759] p-0 gap-2 rounded-lg bg-white text-[#232759]",

            accordion_head_id: `accordion_head__${item?.path}_${_indx}`,

            accordion_head_class_style: "border-b p-4 rounded-lg bg-white text-fiyalo",

            accordion_head_show_class_style: "border-b p-4 rounded-l bg-[#232759] text-white",

            accordion_head_title_content: `[${item?.method.toUpperCase()}] ${item?.path} `,

            accordion_head_title_class_style: "",

            accordion_head_btn_class_style: "bg-[#232759] text-white font-black",

            accordion_body_id: `accordion_body__${item?.path}_${_indx}`,

            accordion_body_class_style: "border-[#232759] p-0 rounded-xl",
        }
    }

    // method to get all api routes from back end
    getAllAPIRoutes = async () => {
        try {
            this.vm.data.loading = true;

            const { status, msg, data } = await this.api.getAllAPIRoutes();

            this.vm.data.route_groups = data && Object.keys(data).length > 0 ? data : {};

            return data
        }
        catch(error) {
            this.logger.error(`[Util] Error Occurred in ${this.name}`, error)
            return null
        }
        finally { this.vm.data.loading = false }
    }


    // Method to return util methods in object
    getUtilMethods = () => {        
        return {
            getAllAPIRoutes: this.getAllAPIRoutes
        }
    }

}

export default APIListViewUtil