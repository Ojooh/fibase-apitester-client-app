<template>
    <template v-if="true">
        <!-- Loader -->
        

        <!-- Header -->
        <AppHeaderUI>
            <TopBarUI v-bind="top_bar_props" />
        </AppHeaderUI>
       

        <!-- sidebar -->
        

        <!-- Main -->
        <AppMainUI>
            <RouterView />
        </AppMainUI>

        <!-- footer -->
        <AppFooterUI>
            <FooterCopyRight v-bind="footer_copyright_props" />
        </AppFooterUI>
    </template>

</template>

<script>
import BaseAppController from "@/modules/base_app/controllers/base_app_controller";

export default BaseAppController
</script>
