import { createRouter, createWebHistory } from "vue-router";
import tecnicos from "@/components/tecnicos.vue";
import users from "@/components/users.vue";
import phones from "@/components/phones.vue";
import spareParts from "@/components/spare-parts.vue";
import celForm from "@/components/cel-entrance.vue";
import check_list from "@/components/check_list.vue";
import listSpare from "@/components/list-spare.vue";

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users",
    name: "usuarios",
    component: users,
  },
  {
    path: "/tec",
    name: "tecnicos",
    component: tecnicos,
  },
  {
    path: "/phones",
    name: "phones",
    redirect: "/phones/cel-form",
    component: phones,
    children: [
      {
        path: "cel-form",
        component: celForm,
      },
      {
        path: "check-list",
        component: check_list,
      },
    ],
  },
  {
    path: "/spareParts",
    name: "repuestos",
    component: spareParts,
    children: [
      {
        path: "list-spare",
        component: listSpare,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
