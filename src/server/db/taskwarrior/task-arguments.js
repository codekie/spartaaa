const PREFIX__TAG__ADD = '+',
    PREFIX__TAG__REMOVE = '-';

export default class TaskArguments {
// TODO implement remaining properties
    constructor() {
        this.tags = new Set();
    }
    addTag(tag) {
        this.tags.add(`${ PREFIX__TAG__ADD }${ tag }`);
        return this;
    }
    removeTag(tag) {
        this.tags.add(`${ PREFIX__TAG__REMOVE }${ tag }`);
        return this;
    }
    build() {
        const result = [];
        result.splice(result.length, 0, ...Array.from(this.tags));
        return result;
    }
}
