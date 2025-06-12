<template>
    <section :id="`api_request_${index}`" class="w-full flex flex-col items-center">
        <div class="w-full flex flex-col items-center">
            <FieldsetUI class="p-4">
                <InputGroupUI v-if="endpoint?.headers && Object.keys(endpoint?.headers).length" v-bind="header_input_group_prop" />

                <InputGroupUI v-if="endpoint?.query && Object.keys(endpoint?.query).length" v-bind="query_prop" />

                <InputGroupUI v-if="endpoint?.params && Object.keys(endpoint?.params).length" v-bind="params_prop" />

                <InputGroupUI v-if="endpoint?.body && Object.keys(endpoint?.body).length" v-bind="body_prop" />

                <div class="w-full px-[20%] flex items-center justify-center">
                    <ActionButtonUI v-bind="submit_btn_prop" />
                </div>

            </FieldsetUI>

            <EndpointResponseUI :response_obj="response_obj" />
        </div>
    </section>
</template>

<script>
import EndpointDetailUIController from "./endpoint_detail_ui_controller";

export default EndpointDetailUIController
</script>