import { createStore } from "vuex";

const store = createStore({
    state: {
        tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    },
    mutations: {
        ADD_TASK(state, task) {
            state.tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        UPDATE_TASK_STATUS(state, { taskId, newStatus }) {
            const task = state.tasks.find((t) => t.id === taskId);
            if (task) {
                task.status = newStatus;
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
        DELETE_TASK(state, taskId) {
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        UPDATE_TASK(state, updatedTask) {
            const taskIndex = state.tasks.findIndex((task) => task.id === updatedTask.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = updatedTask;
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
    },
    actions: {
        addTask({ commit }, task) {
            commit("ADD_TASK", task);
        },
        moveTask({ commit }, { taskId, newStatus }) {
            commit("UPDATE_TASK_STATUS", { taskId, newStatus });
        },
        deleteTask({ commit }, taskId) {
            commit("DELETE_TASK", taskId);
        },
        updateTask({ commit }, updatedTask) {
            commit("UPDATE_TASK", updatedTask);
        },
    },
});

export default store;
