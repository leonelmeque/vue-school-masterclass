<template>
  <header id="header" class="header">
    <router-link :to="{ name: 'Home' }" class="logo">
      <img
        alt="vue school logo"
        src="../assets/svg/vueschool-logo.svg"
      />
    </router-link>

    <div class="btn-hamburger">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul>
        <li v-if="authUser" class="navbar-user">
          <router-link :to="{ name: 'Profile' }">
            <img
              :alt="`${authUser?.name} profile picture`"
              :src="authUser?.avatar"
              class="avatar-small"
            />
            <span>
              {{ authUser?.name }}
              <img
                alt=""
                class="icon-profile"
                src="../assets/svg/arrow-profile.svg"
              />
            </span>
          </router-link>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <a href="profile.html">View profile</a>
              </li>
              <li class="dropdown-menu-item">
                <a href="#">Log out</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  const store = useStore()

  const authUser = computed(() => store.getters.authUser)
</script>

<style scoped></style>
