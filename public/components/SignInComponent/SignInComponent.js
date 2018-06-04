import login from './SignInComponent.pug';
import BaseComponent from '../BaseComponent/BaseComponent';
import FormComponent from '../FormComponent/FormComponent';
import './SignInComponent.scss';


export default class SignInComponent extends BaseComponent {

    constructor(data) {
        super('section', {class: 'login'}, data);
    }

    render() {

        this._innerHTML(login());
        const form = new FormComponent(this.getData());
        this.getElement().getElementsByClassName('login__form-container')[0].appendChild(form.render());
        return this.getElement();

    }
}
