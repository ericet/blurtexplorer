<template>
  <div>
    <HeaderEFTG portal="OAM Portal" :showAuth="true" ref="headerEFTG"></HeaderEFTG>
    <div class="container">
      <h2>Richlist</h2>
      <div v-if="richlist.length > 0">
        <sorted-table :values="richlist">
          <thead>
            <tr class="table-primary">
              <th scope="col">#</th>
              <th scope="col" style="color:white">
                <sort-link name="name">Account</sort-link>
              </th>
              <th scope="col">
                <sort-link name="balance">Balance</sort-link>
              </th>
              <th scope="col">
                <sort-link name="bp">Blurt Power</sort-link>
              </th>
              <th scope="col">
                <sort-link name="delegationOut">Delegation Out</sort-link>
              </th>
              <th scope="col">
                <sort-link name="delegationIn">Delegation In</sort-link>
              </th>
              <th scope="col">
                <sort-link name="withdrawRate">Power Down</sort-link>
              </th>
              <th scope="col">
                <sort-link name="totalAccountBp">Total Account BP</sort-link>
              </th>
              <th scope="col">
                <sort-link name="totalValue">Account Value</sort-link>
              </th>
              <!-- <th scope="col">Vote</th> -->
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="rich in sort.values" :key="rich.name">
              <td>{{ rich.num }}</td>
              <td>
                <a :href="BLOG+'@'+rich.name" target="_blank">
                <div
                  v-bind:style="{ backgroundImage: 'url(' + rich.imgUrl + ')' }"
                  class="image-profile mr-2"
                ></div>
                </a>
                <router-link :to="EXPLORER+'@'+rich.name">{{ rich.name }}</router-link>
              </td>
              <td>{{ rich.balance }} BLURT</td>
              <td>{{ rich.bp }} BP</td>
              <td>{{ rich.delegationOut }} BP</td>
              <td>{{ rich.delegationIn }} BP</td>
              <td v-if="rich.diff===''">{{ rich.withdrawRate }} BP</td>
              <td v-else>{{ rich.withdrawRate }} BP in {{rich.diff}}</td>
              <td>{{ rich.totalAccountBp }} BP</td>
              <td>${{ rich.totalValue }}</td>
            </tr>
          </tbody>
        </sorted-table>
      </div>
      <div v-else>
        <div class="loader"></div>
      </div>
      <div v-if="alert.info" class="alert alert-info" role="alert">{{alert.infoText}}</div>
      <div v-if="alert.success" class="alert alert-success" role="alert" v-html="alert.successText"></div>
      <div v-if="alert.danger" class="alert alert-danger" role="alert">{{alert.dangerText}}</div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import { Client } from "eftg-dsteem";
import SteemClient from "@/mixins/SteemClient.js";
import axios from "axios";

import Config from "@/config.js";
import Utils from "@/js/utils.js";
import ChainProperties from "@/mixins/ChainProperties.js";
import HeaderEFTG from "@/components/HeaderEFTG";

export default {
  name: "Richlist",

  data() {
    return {
      richlist: [],
      EXPLORER: Config.EXPLORER,
      BLOG:Config.BLOG,
    };
  },

  components: {
    HeaderEFTG,
  },
  mixins: [ChainProperties, SteemClient],

  created() {
    this.getRichlist();
  },

  methods: {
    async getRichlist() {
      try {
        const price = await this.getBlurtPrice();
        const response = await axios.get("https://api.blurt.buzz/richlist");
        if (response.status === 200) {
          let accounts = response.data;
          let count = 1;
          for (let account of accounts) {
            let diff='';
            if (account.next_vesting_withdrawal !== "1969-12-31T23:59:59") {
              diff =
                Utils.textTime( new Date(account.next_vesting_withdrawal + "Z") - new Date());
            }
            this.richlist.push({
              num: count++,
              name: account.name,
              imgUrl: `https://images.blurt.blog/u/${account.name}/avatar`,
              balance: account.balance,
              bp: account.vesting_shares,
              delegationOut: account.delegated_vesting_shares,
              delegationIn: account.received_vesting_shares,
              withdrawRate: account.vesting_withdraw_rate,
              totalAccountBp: account.total_vesting_shares,
              totalValue: Math.round(account.total_value * price),
              diff
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getBlurtPrice() {
      return new Promise(async (resolve) => {
        try {
          const response = await axios.get(
            "https://api.blurt.buzz/price_info"
          );
          if (response.status === 200) {
            let price = response.data.price_usd;
            resolve(price);
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
  },
};
</script>

<style scoped>
.image-profile {
  display: inline-block;
  height: 2rem;
  width: 2rem;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  vertical-align: middle;
}

.circle {
  border: 2px solid;
  border-radius: 50%;
  width: 12px;
  height: 12px;
}

.enabled {
  border-color: green;
}

.disabled {
  border-color: red;
}

.table > tbody > tr > td {
  vertical-align: middle;
}

.vests {
  font-family: monospace;
  font-size: 1rem;
  margin: auto;
  text-align: right;
}
a {
  color: black;
}
</style>
