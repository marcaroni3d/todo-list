const localStorageKey = 'todo.lists'
const localStorageIdKey = 'selected.listId'

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

    static addList(list) {
        let lists = Storage.getLists()
        lists.push(list)
        Storage.saveLists(lists)
    }

    static deleteList(selectedListId) {
        let lists = Storage.getLists()
        lists = lists.filter(list => list.id !== selectedListId)
        Storage.saveLists(lists)
    }
}