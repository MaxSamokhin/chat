import BaseComponent from '../BaseComponent/BaseComponent';
import './FormComponent.scss';
import form from './FormComponent.pug';
import Validation from '../../modules/Validator';
import Http from '../../service/Http';
import router from '../../modules/Router';
import UserService from '../../service/UserService';


export default class FormComponent extends BaseComponent {
    constructor(data) {
        super('div', {class: 'form'}, data);

        this.errors = {};
    }

    render() {
        this._innerHTML(form(this.getData()));
        this.validation();

        return this.getElement();
    }

    validation() {
        const main = this.getElement();
        const errors = main.getElementsByClassName('error')[0];
        const formElements = [...main.getElementsByClassName(this.getData().fields[0].class)];
        const submitData = main.getElementsByClassName('form__button')[0];
        const form = main.getElementsByClassName('form')[0];

        const submit = (e) => {
            e.preventDefault();

            const values = {};

            formElements.forEach(element => {
                values[element.name] = element;
            });

            this.errors = Validation(values, this.errors);
            this.errorOutput(formElements, errors);

            if (this.isValid()) {
                this._submit();
            }

        };

        form.addEventListener('submit', e => e.preventDefault());
        submitData.addEventListener('click', submit);
    }

    isValid() {
        let valid = true;
        Object.values(this.errors).forEach(error => {
            if (error) {
                valid = false;
            }
        });
        return valid;
    }

    errorOutput(formElements, errorsElements) {
        formElements.forEach(element => {
            if (this.errors[element.name]) {
                errorsElements.innerHTML = this.errors[element.name];
                element.classList.add('form__info__input_error');
            } else {
                element.classList.remove('form__info__input_error');
                errorsElements.innerHTML = '';
            }
        });
    }

    _submit() {
        const form = document.forms[this.getData().name];
        const url = `${this.getData().fields[0].name}`;
        const fields = form.elements;
        const data = Object.assign(...Object.values(fields)
            .map(field => {
                return field.name === 'login' ? {
                    [field.name]: field.value
                } : {};
            }));

        if(this.getData().method === 'post') {
            Http.post(url, data).then(resp => {

                const {user} = resp;
                UserService.user = user;

                const route = router.getRoute('/chat');
                if (!route.getView()) {
                    route.createView();
                }

                route.getView().rerender();
                router.go('/chat');

            }).catch(err => console.log(err));
        }

    }
}
