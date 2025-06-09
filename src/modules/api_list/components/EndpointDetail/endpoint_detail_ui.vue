<template>
    <section :id="`api_request_${index}`" class="w-full flex flex-col items-center">
        <div class="w-full flex flex-col items-center">
            <FieldsetUI class="p-4">
                <InputGroupUI v-bind="header_input_group_prop" />

                <InputGroupUI v-bind="query_params_prop" />

                <InputGroupUI v-bind="body_prop" />

                <div class="w-full px-[20%] flex items-center justify-center">
                    <ActionButtonUI v-bind="submit_btn_prop" />
                </div>

            </FieldsetUI>

            <EndpointResponseUI :endpoint="endpoint" />
        </div>
    </section>
</template>

<script>
import EndpointDetailUIController from "./endpoint_detail_ui_controller";

export default EndpointDetailUIController
</script>