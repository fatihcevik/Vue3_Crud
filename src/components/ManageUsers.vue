<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="img" />
            <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <Field name="username" type="text" class="form-control" />
                        <ErrorMessage name="username" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field name="email" type="email" class="form-control" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field name="password" type="password" class="form-control" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            Register New User
                        </button>
                    </div>
                </div>
            </Form>

            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
            </div>
        </div>

        <br />
        <div class="list row">
            <div class="col-md-8">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search by username" v-model="username" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchUser">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h4>User List</h4>
                <ul class="list-group">
                    <li class="list-group-item" :class="{ active: index == currentIndex }"
                        v-for="(user, index) in userList" :key="index" @click="setActiveUser(user, index)">
                        {{ user.username }}
                    </li>
                </ul>
            </div>
            <div class="col-md-6">
                <div v-if="selectedUser._id">
                    <h4>Users</h4>
                    <div>
                        <label><strong>UserName:</strong></label> {{ selectedUser.username }}
                    </div>
                    <div>
                        <label><strong>Email:</strong></label>
                        {{ selectedUser.email }}
                    </div>
                    <div>
                        <label><strong>Password:</strong></label>
                        {{ selectedUser.password }}
                    </div>
                    <div>
                        <label><strong>Roles:</strong></label>
                        <ul class="list-group">
                            <li class="list-group-item" :class="{ active: index == currentIndex }"
                                v-for="(role, index) in selectedUserRoleList" :key="index"
                                @click="setActiveUserRole(role, index)">
                                {{ role }}
                            </li>
                        </ul>
                    </div>
                    <router-link :to="'/users/' + selectedUser._id" class="badge badge-warning">Edit</router-link>
                </div>
                <div v-else>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">

import { defineComponent } from "vue";
import UserService from "../services/user.service";
import type UserModel from "@/types/UserModel";
import AuthService from "@/services/auth.service";
import type ResponseData from "@/types/ResponseDataModel";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
    name: "ManageUsers",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            username: yup
                .string()
                .required("Username is required!")
                .min(3, "Must be at least 3 characters!")
                .max(20, "Must be maximum 20 characters!"),
            email: yup
                .string()
                .required("Email is required!")
                .email("Email is invalid!")
                .max(50, "Must be maximum 50 characters!"),
            password: yup
                .string()
                .required("Password is required!")
                .min(6, "Must be at least 6 characters!")
                .max(40, "Must be maximum 40 characters!"),
        });

        return {
            successful: false,
            loading: false,
            message: "",
            schema,
            selectedUser: {} as UserModel,
            selectedUserRole: {} as string,
            userList: [] as UserModel[],
            selectedUserRoleList: [] as string[],
            currentIndex: -1,
            currentUserRoleIndex: -1,
            username: "",
        };
    },

    methods: {
        retrieveUserList() {
            UserService.getAll()
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.userList = response.data;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveUserList();
            this.selectedUser = {} as UserModel;
            this.currentIndex = -1;
        },
        setActiveUser(user: any, index = -1) {
            this.selectedUser = user;
            this.currentIndex = index;
            this.selectedUserRoleList = user.roles as string[];
        },
        setActiveUserRole(userRole: string, index = -1) {
            this.selectedUserRole = userRole;
            this.currentUserRoleIndex = index;
        },
        searchUser() {
            UserService.findByUserName(this.username)
                .then((response: ResponseData) => {
                    this.userList = response.data;
                    this.setActiveUser({} as UserModel);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        handleRegister(user: any) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            AuthService.register(user)
                .then(
                    (data) => {
                        console.log(data.status);
                        this.successful = true;
                        this.loading = false;
                        this.$router.push("/manageusers");
                    })
                .catch((e: Error) => {
                    console.log(e);
                    this.successful = false;
                    this.loading = false;
                });
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        isAdmin() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_ADMIN');
            }
            else
                return false;
        }
    },
    mounted() {
        if (!this.loggedIn || !this.isAdmin) {
            this.$router.push("/profile");
        }
        else
            this.retrieveUserList();
    }
});

</script>
  
<style scoped>
img {
    width: 150px;
    border-radius: 2px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
    transition: width 1s;
}
</style>