import BaseValidator from './BaseValidator';

const Validation = (values, errors) => {
    (Object.keys(values) || []).forEach(value => BaseValidator(values[value], errors));

    return errors;
};

export default Validation;
