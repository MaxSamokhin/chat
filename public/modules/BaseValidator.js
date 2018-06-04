/**
 * @return {boolean}
 */
export default function BaseValidator(element, errors) {

    const valid = !(element.value === '');
    if (!valid) {
        errors[element.name] = 'Input data';
    }  else {
        switch (element.name) {
            case 'login':
                loginValidation(element.value, errors);
                break;
        }
    }

    return valid;
}

let loginValidation = (input, errors) => {
    let valid = false;
    if (input.length > 15) {
        errors.login = 'Must be less than 15 characters';
    } else if (input.length < 4) {
        errors.login = 'Must be more than 4 characters';
    } else {
        valid = true;
        errors.login = '';
    }

    return valid;
};

