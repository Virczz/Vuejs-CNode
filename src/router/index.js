import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const CnodeTopicList = () => import("../views/CnodeTopicList");
const CnodeDetail = () => import("../views/CnodeDetail");
const Cnode404 = () => import("../views/Cnode404");
const CnodeUser = () => import("../views/CnodeUser");
const CnodeMessages = () => import("../views/CnodeMessages");
const CnodeLogin = () => import("../views/CnodeLogin");
const CnodeSend = () => import("../views/CnodeSend");
const CnodeCollection = () => import("../views/CnodeCollection");

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/topics/all"
    },
    {
      path: "/topics/:tab",
      component: CnodeTopicList
    },
    {
      path: "/topic/:topicId",
      component: CnodeDetail
    },
    {
      path: "/user/:loginname",
      component: CnodeUser
    },
    {
      path: "/login",
      component: CnodeLogin
    },
    {
      path: "/message/:accesstoken",
      component: CnodeMessages
    },
    {
      path: "/send",
      component: CnodeSend
    },
    {
      path: "/collection/:loginname",
      component: CnodeCollection
    },
    {
      path: "/error",
      component: Cnode404
    },
    {
      path: "*",
      component: Cnode404
    }
  ]
});
