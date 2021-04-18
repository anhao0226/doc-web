
import { ref } from 'vue';
import { SecInputValue } from "./../libs/type";

interface Value {
    key: string
    val: string
}

const _inputValues = ref<SecInputValue[]>([]);
const _commentIndex = ref<number>(-1)

export {
    _inputValues,
    _commentIndex
}