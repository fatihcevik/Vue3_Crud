<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(tutorial, index) in tutorials"
          :key="index" @click="setActiveTutorial(tutorial, index)">
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial.id">
        <h4>Tutorials</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TurorialService from "@/services/tutorial.service";
import type Tutorial from "@/types/TutorialModel";
import type ResponseData from "@/types/ResponseDataModel";

export default defineComponent({
  name: "tutorials-list",
  data() {
    return {
      tutorials: [] as Tutorial[],
      currentTutorial: {} as Tutorial,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveTutorials() {
      TurorialService.getAll()
        .then((response: ResponseData) => {
          this.tutorials = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = {} as Tutorial;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial: Tutorial, index = -1) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TurorialService.deleteAll()
        .then((response: ResponseData) => {
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      TurorialService.findByTitle(this.title)
        .then((response: ResponseData) => {
          this.tutorials = response.data;
          this.setActiveTutorial({} as Tutorial);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>