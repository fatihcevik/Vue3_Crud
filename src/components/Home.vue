<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
  
<script lang="ts">

import { defineComponent } from "vue";
import UserService from "../services/user.service";
export default defineComponent({
  name: "Home",
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response:any) => {
        this.content = response.data;
      },
      (error:any) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  } 
});
</script>

<style scoped>
</style>