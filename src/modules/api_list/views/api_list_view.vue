<template>
    <div id="APIListView" class="w-full h-auto lg:px-[10%] md:px-[8%] px-[5%] ">
        <XBarLoaderUI v-if="loading" />

        <div v-else-if="!loading" class="w-full py-4 block">

            <div v-for="(group, index) in Object.keys(route_groups)" :key="index" class="w-full block my-8">
                <h4 class="w-full truncate font-bold capitalize">
                    {{  group }}
                </h4>
                <AccordionUI 
                v-for="(endpoint, endpoint_index) in route_groups[group]" 
                :key="endpoint_index"
                v-bind="accordion_prop(group, endpoint, endpoint_index)">
                    <EndpointDetailUI :endpoint="endpoint" :index="endpoint_index" />
                </AccordionUI>
            </div>
            
        </div>

    </div>
    
</template>

<script>
import APIListViewController from "./api_list_view_controller";

export default APIListViewController
</script>