class MetaDataUtil {
    // Method to set app metadata (title, meta tags, and favicon)
    setAppMetaData = (meta_object) => {
        if (!meta_object) { return; }

        const meta_fields = Object.keys(meta_object);

        // Loop through each metadata field
        for (const meta_field of meta_fields) {
            const value         = meta_object[meta_field];
            let meta_tag, link_tag;

            // Set the document title
            if (meta_field === "title_text") { document.title = value; }

            // set document icon logo
            else if (meta_field === "icon_logo_link") {
                link_tag    = document.querySelector("link[rel='icon']");

                // If favicon link tag does not exist, create and append it
                if (!link_tag) {
                    link_tag            = document.createElement("link");
                    link_tag.rel        = "icon";
                    link_tag.type       = "image/x-icon";
                    document.head.appendChild(link_tag);
                }

                // Set the href of the favicon
                link_tag.href = value;
            }

            // Handle text-type meta tags
            else {
                const formatted_field   = meta_field.replace("_text", "");
                meta_tag                = document.querySelector(`meta[name="${formatted_field}"]`);

                // If meta tag does not exist, create and append it
                if (!meta_tag) {
                    meta_tag        = document.createElement("meta");
                    meta_tag.name   = formatted_field;
                    document.head.appendChild(meta_tag);
                }

                // Set the content of the meta tag
                meta_tag.content = value;
            }
            
        }
    }

    setRouteMetaData = (route_obj, admin=true) => {
        const sub_menus                     = document.querySelectorAll('.sub-menu');
        const route_title                   = route_obj?.title || route_obj?.name || "";
        const title_prefix                  = "FIBASE-APITESTER";
        const description_default           = "fibase-apitester is a lightweight Vue 3 + Vite-based frontend interface for interactively testing API endpoints within a Node.js application. It functions similarly to Swagger UI but is designed to be fully customizable, developer-friendly, and embeddable. The app allows viewing, editing, and testing HTTP methods, query parameters, headers, and JSON payloads, with real-time display of response data.";
        document.title                      = `${title_prefix} - ${route_title.toUpperCase()}` || `${title_prefix} - ${description_default}`;
        
        sub_menus.forEach((element) => { element.classList.add('hidden'); });
    }
}

export default MetaDataUtil;
