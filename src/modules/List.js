export default class List {
    constructor(name) {
        this.id = Date.now().toString()
        this.name = name
        this.tasks = []
    }
}