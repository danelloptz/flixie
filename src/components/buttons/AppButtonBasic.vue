<template>
  <button class="btn" :type="type" :style="{ 
    border: borders ? '1px solid #7C8CFF' : 'none',
    background: borders ? '#1E2130' : 'none'
   }">
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
    borders: {
      type: Boolean,
    }
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
