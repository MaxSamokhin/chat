export default class Route {
    constructor(path, view) {
        this._path = path;
        this._view = null;
        this._viewType = view;
    }

    createView() {
        if (!this._view) {
            this._view = new this._viewType();
            this._view.build();
        } else {
            this._view.show();
        }
    }

    getView() {
        return this._view;
    }

    isThisPath(path) {
        return this._path === path;
    }
}
