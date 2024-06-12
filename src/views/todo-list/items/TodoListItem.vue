<template>
  <div class="todo-list__item">
    {{ listItem.id }}
    <div class="todo-list__item-content">
      <div class="todo-list__item-header">{{ listItem?.title }}</div>
      <div class="todo-list__item-description">{{ listItem?.title }}</div>
    </div>
    <button v-if="!listItem.favorite" class="todo-list__btn form__submit-btn" @click="addToFavorites">Add to favorite</button>
  </div>
</template>
<script>

export default {
  name: 'TodoListItem',
  props: {
    listItem: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      favoritesTasks: []
    }
  },
  methods: {
    addToFavorites () {
      this.favoritesTasks = JSON.parse(localStorage.getItem('favoritesTasks'))
      if (!this.favoritesTasks) this.favoritesTasks = []
      this.favoritesTasks.push(this.listItem)
      localStorage.setItem('favoritesTasks', JSON.stringify(this.favoritesTasks))
      this.$emit('update-list')
    }
  }
}
</script>
<style>
.todo-list__item {
  display: flex;
  background-color: #fff;
  min-width: 80%;
  padding: 10px;
  border: 1px solid #000;
}
.todo-list__item-content {
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 85%;
}
.todo-list__item-header {
  font-size: 17px;
  line-height: 50px;
  font-weight: 400;
}
.todo-list__btn {
  background-color: #1679AB;
  width: 200px;
}
.todo-list__btn:not(:disabled):hover {
  background-color: #4aa3cf;
}
</style>