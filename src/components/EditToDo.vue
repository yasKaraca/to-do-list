<script setup>
import { useToDoStore } from "@/stores/todo";
import { storeToRefs } from 'pinia'
import { ref, watch } from "vue";

const store = useToDoStore()

// Fetch to do data
const { todoDetails } = storeToRefs(store)

// Copy Data for update
const updateData = ref({ ...todoDetails.value})

// Re render displayed data when to do item change
watch(todoDetails, (dataChange) => updateData.value = dataChange)

// Save updated to do item
const updateTodo = () => {
  store.editTodo(updateData.value);
};
</script>

<template>
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

        <form @submit.prevent="updateTodo">
          <div class="modal-body">
            <div class="mb-3">
              <label for="editTitle" class="form-label">Title</label>
              <input
                v-model="updateData.title"
                type="text"
                class="form-control"
                id="editTitle"
              />
            </div>

            <div class="mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="updateData.done"
                id="doneEdit"
              />
              <label class="form-check-label" for="doneEdit">
                Task is done : {{ updateData.done ? "yes" : "no" }}
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
</template>
