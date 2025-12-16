<template>
  <button class="btn" @click="$emit('click')" :type="type">
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
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #4f46e5;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background: #4338ca;
}
</style>
