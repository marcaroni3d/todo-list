export default function createTask(name, dueDate = 'No date') {
    return {
        name,
        dueDate,
        setName(newName) {
            this.name = newName
        },
        getName() {
            return this.name
        },
        setDate(newDate) {
            this.dueDate = newDate
        },
        getDate() {
            return this.dueDate
        }
    }
}