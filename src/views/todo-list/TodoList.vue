<template>
  <div class="todo-list__container">
    <div class="todo-list__body">
      <div class="todo-list__header">
        <div class="todo-list__header-menu">
          <h1>{{ userName }}</h1>
          <button class="form__submit-btn todo-list__btn-logout" @click="logOut">
            Logout
          </button>
        </div>
      </div>
      <div class="todo-list__block">
        <div class="todo-list__form">
          <button class="form__submit-btn todo-list__form-btn" @click="addTask">
            Add
          </button>
          <input class="todo-list__form-input" type="text" placeholder="User ID" v-model="addTaskFields.userId"/>
          <input class="todo-list__form-input" type="text" placeholder="Title" v-model="addTaskFields.title"/>
        </div>
        <h2>Create todo</h2>
      </div>
      <div class="todo-list__content">
        <div class="todo-list__filters">
          <select class="todo-list__form-input" name="status" placeholder="Select Status" v-model="filterByStatus">
            <option v-for="item in statusOptions" :key="item" :value="item.value">{{ item.label }}</option>
          </select>
          <select class="todo-list__form-input" name="userId" placeholder="Select ID user" v-model="filterByUserId">
            <option v-for="item in usersOptions" :key="item" :value="item.value">{{ item.label }}</option>
          </select>
          <input class="todo-list__form-input" type="text" placeholder="Serch by title..." v-model="lookupByTitle" />
        </div>
        <TodoListItem v-for="task in tasksListForRender" :key="task.id" :listItem="task" @update-list="updateList"/>
      </div>
    </div>
  </div>
</template>
<script>
import TodoListItem from './items'
import api from '@/services/client'

export default {
  name: 'TodoList',
  components: {
    TodoListItem
  },
  data () {
    return {
      taskList: [],
      lookupByTitle: null,
      filterByStatus: 'all',
      favoritesTasks: null,
      filterByUserId: 'all',
      addTaskFields: {
        userId: null,
        title: null
      },
      usersOptions: [],
      statusOptions: [
        {label: 'All', value: 'all'},
        {label: 'Completed', value: 'completed'},
        {label: 'Uncompleted', value: 'uncompleted'},
        {label: 'Favorites', value: 'favorites'},
      ]
    }
  },
  computed: {
    userName () {
      return `Hello, ${JSON.parse(localStorage.getItem('user'))?.username}!`
    },
    tasksListForRender () {
      return this.taskList.map((task) => {
        const favoritesTasks = this.favoritesTasks
        if (favoritesTasks?.find((favoriteTask) => task.id === favoriteTask.id)) {
          task.favorite = true
        }
        return task
      })
    }
  },
  mounted () {
    this.updateList()
  },
  watch: {
    lookupByTitle (val) {
      if (!val) this.updateList()
      this.taskList = this.taskList?.filter((task) => task.title.includes(val))
    },
    filterByUserId (id) {
      if (id == 'all') {
        this.updateList ()
        return
      }
      api.getTodoList().then(({data}) => {
          this.taskList = data
          this.taskList = this.taskList?.filter((task) => task.userId === id)
      })
    },
    filterByStatus (favorite) {
      switch (favorite) {
        case 'uncompleted':
        api.getTodoList().then(({data}) => {
          this.taskList = data
          this.taskList = this.taskList?.filter((task) => !task.completed)
        })
          break;
        case 'completed':
          api.getTodoList().then(({data}) => {
            this.taskList = data
            this.taskList = this.taskList?.filter((task) => task.completed)
          })
          break;
        case 'all':
          this.updateList()
          break;
        case 'favorites':
          if (this.favoritesTasks) {
            this.taskList = this.favoritesTasks 
          } else {
            this.taskList = []
          }
          break;
        default:
          this.updateList()
          break;
      }
    }
  },
  methods: {
    addTask () {
      api.creatTask({variables: this.addTaskFields}).then(({ data }) => {
        this.taskList.push(data)
      })
      this.resetCreateTaskForm()
    },
    resetCreateTaskForm () {
      this.addTaskFields = { userId: null, title: null }
    },
    async updateList () {
      await api.getTodoList().then(({data}) => {
        this.favoritesTasks = JSON.parse(localStorage.getItem('favoritesTasks'))
        this.taskList = data
        this.getUserOptions()
        new Notification('tets', { body: 'test' });
      })
    },
    logOut () {
      localStorage.removeItem('favoritesTasks')
      localStorage.removeItem('user')
      this.$router.push('sign-in')
    },
    getUserOptions () {
      const usersOptionsData = this.taskList?.map((task) => ({ label: task?.userId, value: task?.userId }))
      usersOptionsData?.push({ label: 'All', value: 'all' })
      this.usersOptions = usersOptionsData?.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === usersOptionsData.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      })
    }
  }
}
</script>
<style>
.todo-list__container {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  background-color: #A5A5A5;
}
.todo-list__body {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.todo-list__header {
  display: flex;
  width: 100%;
  height: 100px;
  flex-direction: row-reverse;
  align-items: center;
  padding: 40px;
}
.todo-list__block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  background-color: #7180bc;
  width: 100%;
  max-height: 100px;
  padding: 0 40px;
}
.todo-list__content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  background-color: #A5A5A5;
}
.todo-list__filters {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
}
.todo-list__form {
  display: flex;
  gap: 10px;
  flex-direction: row-reverse;
  align-items: center;
  width: 600px;
}
.todo-list__form-input, .todo-list__form-btn {
  max-width: 300px;
}
.todo-list__header-menu {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 500px;
}
.todo-list__btn-logout {
  max-width: 150px;
  background-color: #C80036;
}
.todo-list__btn-logout:not(:disabled):hover {
  background-color: #FF6969;
}
</style>
