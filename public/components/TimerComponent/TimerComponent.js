import './TimerComponent.scss';
import timer from './TimerComponent.pug';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class TimerComponent extends BaseComponent {

    constructor() {
        super();
        this.build();
    }

    updateTime() {
        let now = new Date();

        let hours = now.getHours() === 0 ? '12' : now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
        let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        let ampm = now.getHours() < 12 ? 'AM' : 'PM';

        return hours + ':' + minutes + ' ' + ampm;
    }

    build() {
        this._innerHTML(timer({data: this.updateTime()}));
    }

}

