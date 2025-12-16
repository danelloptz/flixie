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
  background: linear-gradient(to right, #7C8CFF, #5F6BFF);
  color: var(--main_text_color);
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter';
  font-size: var(--main_text);
  transition: .2s ease-in;
  cursor: pointer;
}

.btn:hover {
  background: linear-gradient(#5F6BFF, #7C8CFF, right);
}
</style>
