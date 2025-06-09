import { markRaw, getCurrentInstance } from "vue";

import AppHeaderUI from "@ui/DocumentBase/Header/app_header_ui.vue";
import AppMainUI from "@ui/DocumentBase/Main/app_main_ui.vue";
import AppFooterUI from "@ui/DocumentBase/Footer/app_footer_ui.vue";

import TopBarUI from "@ui/Navigation/TopBar/top_bar_ui.vue";
import ImageTextUI from "@ui/Display/ImageText/image_text_ui.vue";
import FooterCopyRight from "@ui/Display/FooterCopyRight/footer_copy_right_ui.vue";

class BaseAppController {
    constructor() {
        this.name                   = "base_app_controller";
        this.vm                     = null; 
        this.content_manager        = null
    }

    // Method to get footer copy right props
    #getFooterCopyRightPorps = () => {
        const content_data = this?.content_manager?.get("content_resource.footer_ui");

        const { powered_by_text, author_text } = content_data
        
        return { powered_by_text, author_text, class_style_text: "font-bold text-gray-700 border-t" }
    }

    // Method to get top bar image text props
    #getTopBarImageTextPorps = () => {
        const top_bar_ui_content_data = this?.content_manager?.get("content_resource.top_bar_ui");

        const { title_text, image_src_link, image_alt_text } = top_bar_ui_content_data
        
        return { 
            text: title_text, text_class: "text-white font-black",
            image_src: image_src_link, img_alt: image_alt_text, image_class: "w-8 h-8"
        }
    }

    // Method to set top bar props
    #getTopBarProps = () => {
        return {
            section_1_component: markRaw(ImageTextUI),

            section_1_props: this.#getTopBarImageTextPorps()
        }
    }

    // Public method to expose components
    getUIComponents = () => {
        return { AppHeaderUI, AppMainUI, AppFooterUI, TopBarUI, FooterCopyRight, };
    };

    // State data
    getAppStateData = () => {
        this.vm                 = getCurrentInstance();
        this.content_manager    = this.vm?.proxy?.$content_manager;

        return {
            top_bar_props: this.#getTopBarProps(),

            footer_copyright_props: this.#getFooterCopyRightPorps()
        }
    };

    // Computed variables
    getAppComputedVariables = () => {
        return {
            exampleComputed() {
                return this.example_state + ' - computed';
            },
        };
    };

    // Watchers
    getAppWatchers = () => {
        return {
            example_state(newVal, oldVal) {
                console.log('State changed:', oldVal, '->', newVal);
            },
        };
    };

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
            data: this.getAppStateData,
            computed: this.getAppComputedVariables(),
            watch: this.getAppWatchers(),
            created: this.handleOnCreatedLogic,
            mounted: this.handleOnMountedLogic,
            beforeUnmount: this.handleBeforeUnmountedLogic,
        };
    };
}

export default new BaseAppController().setVueJson();
