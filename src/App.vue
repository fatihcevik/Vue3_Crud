<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/home" class="nav-link">
        <font-awesome-icon icon="home" /> Home
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" v-if="showModeratorBoard" class="nav-link">Tutorials</router-link>
        </li>
        <li v-if="showAdminBoard || showModeratorBoard" class="nav-item">
          <router-link to="/tutorials/add" class="nav-link">Add Tutorial</router-link>
        </li>
      </div>

      <div v-if="showAdminBoard" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/auth/manageusers" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Manage Users
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/users/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/auth.service";
export default defineComponent({
  name: "App",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    logOut() {
      AuthService.logout();
      //this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isLoggedIn() {
      if (this.currentUser && this.currentUser['roles']) {
        if (
          this.currentUser['roles'].includes('ROLE_USER') ||
          this.currentUser['roles'].includes('ROLE_ADMIN') ||
          this.currentUser['roles'].includes('ROLE_MODERATOR')) {
          console.log("dfddddd");
          return true;
        }
      }
      return false;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  }
});

</script>