

class InputTransformerUtil {
    constructor(env_variables) {
        this.ENV                    = env_variables

        // Lookup for number formatting suffixes
        this.count_lookup = [
            { value: 1, symbol: "" },
            { value: 1000, symbol: "K" },
            { value: 1000000, symbol: "M" },
            { value: 1000000000, symbol: "B" },
            { value: 1000000000000, symbol: "T" }
        ];
    }

    // Method to capitalize the first letter of a string
    capitalize = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : string;
    }

    // Method to capitalize the first letter of each word in a string
    capitalizeEachWord = (string) => {
        const words = string.split(' ');
        return words.map(word => this.capitalize(word)).join(' ');
    }

    // Method to format a number with commas
    formatAmount = (amount) => {
        if (!amount) return "0";
        return amount > 0 ? Intl.NumberFormat('en-US').format(amount) : amount.toString();
    }

    // Method to format a large number with suffixes like K, M, B, T
    nFormatter = (num, digits = 1) => {
        const item = this.count_lookup.slice().reverse().find(item => num >= item.value);
        if (item) {
            const formatted = (num / item.value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
            return `${formatted}${item.symbol}`;
        }
        return "0";
    }

    // Method to round a number to two decimal places
    roundToTwoDecimalPlaces = (value) => {
        if (typeof value !== 'number') { throw new Error('Input must be a number'); }
        return Math.round(value * 100) / 100;
    }

    // Method to remove leading zeros from a number or string
    removeLeadingZeros = (num) => { return num.toString().replace(/^0+/, '') || "0"; }


    // Method to convert dob to age
    dobToAge = (dob_string) => {
        const dob               = new Date(dob_string);
        let age                 = new Date().getFullYear() - dob.getFullYear();
        const month_difference  = new Date().getMonth() - dob.getMonth();

        if (month_difference < 0 || (month_difference === 0 && new Date().getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    // 🔠 Convert snake_case to "Title Case"
    toTitleCase = (str) => { return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); }

    // 🐫 Convert snake_case to PascalCase
    toPascalCase = (str) => { return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(''); }

    // 🔠 Convert string to snake_case
    toSnakeCase = (name) => { return name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/([A-Z])([A-Z][a-z])/g, '$1_$2').toLowerCase(); }

    // Convert snale_case to plural snake_case
    pluralizeSnakeCase = (snake_str) => {
        const parts         = snake_str.split('_');
        const last_word     = parts.pop();
    
        let plural = '';
    
        if (last_word.endsWith('y') && !/[aeiou]y$/.test(last_word)) {
            // consonant + y => replace y with ies
            plural = last_word.slice(0, -1) + 'ies';
        } 
        else if (last_word.endsWith('s') || last_word.endsWith('x') || last_word.endsWith('z') || last_word.endsWith('ch') || last_word.endsWith('sh')) {
            // s, x, z, ch, sh => add es
            plural = last_word + 'es';
        } 
        else { plural = last_word + 's'; }
    
        return [...parts, plural].join('_');
    };

    // method to filter out empty values in an object
    filterOutEmptyFields = (obj) => {
        const result = {};

        for (const [key, value] of Object.entries(obj)) {
            if (
                value !== null &&
                value !== undefined &&
                !(typeof value === 'string' && value.trim() === '') &&
                !(Array.isArray(value) && value.length === 0)
            ) {
                result[key] = value;
            }
        }

        return result;
    }
}

export default InputTransformerUtil;
