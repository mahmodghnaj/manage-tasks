<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>{{ isEditMode ? "Edit Task" : "Add New Task" }}</h3>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="task.title" id="title" class="input" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="task.description"
            id="description"
            class="textarea"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="due-date">Due Date</label>
          <input
            type="date"
            v-model="task.dueDate"
            id="due-date"
            class="input"
          />
        </div>
        <div class="form-group">
          <label for="priority">Priority</label>
          <select v-model="task.priority" id="priority" class="select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="task.status" id="status" class="select">
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditMode ? "Update Task" : "Add Task" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskModal",
  props: {
    taskToEdit: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      task: {
        title: "",
        description: "",
        dueDate: "",
        priority: "low",
        status: "Todo",
      },
    };
  },
  computed: {
    isEditMode() {
      return !!this.taskToEdit;
    },
  },
  watch: {
    taskToEdit: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.task = { ...newTask };
        }
      },
    },
  },
  methods: {
    submitTask() {
      if (this.isEditMode) this.$emit("update-task", this.task);
      else {
        const newTask = { ...this.task, id: Date.now().toString() };
        this.$emit("add-task", newTask);
      }
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

h3 {
  margin-bottom: 20px;
  font-size: 1.25rem;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
  margin-right: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
}

.input,
.textarea,
.select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input:focus,
.textarea:focus,
.select:focus {
  border-color: #007bff;
  outline: none;
}

.textarea {
  min-height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
    max-width: 100%;
  }
  .btn {
    flex: 1;
    text-align: center;
    margin: 0 5px;
  }
}
</style>
