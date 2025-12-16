<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      type="password"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "AppInputPass",
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>
