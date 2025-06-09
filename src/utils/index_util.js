
import ContentManagerUtil       from "./content_manager_util.js";
import DeviceFingerprintUtil    from "./device_fingerprint_util.js";
import EncryptorDecryptorUtil   from "./encryptor_decryptor_util";
import EventSystemUtil          from "./event_system_util";
import GlobalVariableManager    from "./global_variable_manager_util.js";
import InputTransformerUtil     from "./input_transformer_util.js";
import InputValidatorUtil       from "./input_validation_util.js";
import MetaDataUtil             from "./meta_data_util.js"
import SockectManagerUtil       from "./socket_manager_util.js"


class HelperUtil {
    constructor(env_variables = {}) {
        // Initialize all utils
        this.global_vars                    = GlobalVariableManager.getInstance();
        this.ENV                            = env_variables;

        this.content_manager_util           = new ContentManagerUtil(this.global_vars);
        this.device_fingerprint_util        = new DeviceFingerprintUtil();
        this.encryptor_decryptor_util       = new EncryptorDecryptorUtil(this?.ENV);
        this.event_system_util              = new EventSystemUtil();
        this.input_transformer_util         = new InputTransformerUtil(this?.ENV);
        this.input_validation_util          = new InputValidatorUtil(this?.ENV);
        this.meta_data_util                 = new MetaDataUtil();
        this.socket_manager_util            = new SockectManagerUtil(this?.ENV);
    }

    // Delayed execution for a specified number of seconds
    sleep = (secs) => new Promise(resolve => setTimeout(resolve, secs * 1000));


}

export default HelperUtil;
