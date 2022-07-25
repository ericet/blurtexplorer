import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/components/MapPage'
import Password from '@/components/Password'
import Witnesses from '@/components/Witnesses'
import Richlist from '@/components/Richlist'
import Exchange from '@/components/Exchange'
import Status from '@/components/Status'

import Page404 from '@/components/Page404'

// Explorer
import HomeExplorer from '@/components/explorer/Home'
import AccountExplorer from '@/components/explorer/Account'
import PostExplorer from '@/components/explorer/Post'
import BlockExplorer from '@/components/explorer/Block'
import TransactionExplorer from '@/components/explorer/Transaction'
import TxExplorer from '@/components/explorer/Tx'
import Decoder from './views/MemoDecoder.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeExplorer
    },
    {
      path: "/map",
      name: "MapPage",
      component: MapPage
    },
    {
      path: "/password",
      name: "Password",
      component: Password
    },
    {
      path: "/witnesses",
      name: "Witnesses",
      component: Witnesses
    },
    {
      path: "/rewardcalc",
      name: "RewardCalc",
      component: () => import('./views/RewardCalcPage.vue')
    },
    {
      path: "/broadcast",
      name: "Broadcast",
      component: () => import('./views/BroadcastPage.vue')
    },
    {
      path: "/proposals",
      name: "Proposals",
      component: () => import('./views/ProposalsPage.vue')
    },
    {
      path: "/proposals/:id",
      name: "Proposal",
      component: () => import('./views/ProposalPage.vue')
    },
    {
      path: "/reports",
      name: "Reports",
      component: () => import('./views/ReportsPage.vue')
    },
    {
      path: "/",
      name: "Explorer",
      component: HomeExplorer
    },
    {
      path: '/@:account',
      name: 'Account',
      component: AccountExplorer
    }, {
      path: '/@:account/:permlink',
      name: 'Post',
      component: PostExplorer
    }, {
      path: '/b/:id',
      name: 'Block',
      component: BlockExplorer
    }, {
      path: '/b/:id/:tx',
      name: 'Transaction',
      component: TransactionExplorer
    }
    , {
      path: '/tx/:tx',
      name: 'Tx',
      component: TxExplorer
    }
    , {
      path: '*',
      name: 'Page404',
      component: Page404
    }, {
      path: "/richlist",
      name: "Richlist",
      component: Richlist
    },
    {
      path: "/exchanges",
      name: "Exchanges",
      component: Exchange
    }, {
      path: "/status",
      name: "Status",
      component: Status
    },{
      path: "/decoder",
      name: "Memo Decoder",
      component: Decoder
    },
  ]
})
