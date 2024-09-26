import { createRouter, createWebHistory } from "vue-router";
import workers from "@/components/workers/workers.vue";
import loginCompany from "@/components/companies/login-company.vue";
import phones from "@/components/checks/phones.vue";
import spareParts from "@/components/spare-parts/spare-parts.vue";
import celForm from "@/components/checks/phone-entrance.vue";
import check_list from "@/components/checks/check_list.vue";
import listSpare from "@/components/spare-parts/spare-list.vue";
import spareCategories from "@/components/spare-parts/spare-categories.vue";
import session from "@/components/companies/session.vue";
import workersList from "@/components/workers/workers-list.vue";
import loginWorker from "@/components/workers/login-worker.vue";
import newWorker from "@/components/workers/new-worker.vue";
import worker from "@/components/workers/worker.vue";
import receivedList from "@/components/workers/received-list.vue";
import deliveriesList from "@/components/workers/deliveries-list.vue";
import repairsList from "@/components/workers/repairs-list.vue";
import workerEdit from "@/components/workers/worker-edit.vue";

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users",
    name: "usuarios",
    component: loginCompany
  },
  {
    path: "/session",
    name: "session",
    component: session
  },
  {
    path: "/workers",
    name: "workers",
    component: workers,
    children: [
      {
        path: "new-worker",
        component: newWorker
      },
      {
        path: "workers-list",
        component: workersList
      },
      {
        path: "worker-edit",
        component: workerEdit
      },
      {
        path: "login-worker",
        component: loginWorker
      },
      {
        path: "worker",
        component: worker,
        redirect: "/workers/worker/received-list",
        children:[
          {
            path: "received-list",
            component: receivedList
          },
          {
            path: "repairs-list",
            component: repairsList
          },
          {
            path: "deliveries-list",
            component: deliveriesList
          }
        ]
      }
    ]
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
    redirect: "/spareParts/list-spare",
    component: spareParts,
    children: [
      {
        path: "list-spare",
        component: listSpare,
      },
      {
        path: "spare-categories",
        component: spareCategories
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
