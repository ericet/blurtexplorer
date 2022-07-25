<template>
  <div>
    <HeaderEFTG ref="headerEFTG"></HeaderEFTG>
    <div class="container">
      <div class="card">
        <div class="card-header">BLURT Node Status</div>
        <div class="card-body">
          <div class="items">
            <div
              class="item"
              v-for="(node, idx) in sortedArray"
              :key="idx"
            >
              <div :class="'alert alert-' + node.css">
                <p>
                  <strong class="display-5">{{ node.name }}</strong>
                  <br />
                  <em
                    ><a :href="node.url" target="_blank" :title="node.name">{{
                      node.url
                    }}</a></em
                  >
                </p>
                <p>PING: {{ node.ping }} <em>ms</em></p>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderEFTG from "@/components/HeaderEFTG";
import axios from "axios";
export default {
  name: "Status",
  computed: {
    NodeStatus() {
      return this.nodes["blurt"];
    },
     sortedArray: function() {
      function compare(a, b) {
        console.log(a.status);
        if (a.ping < b.ping)
          return -1;
        if (a.ping > b.ping)
          return 1;
        return 0;
      }
      return this.nodes['blurt'].sort(compare);
    }
  },
  data() {
    return {
      nodes: {
        blurt: [
           {
            css: "",
            name: "BLURT World by Core Team",
            status: "",
            url: "https://rpc.blurt.world",
          },
          {
            css: "",
            name: "Blurt Blog by Core Team",
            status: "",
            url: "https://api.blurt.blog",
          },
         
          {
            css: "",
            name: "Blurt Buzz by @ericet",
            status: "",
            url: "https://rpc.blurt.buzz",
          },
          {
            css: "",
            name: "Blurtworld by @yehey",
            status: "",
            url: "https://rpc.blurtworld.com",
          },
          {
            css: "",
            name: "Privex by @someguy123",
            status: "",
            url: "https://blurtd.privex.io",
          },
          {
            css: "",
            name: "Softmetal.xyz by @softmetal",
            status: "",
            url: "https://api.softmetal.xyz",
          },
          
        ],
      },
    };
  },
  components: {
    HeaderEFTG,
  },
  methods: {
    Init() {
      let nodes = this.nodes["blurt"];
      for (let i = 0; i < nodes.length; i++) {
        let start = Date.now();
        axios
          .get(nodes[i].url, {
            params: {
              timestamp: start,
            },
          })
          .then((result) => {
            if (result.status === 200) {
              nodes[i].status = "OK";
              nodes[i].css = "success";
            } else {
              nodes[i].css = "warning";
            }
            let end = Date.now() - start;
            nodes[i].ping = end;
          })
          .catch((error) => {
            nodes[i].css = "danger";
            nodes[i].status = error.message;
            console.error(error);
          });
      }
      console.log('node')
    },
  },
  mounted() {
    this.Init();
  },
};
</script>

<style scoped>
.items {
	display: flex;
	flex-wrap: wrap;
	margin-left: -10px;
	margin-top: -10px;
}
.items .item {
	flex: 1 0 calc(30% - 10px);
  box-sizing: border-box;
  color: #ffffff;
  text-align:center;
  padding: 0px;
	margin-left: 10px;
	margin-top: 10px;
}
</style>
