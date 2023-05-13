<template>
  <v-app>
    <v-app-bar elevate-on-scroll app class="primary">
      <v-toolbar-title>
        <router-link tag="div" to="/">
          <a class="accent--text header font-weight-black">
            DEMO_Group404
            <span class="font-weight-thin subheading secondary--text">Store</span>
          </a>
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
<!-- fix -->
    <div class="mode_btn">
      <v-tooltip v-if="!$vuetify.theme.dark" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="info" small fab @click="darkMode">
            <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
          </v-btn>
        </template>
        <span>Dark Mode On</span>
      </v-tooltip>

      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="info" small fab @click="darkMode">
            <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
          </v-btn>
        </template>
        <span>Dark Mode Off</span>
      </v-tooltip>
    </div>
<!-- fix        -->
 <cart-button @drawerChange="toggleDrawer" />
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <loading-overlay />
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
      <v-navigation-drawer
        style="position:fixed; overflow-y:scroll;"
        right
        v-model="drawer"
        temporary
        align-space-around
        column
        d-flex
      >
        <cart-drawer />
      </v-navigation-drawer>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      drawer: null
    };
  },
  mounted() {
    this.$store.dispatch("fetchCart");
  },
  computed: {
    ...mapGetters(["cartSize", "currentUser"]),
    ...mapState(["cartLoading"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
   
  }
};
</script>

<style>
.header {
  font-weight: bold !important;
  font-size: 30px !important;
  text-decoration: none;
}
/*Fix adjust mode btn  */
.mode_btn{
  margin-top: 25%;
  margin-left: 25%;
}
:root {
  /* Colors */
  --amazonOrange: #e88b01 !important;
}
</style>
