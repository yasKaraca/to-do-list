<script setup>
import { useToDoStore } from '@/stores/todo'
import { ref } from 'vue'

// Title for new to do item
const title = ref('')

// Create new to do item
const newToDo = () => {
  useToDoStore().addToDo({
    title: title.value,
    done: false,
  });
  title.value = '';
}
</script>

<template>
  <form @submit.prevent="newToDo">
    <div class="mb-3">
      <label for="createTitle" class="form-label">Title</label>
      <input
        v-model="title"
        type="text"
        class="form-control"
        id="createTitle"
        placeholder="Buy some vegetables"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add a to do item</button>
  </form>
</template>
