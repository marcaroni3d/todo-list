export default class Task {
    constructor(name) {
        this.id = Date.now().toString(),
        this.name = name,
        this.complete = false
    }
}