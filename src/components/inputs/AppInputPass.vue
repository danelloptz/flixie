<template>
    <input
      type="password"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
export default {
  name: "AppInputBasic",
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style scoped>

input {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  background: var(--card_bg);
  font-size: var(--main_text);
  border: none;
}
</style>
