import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useToDoStore = defineStore({
  id: 'todo',
  state: () => ({
    toDos: {
      "fcd7da82-041c-4406-bf99-89843349ddfe": {
        title: "Clean the house",
        done: false
      },
      "67a7fd17-2d2f-4465-ab4c-d185a93aee7e": {
        title: "Go for a run",
        done: true
      },
      "f0bc79c2-c94c-4957-ac57-99bc60218e7b": {
        title: "Have a dance class",
        done: false
      }
    }
  }),
  getters: {
    listToDos: (state) => state.toDos
  },
  actions: {
    addToDo(item) {
      this.toDos[uuidv4()] = item
    },

    editToDo(id, data) {
      this.toDos[id] = data
    },

    deleteToDo(id) {
      delete this.toDos[id]
    },

    completeToDo(id) {
      this.toDos[id].done = true
    }
  }
})
