<template>
  <div>
    <h1>Friends</h1>
    <AppFriendCard v-for="f in friends" :key="f.id" :friend="f" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    }
  }
}
</script>
