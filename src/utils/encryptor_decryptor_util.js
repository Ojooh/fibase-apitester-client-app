



class EncryptorDecryptorUtil {
	constructor(env_variables) {
		this.ENV               	= env_variables;
        this.mode               = this.ENV?.VITE_MODE;
		this.is_live_mode       = this.mode === 'production' || this.mode  === 'staging';
		this.data_shift_key     = this.is_live_mode ? parseInt(this.ENV?.VITE_DATA_SHIFT_LIVE) : parseInt(this.ENV?.VITE_DATA_SHIFT_TEST) || 4;
		this.corpus             = this.is_live_mode ? this.#generateRandomCorpus() : this.#getFixedCorpus();
	}

    // Method to get fixed corpus
    #getFixedCorpus = () => {
		const corpus = [
			'6', ';', 's', '[', 'w', '*', 'n', 'K', 'h', 'U', '#', 'P', 'T', '&',
			'M', '2', '}', 'x', ')', '{', '|', 'i', '%', 'm', ':', 'E', 'q', '?', '0',
			'@', '1', 'v', 'A', 'W', '<', 'y', 'Y', '4', '5', '.', 'e', 'G', ',',
			'D', '7', 'I', 'j', '>', 'g', 't', 'k', 'c', 'V', '9', 'J', 'L', 'u',
			'H', 'b', 'Z', '+', '"', "'", 'a', 'f'
		];

		return [...new Set(corpus)];
	}

    // Method to get random corpus
    #generateRandomCorpus = (size = 60) => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}:;<>,.?/|\\";
		const corpusSet = new Set();

		while (corpusSet.size < size) {
			const random_char = characters[Math.floor(Math.random() * characters.length)];
			corpusSet.add(random_char);
		}

		return Array.from(corpusSet).sort(() => Math.random() - 0.5);
	}

    // Method to encrypt data v2
	encrypt = (data) => {
		if (!this.corpus || !this.data_shift_key) {
			throw new Error('Environment not initialized. Call initEnv() first.');
		}

		const input_data        = typeof data === 'string' ? data : JSON.stringify(data);
		const encrypted_data    = input_data.split('').map(char => {
		    const index             = this.corpus.indexOf(char);

			if (index !== -1) {
				const new_index = (index + this.data_shift_key) % this.corpus.length;
				return this.corpus[new_index];
			}

			return char;
		}).join('');

		return { encrypted_data };
	}

    // Method to decrypt data encrypted on v2
	decrypt = (encrypted_data) => {
		if (!this.corpus || !this.data_shift_key) {
			throw new Error('Environment not initialized. Call initEnv() first.');
		}

		const decrypted_data = encrypted_data.split('').map(char => {
			const index = this.corpus.indexOf(char);

			if (index !== -1) {
				let new_index = index - this.data_shift_key;
				if (new_index < 0) {
					new_index = this.corpus.length + new_index;
				}
				return this.corpus[new_index];
			}
			return char;
		}).join('');

		try  { return JSON.parse(decrypted_data);  }
        
        catch(error) { return decrypted_data; }
	}	
}

export default EncryptorDecryptorUtil;
