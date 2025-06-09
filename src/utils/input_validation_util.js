import moment from "moment";

class InputValidationUtil {
	constructor(env_varaibles) {
		this.ENV                        = env_varaibles;
		this.name_regex_reg_exp         = /^[A-Za-z.'\s/_-]*$/;
		this.namey_regex_reg_exp        = /^[A-Za-z0-9.'\s,/_\-()&]*$/;
		this.email_regex_reg_exp        = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		this.tel_regex_reg_exp          = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		this.pass_regex_reg_exp         = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}.+$/;
		this.url_regex_reg_exp          = /^(https?:\/\/)?((localhost|[a-zA-Z0-9-_.]+)(:[0-9]{1,5})?)(\/[a-zA-Z0-9-._~:/?#@!$&'()*+,;=%]*)?$/;
		this.text_arear_regex_reg_exp   = /^(?=.*[a-zA-Z])[\w\s.,!?'\-()&@$#%*+=:;"<>]*$/;
		this.uuid_regex_reg_exp         = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		this.custom_uuid_regex_reg_exp  = /^[A-Z0-9]{12}-[A-Z0-9]{12}-[A-Z0-9]{12}-[A-Z0-9]{12}$/;
	}

    // Method to check currency type
    isFiat = (currency_obj) => { return  currency_obj?.type === "FIAT"; }

    isCrypto = (currency_obj) => { return  currency_obj?.type === "CRYPTO"; }

    // Methods to check Environment
    isProduction = () => { return  this.ENV?.VITE_MODE === 'production'; }

    isStaging = () => { return  this.ENV?.VITE_MODE === 'staging'; }

    // ✅ Check if a string is in lowercase snake_case format
    isLowerSnakeCase = (str) => { return /^[a-z]+(_[a-z]+)*$/.test(str); }

    // Method to check if an input is empty
	isEmpty = (input) => { return !input || input.toString().trim() === ''; }

    // Method to check if a text is valid name
	isValidName = (name) => { return this.name_regex_reg_exp.test(name); }

    // Method to check if a text passes the names regex
	isValidNamey = (name) => {return this.namey_regex_reg_exp.test(name); }

    // Method to check if an inpt is valid email address
	isValidEmail = (email) => { return this.email_regex_reg_exp.test(email); }

    // Method to check if  input is a valid phone number
	isValidPhoneNumber = (tel) => { return this.tel_regex_reg_exp.test(tel); }

    // Method to check if an input is a valid password
	isValidPassword = (password) => { return this.pass_regex_reg_exp.test(password); }

    // Method to check if an input is valid number
	isDigit = (number) => { return !isNaN(number); }

    // Method to check if an input is valid integer
	isValidInteger = (integer) => { return Number.isInteger(integer) && integer > 0; }

    // Method to check if an input is valid floating point number
	isValidFloat = (float) => { return !isNaN(float) && parseFloat(float) > 0; }

    // Metod to check if input is passes url regex
	isValidURL = (url) => { return this.url_regex_reg_exp.test(url); }

    // Method to check if input is a valid boolean value
	isBoolean = (value) => { return typeof value === 'boolean' || ['1', '0'].includes(String(value)); }

    // Method to check if input passes long text regex
	isValidLongText = (text) => { return this.text_arear_regex_reg_exp.test(text); }

    // Method to check if input is a valid image 
	isValidImage = (file) => { return file && file.mimetype && file.mimetype.startsWith("image/"); }

    // Method to check if a file input is a a valid document type
	isValidDocument = (file) => { return file && file.mimetype === "application/pdf"; }

    // Method to check if a file input is a valid video
	isValidVideo = (file) => { return file && (['image/gif'].includes(file.mimetype) || file.mimetype.startsWith("video/")); }

    // Method to check if image file input is withing max file size range
	isValidImageSize = (file) => { return file?.size <= parseInt(this.ENV?.VITE_IMG_MAX_SIZE || 1500000); }

    // Method to check if video file input is withing max file size range
	isValidVideoSize = (file) => { return file?.size <= parseInt(this.ENV?.VITE_VIDEO_MAX_SIZE || 1500000); }

    // Method to check if document file input is withing max file size range
	isValidDocumentSize = (file) => { return file?.size <= parseInt(this.ENV?.VITE_FILE_MAX_SIZE || 1500000); }

    // Method to check if  uuid  passes uuid regex
	isValidUUID = (uuid) => { return this.uuid_regex_reg_exp.test(uuid); }

    // Method to check if custom uuid passes custom regex
	isValidCustomUUID = (uuid) => { return this.custom_uuid_regex_reg_exp.test(uuid); }

    // Method to check if an array input is unique
	isArrayUnique = (arr) => { return new Set(arr).size === arr.length; }

    // Method to check if date input i a valid future date
	isValidFutureDate = (date_string) => {
		const date = moment(date_string.toString(), moment.ISO_8601, true);
		return date.isValid() && date.isAfter(moment());
	}

    // Method to check if boolean string is boolean value
	isTruthyString = (value) => { return String(value).toLowerCase() === 'true' || String(value) === '1'; }

    // Method to check if an input has changed
    hasInputChanged = (new_input, existing_data, keys_to_check) => {
        for (const key of keys_to_check) {
            if (JSON.stringify(new_input[key]) !== JSON.stringify(existing_data[key])) {
                return true;
            }
        }
    
        return false;
    };

}

export default InputValidationUtil;
