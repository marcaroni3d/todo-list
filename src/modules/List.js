export default class List {
    constructor(name) {
        this.id = Date.now().toString()
        this.name = name
        this.tasks = [{
            id: 'asdf',
            name: 'Test',
            complete: false
        }]
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setTasks(tasks) {
        this.tasks = tasks
    }

    getTasks() {
        return this.tasks
    }

    getTask(name) {
        return this.tasks.find(task => task.getName() === name)
    }

    createTask(name) {
        return {
            id: Date.now().toString(), 
            name: name, 
            complete: false
        }
    }

    addTask(newTask) {
        console.log(this.tasks)
        if (this.tasks.find(task => task.getName() === newTask.name)) return
        this.tasks.push(newTask)
    }

    deleteTask(name) {
        this.tasks = this.tasks.filter(task => task.name !== name)
    }
}