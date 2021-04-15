
import { ref } from 'vue';

interface Value {
    key: string
    val: string
}

const _inputValues = ref<Value[]>([])
const _commentIndex = ref<number>(-1)

export {
    _inputValues,
    _commentIndex
}