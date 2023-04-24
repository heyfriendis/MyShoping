import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import Cart from "../components/Cart.vue";
import Shop from "../components/Shop.vue";
import Contact from "../components/Contact.vue";
import Items from "../components/Items.vue";
import Item from "../components/Item.vue";
import Search from "../components/Search.vue";
import Detail from "../components/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/register", component: Register },
  { path: "/cart", component: Cart },
  {
    path: "/shop",
    component: Shop,
    children: [
      {
        path: "/shop",
        redirect: "items",
      },
      {
        path: "items",
        component: Items,
      },
      {
        path: "item",
        component: Item,
      },
      {
        path: "search",
        component: Search,
      },
    ],
  },
  { path: "/contact", component: Contact },
  { path: "/detail", component: Detail },
];

const router = new VueRouter({
  routes,
});

export default router;
