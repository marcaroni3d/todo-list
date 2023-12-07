import Storage from "./Storage"
import List from "./List"

const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-btn]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input')

let lists = Storage.getLists()
let selectedListId = Storage.getSelectedId()
const selectedList = lists.find(list => list.id === selectedListId)


export default class UI {
    static init() {
        UI.buttonListeners()
        UI.render()
    }
    
    static buttonListeners() {
        listsContainer.addEventListener('click', e => {
            if (e.target.tagName.toLowerCase() === 'li') {
                selectedListId = e.target.dataset.listId
                Storage.saveSelectedId(selectedListId)
                UI.render()
            }
        })

        deleteListButton.addEventListener('click', e => {
            Storage.deleteList(selectedListId)
            UI.render()
        })

        newListForm.addEventListener('submit', e => {
            e.preventDefault()
            const listName = newListInput.value
            if (listName === null || listName === '') return
            const list = new List(listName)
            newListInput.value = null
            Storage.addList(list)
            UI.render()
        })

        newTaskForm.addEventListener('submit', e => {
            e.preventDefault()
            const taskName = newTaskInput.value
            if (taskName === null || taskName === '') return
            console.log(selectedList)
            const task = selectedList.createTask(taskName)
            List.addTask(task)
            newTaskInput.value = null
        })
    }

    static render() {
        lists = Storage.getLists()
        clearElement(listsContainer)
        renderLists()

        const selectedList = lists.find(list => list.id === selectedListId)
        if (selectedListId == null) {
            listDisplayContainer.style.display = 'none'
        } else {
            listDisplayContainer.style.display = ''
            listTitleElement.innerText = selectedList.name
            renderTaskCount(selectedList)
            clearElement(tasksContainer)
            renderTasks(selectedList)
        }

        function clearElement(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild)
            }
        }

        function renderTaskCount(list) {
            const incompleteTaskCount = list.tasks.filter(task => !task.complete).length
            const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
            listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
        }

        function renderTasks(list) {

            list.tasks.forEach(task => {
                const taskElement = document.importNode(taskTemplate.content, true)
                const checkbox = taskElement.querySelector('input')
                checkbox.id = task.id
                checkbox.checked = task.complete
                const label = taskElement.querySelector('label')
                label.htmlFor = task.id
                label.append(task.name)
                tasksContainer.appendChild(taskElement)
            })
        }

        function renderLists() {
            lists.forEach(list => {
                const listElement = document.createElement('li')
                listElement.dataset.listId = list.id
                listElement.classList.add('list-name')
                listElement.innerText = list.name
                if (list.id === selectedListId) {
                    listElement.classList.add('active-list')
                }
                listsContainer.appendChild(listElement)
            })
        }
    }
}