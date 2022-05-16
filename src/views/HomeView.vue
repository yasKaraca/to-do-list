<script setup>
import { useToDoStore } from "@/stores/todo";
import { ref } from "vue";

/**
 * CRUD for a to do item
 */

// Title for new to do item
const toDoTitle = ref("");

// Create new to do item
const handleSubmit = () => {
  useToDoStore().addToDo({
    title: toDoTitle.value,
    done: false,
  });
  toDoTitle.value = "";
};

// Store data for editing a to do
const toDoEdit = ref({
  id: null,
  data: {},
});

// Update editing data
const handleEdit = (todo, id) => {
  toDoEdit.value = { id, data: todo };
};

// Save updated to do item
const saveEditChanges = () => {
  useToDoStore().editToDo(toDoEdit.value.id, toDoEdit.value.data);
};

// Delete to do item
const handleDelete = (id) => {
  useToDoStore().deleteToDo(id);
};

// Complete to do item
const handleComplete = (id) => {
  useToDoStore().completeToDo(id);
};

/**
 * To do items listing and filtering
 */

// All to do items
const alltodos = useToDoStore().listToDos;

// Completed to do items
const completedTodos = ref({})

// Uncompleted to do items
const uncompletedTodos = ref({})

// To do items to render
const todos = ref(alltodos)

// Selected value to filter the to do list
const filter = ref('all')

// Loop through alltodos to filter completed and uncompleted to do items
for (const key in alltodos) {
  alltodos[key].done ? completedTodos.value[key] = alltodos[key] : uncompletedTodos.value[key] = alltodos[key]
}

// Re render to do items
const handleFilter = () => {
  switch (filter.value) {
  case 'all':
    todos.value = alltodos
    break;
  case 'completed':
    todos.value = completedTodos.value
    break;
  case 'uncompleted':
    todos.value = uncompletedTodos.value
    break;
  default:
    todos.value = alltodos
}
}
</script>

<template>
  <main>
    <div class="container w-50 mt-4">
      <!-- CREATE NEW TO DO -->

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="createTitle" class="form-label">Title</label>
          <input
            v-model="toDoTitle"
            type="text"
            class="form-control"
            id="createTitle"
            placeholder="Buy some vegetables"
          />
        </div>
        <button type="submit" class="btn btn-primary">Add a to do item</button>
      </form>

      <!-- LIST AND FILTER -->

      <label class="mt-4" for="filterToDos">Filter to do list</label>

      <select class="form-select" aria-label="Filter to do list" v-model="filter" id="filterToDos" @change="handleFilter">
        <option>all</option>
        <option>completed</option>
        <option>uncompleted</option>
      </select>

      <div class="accordion mt-2" id="todosAccordion">
        <div
          class="accordion-item"
          v-for="(todo, id, index) in todos"
          :key="id"
        >
          <h2 class="accordion-header" :id="`heading-${id}`">
            <button
              class="accordion-button"
              :class="[index === 0 ? '' : 'collapsed']"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse-${id}`"
              :aria-expanded="index === 0 ? true : false"
              :aria-controls="`collapse-${id}`"
            >
              {{ todo.title }}
            </button>
          </h2>
          <div
            :id="`collapse-${id}`"
            class="accordion-collapse collapse"
            :class="[index === 0 ? 'show' : '']"
            :aria-labelledby="`heading-${id}`"
            data-bs-parent="#todosAccordion"
          >
            <div class="accordion-body">
              <p>Task is done : {{ todo.done ? "yes" : "no" }}</p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="button"
                  class="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#todoEdit"
                  @click="handleEdit(todo, id)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="handleDelete(id)"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="handleComplete(id)"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL FOR EDITING A TO DO -->

      <div
        class="modal fade"
        id="todoEdit"
        tabindex="-1"
        aria-labelledby="editToDo"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editToDo">Edit a to do</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form @submit.prevent="saveEditChanges">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="editTitle" class="form-label">Title</label>
                  <input
                    v-model="toDoEdit.data.title"
                    type="text"
                    class="form-control"
                    id="editTitle"
                  />
                </div>

                <div class="mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="toDoEdit.data.done"
                    id="doneEdit"
                  />
                  <label class="form-check-label" for="doneEdit">
                    Task is done : {{ toDoEdit.data.done ? "yes" : "no" }}
                  </label>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                >
                  Update a to do item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
