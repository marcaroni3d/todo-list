import Storage from "./Storage"
import List from "./List"
import Task from "./Task"

const listsContainer = document.querySelector('[data-lists-container]')
const listsDisplay = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearTasksButton = document.querySelector('[data-clear-tasks-button]')
const deleteContainer = document.querySelector('[data-delete-container]')

let lists = Storage.getLists()
let selectedListId = Storage.getSelectedId()

export default class UI {
    static init() {
        UI.buttonListeners()
        UI.render()
    }
    
    static buttonListeners() {
        listsDisplay.addEventListener('click', e => {
            if (e.target.tagName.toLowerCase() === 'li') {
                selectedListId = e.target.dataset.listId
                Storage.saveSelectedId(selectedListId)
                UI.render()
            }
        })

        tasksContainer.addEventListener('click', e => {
            if (e.target.tagName.toLowerCase() === 'input') {
                const selectedList = lists.find(list => list.id === selectedListId)
                const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
                selectedTask.complete = e.target.checked
                Storage.saveLists(lists)
                UI.render()
            } 
        })

        clearTasksButton.addEventListener('click', e => {
            const selectedList = lists.find(list => list.id === selectedListId)
            selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
            Storage.saveLists(lists)
            UI.render()
        })

        deleteListButton.addEventListener('click', e => {
            lists = lists.filter(list => list.id !== selectedListId)
            Storage.saveLists(lists)
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
            const task = new Task(taskName)
            const selectedList = lists.find(list => list.id === selectedListId)
            newTaskInput.value = null
            Storage.addTask(task, selectedList.id)
            UI.render()
        })
    }

    static render() {
        lists = Storage.getLists()
        clearElement(listsDisplay)
        renderLists()

        const selectedList = lists.find(list => list.id === selectedListId)
        if (selectedListId == null || selectedList == undefined) {
            tasksContainer.textContent = 'Choose a list on the left to get started.'
            tasksContainer.classList.add('no-list-text')
            newTaskForm.style.display = 'none'
            deleteContainer.style.display = 'none'
        } else {
            tasksContainer.classList.remove('no-list-text')
            newTaskForm.style.display = ''
            deleteContainer.style.display = ''
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
                listsDisplay.appendChild(listElement)
            })
        }
    }
}