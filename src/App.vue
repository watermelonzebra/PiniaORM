<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { useRepo } from "pinia-orm";
import { computed, ref } from "vue";
import Task from "./Models/taskModel";
import User from "./Models/userModel";

const userRepo = useRepo(User);
const users = computed(() => userRepo.query().with("tasks").get());

const activeIndex = ref(0);
const activeUser = computed(() => users.value[activeIndex.value]);
function setActiveUser(index: number) {
    activeIndex.value = index;
}

function createNewUser() {
    userRepo.insert({ name: faker.name.fullName() });
    console.log(userRepo.query().with("tasks").get());
}

const taskRepo = useRepo(Task);
const tasks = computed(() => taskRepo.withAll().get());
function createTask() {
    console.log(tasks);
    console.log("task");
    taskRepo.insert({
        task: faker.commerce.product(),
        userId: activeUser.value.id,
    });
}

function handleChangeFinished(task: Task) {
    taskRepo.save({
        ...task,
        id: task.id,
        is_finished: !task.is_finished,
    });
}
</script>

<template>
    <div class="actions"></div>
    <div class="overview">
        <div>
            <h2 class="title">Users</h2>

            <ul class="user-list">
                <li
                    v-for="(user, index) in users"
                    :key="user.id"
                    :class="[
                        'user-list-item',
                        { '-active': index === activeIndex },
                    ]"
                    @click="setActiveUser(index)"
                >
                    {{ user.name }}
                </li>
            </ul>
            <p class="button" @click="createNewUser">Add user</p>
        </div>
        <div>
            <h2>Tasks</h2>
            <ul class="task-list">
                <li
                    class="task-list-item"
                    v-for="task in activeUser.tasks"
                    :key="task.id"
                >
                    <input
                        type="checkbox"
                        :checked="task.is_finished"
                        @click="handleChangeFinished(task)"
                    />
                    <p>{{ task.task }}</p>
                </li>
            </ul>

            <p class="button" @click="createTask">Add task</p>
        </div>
    </div>
</template>

<style scoped>
.overview {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 250px 1fr;
}

.user-list {
    display: flex;
    flex-flow: column;
    list-style-type: none;
    align-items: flex-start;
}

.user-list-item.-active {
    color: blue;
    font-weight: bold;
}

.task-list {
    display: flex;
    flex-flow: column;
    list-style-type: none;
}

.task-list-item {
    display: flex;
}
.task-list-item > p {
    margin: 0;
}

.actions {
    display: flex;
    gap: 5px;
}

.button {
    border: 1px solid black;
    padding: 10px 20px;
    border-radius: 10px;
}

.button:hover {
    background-color: black;
    color: white;
}
</style>
