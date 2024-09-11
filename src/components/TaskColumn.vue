<template>
  <div class="task-column">
    <h3>{{ status }}</h3>
    <div class="task-column-content" @drop.prevent="onDrop" @dragover.prevent>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @drag-start="onDragStart"
        @delete-task="deleteTask"
        @edit-task="editTask"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskColumn",
  props: {
    status: String,
    tasks: Array,
  },
  methods: {
    onDragStart(taskId) {
      this.$emit("task-move", { taskId, newStatus: this.status });
    },
    onDrop(event) {
      const taskId = event.dataTransfer.getData("taskId");
      this.$emit("task-move", { taskId, newStatus: this.status });
    },
    deleteTask(taskId) {
      this.$emit("delete-task", taskId);
    },
    editTask(task) {
      this.$emit("edit-task", task);
    },
  },
  components: {
    TaskItem,
  },
};
</script>

<style scoped>
.task-column {
  flex: 1;
  background: #f5f7fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 300px;
}

.task-column:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.task-column h3 {
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.task-column-content {
  min-height: 400px;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  transition: background-color 0.3s ease;
}

.task-column-content:hover {
  background-color: #f9fafb;
}

.task-column-content::-webkit-scrollbar {
  width: 8px;
}

.task-column-content::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.task-column-content::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}
</style>
