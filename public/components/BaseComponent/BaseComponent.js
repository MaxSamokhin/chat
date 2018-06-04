export default class BaseComponent {
    constructor(tagName = 'div', attrs = {}, data = {}) {
        this._component = document.createElement(tagName);
        (Object.keys(attrs) || []).forEach(name => this._component.setAttribute(name, attrs[name]));
        this.setData(data);
    }

    setData(data) {
        this._data = data;
    }

    getData() {
        return this._data;
    }

    setText(text) {
        this._component.textContent = text;
    }

    render() {
        return this.getElement();
    }

    getElement() {
        return this._component;
    }

    renderTo(className) {
        document.getElementsByClassName(className)[0].appendChild(this.render());
    }

    append(element) {
        this.getElement().appendChild(element);
    }

    clear() {
        while (this._component.firstChild) {
            this._component.removeChild(this._component.firstChild);
        }
    }

    hide() {
        this._component.style.display = 'none';
    }

    show() {
        this._component.style.display = 'block';
    }

    remove() {
        this._component.parentElement.removeChild(this._component);
    }

    _innerHTML(template) {
        this._component.innerHTML = template;
    }
}

export function appendChilds(parentName, childComponents) {
    childComponents.forEach(child => child.renderTo(parentName));
}

