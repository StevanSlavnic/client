// wrapper function accepting input to make validation more lean in the place of calling
export const validateInput = (inputConf) =>
	validateValue(inputConf.value ? inputConf.value : '', inputConf.validation);

// check if value has an error based on the provided rules set, returns the appropriate message
const validateValue = (value, rules) => {
	if (rules) {
		let errorMessage = '';

		if (rules.required && !errorMessage) {
			errorMessage = value !== '' ? '' : 'This field is required';
		}

		if (rules.minLength && !errorMessage) {
			errorMessage =
				value.length >= rules.minLength
					? ''
					: 'Enter at least ' + rules.minLength + ' characters';
		}

		if (rules.maxLength && !errorMessage) {
			errorMessage =
				value.length <= rules.maxLength
					? ''
					: rules.maxLength + ' characters is the maximum';
		}

		if (rules.isEmail && !errorMessage) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

			errorMessage = pattern.test(value) ? '' : 'Please enter a valid email';
		}

		if (value && rules.isNumeric && !errorMessage) {
			const pattern = /^\d+$/g;
			errorMessage =
				pattern.test(value) || String(value).trim() === '' ? '' : 'Please use only numbers';
		}

		if (value && rules.isNumericDecimal && !errorMessage) {
			const pattern = /^\d+(\.)?(\d{0,2})?$/g;
			errorMessage = pattern.test(value)
				? ''
				: 'Please enter a number: e.g. 12; 13.5; 14.99';
		}

		//if (value && rules.isAmountValid && !errorMessage 25) {
		if (value && rules.isLargerThen && !errorMessage) {
			errorMessage =
				value >= Number(rules.isLargerThen)
					? ''
					: `Minimum amount is $${rules.isLargerThen}.`;
		}

		// must be a number, and specific number of chars
		if (value && rules.isSocialNumber && !errorMessage) {
			errorMessage = value.length === rules.socialNumLength ? '' : 'The format should be: [xxx][xx][xxxx]';
		}

		return errorMessage;
	} else {
		return '';
	}
};

// check if all inputs in the form are valid and return the result
export const formIsValid = (form) => {
	let formIsValid = true;
	for (let formInput in form) {
		//console.log(`${formInput} is |${Boolean(!form[formInput].error && form[formInput].touched)}| with value of ${form[formInput].value}`)
		formIsValid = formIsValid && form[formInput].touched && !form[formInput].error;
	}

	return formIsValid;
};

// sets errors on the given form in regard to formated apiErrors by errorParser utility
// it uses config object key/value pairs to find name of the input (value) if there is apiError (key)
export const checkFormApiErrors = (form, config, apiErrors) => {
	Object.keys(config).forEach((errName) => {
		form[config[errName]].error = apiErrors[errName]
			? apiErrors[errName].join(' .')
			: '';
	});
};
