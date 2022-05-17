<script setup>
import { useToDoStore } from '@/stores/todo';
import { ref } from "vue";
import CreateToDo from '@/components/CreateToDo.vue';
import EditToDo from '@/components/EditToDo.vue';

const store = useToDoStore();

// Update id of editing to do
const handleEdit = (id) => {
  store.updateId(id)
};

// Delete to do item
const handleDelete = (id) => {
  store.deleteToDo(id)
};

// Complete to do item
const handleComplete = (id) => {
  store.completeTodo(id)
};

// Get all to do items
const todos = store.listTodos

// Selected value to filter the to do list
const filter = ref('all')

// Render to do item depending on filter
const displayTodo = (completed) => {
  switch (filter.value) {
    case 'all':
      return true
    case 'completed':
      return completed
    case 'uncompleted':
      return completed === false
    default:
      return true;
  }
}
</script>

<template>
  <main>
    <div class="container w-50 mt-4">
      <CreateToDo />

      <label class="mt-4" for="filterToDos">Filter to do list</label>

      <select
        class="form-select"
        aria-label="Filter to do list"
        v-model="filter"
        id="filterToDos"
      >
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
          <div v-if="displayTodo(todo.done)">
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
                    @click="handleEdit(id)"
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
      </div>

      <EditToDo />
    </div>
  </main>
</template>
