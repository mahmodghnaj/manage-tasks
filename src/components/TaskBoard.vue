<template>
  <div class="task-board">
    <div class="group-actions">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tasks..."
        class="search-input"
      />
      <button @click="openTaskModal" class="add-task-btn">
        + Add New Task
      </button>
    </div>

    <div class="columns-container">
      <TaskColumn
        v-for="(tasks, status) in filteredTaskStatuses"
        :key="status"
        :status="status"
        :tasks="tasks"
        @task-move="onTaskMove"
        @delete-task="onTaskDelete"
        @edit-task="openEditTaskModal"
      />
    </div>

    <TaskModal
      v-if="isTaskModalOpen"
      :taskToEdit="taskToEdit"
      @close="closeTaskModal"
      @add-task="addNewTask"
      @update-task="updateTaskDetails"
    />
  </div>
</template>

<script>
import TaskColumn from "./TaskColumn.vue";
import TaskModal from "./TaskModal.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "TaskBoard",
  components: {
    TaskColumn,
    TaskModal,
  },
  data() {
    return {
      isTaskModalOpen: false,
      searchQuery: "",
      taskToEdit: null,
    };
  },
  computed: {
    ...mapState(["tasks"]),
    filteredTaskStatuses() {
      const filteredTasks = this.tasks.filter((task) => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      });

      return {
        Todo: filteredTasks.filter((task) => task.status === "Todo"),
        "In Progress": filteredTasks.filter(
          (task) => task.status === "In Progress"
        ),
        "In Review": filteredTasks.filter(
          (task) => task.status === "In Review"
        ),
        Done: filteredTasks.filter((task) => task.status === "Done"),
      };
    },
  },
  methods: {
    ...mapActions(["moveTask", "addTask", "updateTask", "deleteTask"]),
    onTaskMove({ taskId, newStatus }) {
      this.moveTask({ taskId, newStatus });
    },
    openTaskModal() {
      this.isTaskModalOpen = true;
      this.taskToEdit = null;
    },
    openEditTaskModal(task) {
      this.taskToEdit = task;
      this.isTaskModalOpen = true;
    },
    closeTaskModal() {
      this.isTaskModalOpen = false;
    },
    addNewTask(task) {
      this.addTask(task);
      this.closeTaskModal();
    },
    updateTaskDetails(updatedTask) {
      this.updateTask(updatedTask);
      this.closeTaskModal();
    },
    onTaskDelete(taskId) {
      this.deleteTask(taskId);
    },
  },
};
</script>

<style scoped>
.group-actions {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.task-board {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
}

.search-input {
  margin-bottom: 5px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
}

.add-task-btn {
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  margin-bottom: 5px;
}

.add-task-btn:hover {
  background-color: #0056b3;
}

.columns-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
  flex-wrap: wrap;
}

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
  min-width: 250px;
  margin: 10px;
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
  min-height: 300px;
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
@media (max-width: 768px) {
  .columns-container {
    flex-direction: column;
    align-items: center;
  }

  .task-column {
    max-width: 100%;
  }

  .add-task-btn {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .task-column {
    max-width: 45%;
  }
}
</style>