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
          <a @click.prevent="userDropdownOpen = !userDropdownOpen">
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
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div
            id="user-dropdown"
            :class="{ 'active-drop': userDropdownOpen }"
          >
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{ name: 'Profile' }"
                  >View profile</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="handleSignOut">Log out</a>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="authUser" class="navbar-item">
          <a @click.prevent="$store.dispatch('signOut')">Sign Out</a>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <router-link :to="{ name: 'Register' }"
            >Register</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex'
  import { computed, ref } from 'vue'

  const userDropdownOpen = ref(false)

  const store = useStore()

  const authUser = computed(() => store.getters.authUser)

  const handleSignOut = () => {
    store.dispatch('signOut')
  }
</script>

<style scoped></style>
