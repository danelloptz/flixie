<template>
  <button class="btn" :type="type">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButtonFilled",
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style scoped>
.btn {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: none;
  color: var(--primary_accent);
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter';
  font-size: var(--main_text);
  transition: .2s ease-in;
  cursor: pointer;
}
</style>
