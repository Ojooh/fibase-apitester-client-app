<template>
    <section class="w-full my-2 block">
        
        <AccordionUI v-bind="accordion_prop(`${id}_response_header`)">
            <div class="w-full block bg-gray-300 p-4">
                <JSONViewerUI :json_data="response_obj?.headers || {}" />
                <!-- <pre>{{  JSON.stringify(response_obj?.headers, null, 4 ) }}</pre> -->
            </div>
        </AccordionUI>

        <AccordionUI v-bind="accordion_prop(`${id}_response_body`)">
            <div class="w-full  block bg-gray-300 p-4">
                <JSONViewerUI :json_data="response_obj?.data || {}" />
                <!-- <pre>{{  JSON.stringify(response_obj?.data, null, 4 ) }}</pre> -->
            </div>
        </AccordionUI>
    </section>
</template>

<script>
import EndpointResponseUIController from "./endpoint_response_ui_controller";

export default EndpointResponseUIController
</script>