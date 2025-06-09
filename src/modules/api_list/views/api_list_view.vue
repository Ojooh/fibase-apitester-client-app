<template>
    <div id="APIListView" class="w-full h-auto lg:px-[10%] md:px-[8%] px-[5%] ">
        <XBarLoaderUI v-if="loading" />

        <div v-else-if="!loading" class="w-full py-4 block">
            <AccordionUI v-bind="accordion_prop({}, 1)">
                <EndpointDetailUI :endpoint="{}" :index="1" />
            </AccordionUI>
        </div>

    </div>
    
</template>

<script>
import APIListViewController from "./api_list_view_controller";

export default APIListViewController
</script>