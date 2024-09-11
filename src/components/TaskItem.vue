<template>
  <div
    class="task-item"
    draggable="true"
    @dragstart="onDragStart"
    :class="priorityClass"
  >
    <div class="task-content">
      <h4 class="task-title">{{ task.title }}</h4>
      <p class="task-description">{{ task.description }}</p>
      <p class="priority">Priority: {{ task.priority }}</p>
      <p v-if="isOverdue" class="overdue">Overdue</p>
    </div>
    <div class="task-actions">
      <button class="edit-btn" @click="editTask">Edit</button>
      <button class="delete-btn" @click="deleteTask">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: Object,
  },
  computed: {
    isOverdue() {
      const today = new Date().toISOString().split("T")[0];
      return this.task.dueDate && this.task.dueDate < today;
    },
    priorityClass() {
      return {
        low: this.task.priority === "low",
        medium: this.task.priority === "medium",
        high: this.task.priority === "high",
        overdue: this.isOverdue,
      };
    },
  },
  methods: {
    onDragStart(event) {
      event.dataTransfer.setData("taskId", this.task.id);
    },
    deleteTask() {
      this.$emit("delete-task", this.task.id);
    },
    editTask() {
      this.$emit("edit-task", this.task);
    },
  },
};
</script>

<style scoped>
.task-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s ease;
}

.task-item.low {
  border-left: 6px solid #28a745;
}

.task-item.medium {
  border-left: 6px solid #ffc107;
}

.task-item.high {
  border-left: 6px solid #dc3545;
}

.task-item.overdue {
  border-left: 6px solid #ff4d4d;
}

.task-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-content {
  flex-grow: 1;
  padding-right: 15px;
  max-width: 55%;
}

.task-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-description {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.priority {
  font-weight: bold;
}

.overdue {
  color: #ff4d4d;
  font-weight: bold;
}

.task-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-btn,
.delete-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 15px;
  cursor: pointer;
  border-radius: 50px;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 8px;
}

.edit-btn:hover,
.delete-btn:hover {
  transform: scale(1.1);
}

.edit-btn {
  background-color: #007bff;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #ff4d4d;
}

.delete-btn:hover {
  background-color: #e60000;
}

.delete-btn:active,
.edit-btn:active {
  transform: scale(0.95);
}
</style>
