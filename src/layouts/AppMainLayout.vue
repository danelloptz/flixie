<template>
  <div>
    <AppNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import AppNavbar from '@/components/navbar/AppNavbar.vue'
export default { components: { AppNavbar } }
</script>
