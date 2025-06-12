<template>
    <section class="w-full my-2 block">
        <AccordionUI v-bind="accordion_prop('response_header')">
            <div class="w-full flex item-center justify-start">
                {{  JSON.stringify(response_obj?.headers, null, 4 ) }}
            </div>
        </AccordionUI>

        <AccordionUI v-bind="accordion_prop('response_body')">
            <div class="w-full flex item-center justify-start">
                {{  JSON.stringify(response_obj?.data, null, 4 ) }}
            </div>
        </AccordionUI>
    </section>
</template>

<script>
import EndpointResponseUIController from "./endpoint_response_ui_controller";

export default EndpointResponseUIController
</script>