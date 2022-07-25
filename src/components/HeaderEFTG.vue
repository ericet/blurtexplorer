<template>
  <div>
    <!-- <b-modal ref="modalAuth" hide-footer title="Login">
      <AuthComponent ref="auth" v-on:login="onLogin" v-on:close="closeModalAuth"></AuthComponent>
    </b-modal> -->
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="linkLogo" class="nav-item nav-link"
            ><div id="logo"><img src="../assets/blurt-logo.png" /></div
          ></router-link>
        </li>
      </ul>
      <b-navbar
        v-if="$store.state.auth.logged"
        class="ml-auto d-lg-none"
        style="margin: 0"
      >
        <ul class="navbar-nav">
          <b-nav-item-dropdown variant="link" size="lg" no-caret right>
            <template slot="button-content">
              <div
                class="image-profile"
                v-bind:style="{
                  backgroundImage: 'url(' + $store.state.auth.imgUrl + ')',
                }"
              ></div>
            </template>
            <b-dropdown-header>{{
              $store.state.auth.username
            }}</b-dropdown-header>
            <b-dropdown-divider></b-dropdown-divider>
            <!--<router-link to="/issuers" class="dropdown-item no-a" style="border-bottom:0px;"><font-awesome-icon icon="key" class="mr-2"/>Issuers</router-link>-->
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </ul>
      </b-navbar>
      <!-- <b-navbar-nav v-else class="nav-link ml-auto d-lg-none">
        <button class="btn btn-primary" @click="showModalAuth">Login</button>
      </b-navbar-nav> -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-item nav-link"
              ><div class="extra-padding">Explorer</div></router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link to="/map" class="nav-item nav-link"
              ><div class="extra-padding">Map</div></router-link
            >
          </li> -->
          <li class="nav-item">
            <router-link to="/witnesses" class="nav-item nav-link"
              ><div class="extra-padding">Witnesses</div></router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link to="/reports" class="nav-item nav-link"><div class="extra-padding">Reports</div></router-link>
          </li> -->
          <!-- <li class="nav-item">
            <router-link to="/proposals" class="nav-item nav-link"
              ><div class="extra-padding">Proposals</div></router-link
            >
          </li> -->
          <!-- <li class="nav-item">
            <router-link to="/status" class="nav-item nav-link"
              ><div class="extra-padding">Node Status</div></router-link
            >
          </li> -->
          <li class="nav-item">
            <router-link to="/exchanges" class="nav-item nav-link"
              ><div class="extra-padding">Exchanges</div></router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/richlist" class="nav-item nav-link"
              ><div class="extra-padding">Richlist</div></router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav">
          <b-nav-item-dropdown text="More" right>
            <b-dropdown-item href="#/map">Map</b-dropdown-item>
            <b-dropdown-item href="#/proposals">Proposals</b-dropdown-item>
            <b-dropdown-item href="#/status">Node Status</b-dropdown-item>
            <b-dropdown-item href="#/decoder">Memo Decoder</b-dropdown-item>
          </b-nav-item-dropdown>
        </ul>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              v-model="search"
              placeholder="Account, transaction, or block"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              @click="searchInput()"
              type="submit"
              >Search</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <select class="form-control" v-model="node">
            <option value="" selected disabled>Please select a node</option>
            <option value="https://rpc.blurt.buzz">rpc.blurt.buzz</option>
            <option value="https://rpc.blurt.world">rpc.blurt.world</option>
            <option value="https://blurtd.privex.io">blurtd.privex.io</option>
          </select>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import AuthComponent from "@/components/Auth";
import Auth from "@/mixins/Auth.js";
import Config from "@/config.js";
import axios from "axios";

export default {
  name: "HeaderEFTG",
  props: {
    portal: "",
    showAuth: false,
  },

  data() {
    return {
      showModal: false,
      linkLogo: "/",
      EXPLORER: Config.EXPLORER,
      search: "",
      node: this.$store.state.rpc_node,
    };
  },

  mixins: [Auth],

  mounted() {
    this.autologin();
  },
  watch: {
    node: function (newVal) {
      this.$store.state.rpc_node = newVal;
      this.$store.commit("setNode", newVal);
      this.$router.go();
    },
  },
  methods: {
    async autologin() {
      try {
        await this.login();
        this.linkLogo = Config.PAGE_AFTER_LOGIN;
      } catch (error) {
        console.log("Not logged");
        this.linkLogo = Config.PAGE_AFTER_LOGOUT;
      }
    },

    showModalAuth() {
      this.$refs.modalAuth.show();
    },

    onLogin() {
      this.closeModalAuth();
      this.$emit("login");
    },

    closeModalAuth() {
      this.$refs.modalAuth.hide();
    },

    logout() {
      console.log(this.$store.state.auth.user + " logout");
      this.$store.state.auth = {
        user: "",
        logged: false,
        imgUrl: "",
        keys: {
          owner: null,
          active: null,
          posting: null,
          memo: null,
        },
      };
      this.$emit("logout");
    },
    searchInput() {
      if (this.search === "") {
        return;
      }
      if (this.search.length === 40) {
        this.$router.push(`/tx/${this.search}`);
      } else if (/^\d+$/.test(this.search)) {
        this.$router.push(`/b/${this.search}`);
      } else {
        this.$router.push(`/@${this.search}`);
      }
    },
  },
  components: {
    AuthComponent,
  },
};
</script>

<style scoped>
#logo {
  height: 2.3rem;
}

#logo img {
  max-width: 100%;
  max-height: 100%;
}

.extra-padding {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}
</style>
