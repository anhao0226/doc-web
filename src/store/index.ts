
import { ref } from 'vue';
import { SecInputValue } from "./../libs/type";

interface Value {
    key: string
    val: string
}

const _inputValues = ref<SecInputValue[]>([]);
const _commentIndex = ref<number>(-1)

const GBoxStateInfo = ref({ x: 0, y: 0, state: false, data: "" })


export {
    GBoxStateInfo,
    _inputValues,
    _commentIndex
}