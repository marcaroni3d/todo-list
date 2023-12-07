const localStorageKey = "all.lists"
const localStorageIdKey = "selected.id"

export default class Storage {
    static saveSelectedId(id) {
        localStorage.setItem(localStorageIdKey, id)
    }

    static getSelectedId() {
        let id = JSON.parse(localStorage.getItem(localStorageIdKey))
        return id
    }

    static saveLists(lists) {
        localStorage.setItem(localStorageKey, JSON.stringify(lists))
    }

    static getLists() {
        let lists = JSON.parse(localStorage.getItem(localStorageKey)) || []
        return lists
    }

    static getList(id) {
        let lists = Storage.getLists()
        const selectedList = lists.find(list => list.id === id)
        return selectedList
    }

    static addList(list) {
        let lists = Storage.getLists()
        lists.push(list)
        Storage.saveLists(lists)
    }

    static addTask(newTask, id) {
        let lists = Storage.getLists()
        lists.map(list => list.id === id ? list.tasks.push(newTask) : list)
        Storage.saveLists(lists)
    }
}