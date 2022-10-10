<template>
  <div v-if="currentUser._id" class="edit-form">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="currentUser.username" />
      </div>
      <div class="form-group">
        <label for="email">email</label>
        <input type="text" class="form-control" id="email" v-model="currentUser.email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" id="password" v-model="currentUser.password" />
      </div>
    </form>
    <button class="badge badge-danger mr-2" @click="deleteUser">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateUser">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
    {{currentUser}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserService from "@/services/user.service";
import type UserModel from "@/types/UserModel";
import type ResponseData from "@/types/ResponseDataModel";

export default defineComponent({
  name: "user-details",
  data() {
    return {
      currentUser: {} as UserModel,
      message: "",
    };
  },
  methods: {
    getUser(id: any) {
      UserService.get(id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentUser = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(password: string, roles: any) {
      let data = {
        _id: this.currentUser._id,
        username: this.currentUser.username,
        password: this.currentUser.password,
        email: this.currentUser.email,
        roles: this.currentUser.roles
      };

      UserService.update(this.currentUser._id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentUser.password = password;
          this.currentUser.roles = roles;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateUser() {
      UserService.update(this.currentUser._id, this.currentUser)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserService.delete(this.currentUser._id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "manageusers" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  }
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>