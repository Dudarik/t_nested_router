<template>
  <div id="app" class="app">
    <nav class="main-menu">
      <router-link to="/">Главная</router-link> |
      <router-link to="/animals/cat/little_cat">кошки</router-link> |
      <router-link to="/category/electronics/product/123"
        >Продукт 123</router-link
      >
      |
      <router-link to="/user/profile/settings/security"
        >Настройки пользователя</router-link
      >
      |
      <router-link to="/any/nested/path/you/want/with/many/levels"
        >Оч. большая вложенность</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  .main-menu {
    padding: 20px;
    text-align: center;
    background-color: #f8f9fa;
    margin-bottom: 20px;

    a {
      margin: 0 10px;
      color: #2c3e50;
      text-decoration: none;
    }

    a.router-link-exact-active {
      color: #42b983;
      font-weight: bold;
    }
  }
}
</style>
