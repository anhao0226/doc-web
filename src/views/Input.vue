<template>
  <div class="input">
    <div class="input-wrapper">
      <div
        class="input-container"
        :style="`width:${width}px`"
      >
        <input
          class="input-data"
          type="text"
          required
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <div class="underline"></div>
        <label
          class="input-label"
          :style="labelStyle"
        >{{ label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import {} from "vue";

export default {
  name: "IInput",
  props: {
    modelValue: String,
    label: String,
    labelStyle: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 240,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.input {
  position: relative;
  display: inline-block;
}

.input-wrapper {
  padding: 4px 0;
}

.input-container {
  width: 100%;
  position: relative;
  height: 40px;
  /* background-color: cornflowerblue; */
}

.input-label {
  position: absolute;
  bottom: 8px;
  left: 0;
  color: gray;
  pointer-events: none;
  transition: all 0.3s ease;
  padding: 4px 0;
  font-size: 18px;
}

.input-data {
  width: 100%;
  position: absolute;
  height: inherit;
  left: 0;
  border-style: none;
  border-bottom: 2px solid silver;
  border-radius: 0;
  outline-style: none;
  font-size: 17px;
  text-align: start;
  color: rgba(98, 98, 98, 1);
  background-color: rgba(0, 0, 0, 0);
}

.input-data:focus ~ .input-label,
.input-data:valid ~ .input-label {
  transform: translateY(-20px);
  font-size: 16px;
  color: rgba(98, 98, 98, 1);
}

.input-container .underline {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.2px;
}

.input-container .underline::before {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  bottom: -2px;
  left: 0;
  background: #5d6d75;
  transform: scaleX(0);
  transition: all 0.2s ease;
}

.input-data:focus ~ .underline::before,
.input-data:valid ~ .underline::before {
  transform: scaleX(1);
}
</style>