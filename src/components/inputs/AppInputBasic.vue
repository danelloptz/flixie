<template>
    <input
      ref="input"
      :type="type"
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
  methods: {
    trigger() {
      this.$refs.input.click();
    },
  }
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
