class Events {
    constructor() {
        this.map = {};
    }
    add(name, fn) {
        if (this.map[name]) return this.map[name].push(fn);
        return this.map[name] = [fn];
    }
    emit(name, ...args) {
        this.map[name].forEach(fn => {
            fn(...args)
        })
    }
}