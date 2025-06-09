

class APIListViewUtil {
    constructor (name, vue_isnatnce) {
        this.name   = name
        this.vm     = vue_isnatnce
    }

    // Method to retrun accordion prop
    getAccordionUIProp = (item, index) => {
        const _indx = index + 1;
        return {
            id: `accordion_${_indx}`,

            accordion_class_style: "border border-[#232759] p-0 gap-2 rounded-lg bg-white text-[#232759]",

            accordion_head_id: `accordion_head_${_indx}`,

            accordion_head_class_style: "border-b p-4 rounded-lg bg-white text-fiyalo",

            accordion_head_show_class_style: "border-b p-4 rounded-l bg-[#232759] text-white",

            accordion_head_title_content: `[GET] /api/users `,

            accordion_head_title_class_style: "",

            accordion_head_btn_class_style: "bg-[#232759] text-white font-black",

            accordion_body_id: `accordion_body_${_indx}`,

            accordion_body_class_style: "border-[#232759] p-0 rounded-xl",
        }
    }


    // Method to return util methods in object
    getUtilMethods = () => {
        return {}
    }

}

export default APIListViewUtil