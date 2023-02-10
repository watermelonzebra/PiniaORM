import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
    const count = ref(0);
    const name = ref("Eduardo");
    const doubleCount = computed(() => count.value * 2);
    function increment() {
        console.log("test");
        count.value++;
    }

    return { count, name, doubleCount, increment };
});

export const useTodoStore = defineStore("todo", () => {
    const task = ref("Todo");
    const is_finished = ref(false);
    function finishTask() {
        is_finished.value = !is_finished.value;
    }

    return { task, is_finished, finishTask };
});
