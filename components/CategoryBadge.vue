<template>
  <div 
    class="flex justify-center items-center h-max rounded-lg p-3 w-max"
    :style="{ backgroundColor: badgeBackgroundColor }">
    {{ category.name }}
  </div>
</template>

<script>
export default {
  name: 'CategoryBadge',
  props: {
    category: {
      type: Object,
      default: () => ({
        name: String,
        color: String
      })
    }
  },
  computed: {
    badgeBackgroundColor() {
      if (this.category.color) {
        return `#${String(this.category.color)}`
      }
      return '#D9DDDC'
    }
  }
}
</script>

<style>

</style>