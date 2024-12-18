import { createRouter, createWebHistory } from "vue-router";
import workers from "@/components/workers/workers.vue";
import loginCompany from "@/components/companies/login-company.vue";
import bills from "@/components/checks/bills.vue";
import spareParts from "@/components/spare-parts/spare-parts.vue";
import billEntrance from "@/components/checks/bill-entrance.vue";
import billList from "@/components/checks/bill-list.vue";
import listSpare from "@/components/spare-parts/spare-list.vue";
import spareCategories from "@/components/spare-parts/spare-categories.vue";
import session from "@/components/companies/session.vue";
import workersList from "@/components/workers/workers-list.vue";
import loginWorker from "@/components/workers/login-worker.vue";
import newWorker from "@/components/workers/new-worker.vue";
import worker from "@/components/workers/worker.vue";

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
        path: "login-worker",
        component: loginWorker
      },
      {
        path: "worker",
        component: worker
      }
    ]
  },
  {
    path: "/bills",
    name: "bills",
    redirect: "/bills/bill-entrance",
    component: bills,
    children: [
      {
        path: "bill-entrance",
        component: billEntrance,
      },
      {
        path: "bill-list",
        component: billList,
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
