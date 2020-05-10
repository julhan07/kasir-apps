import {
  PenggunaPage,
  RolePage,
  PaymentTypePage,
  MasterPoskoPage,
  BerandaPage,
  PaymentPage,
  BudgetTypePage,
  BudgetPage,
  ArusKasPage,
  LabaRugi,
} from "./pages";

const routes = [
  {
    path: "/pengguna",
    name: "pengguna",
    component: PenggunaPage,
  },
  {
    path: "/payments",
    name: "Payments",
    component: PaymentPage,
  },
  {
    path: "/role",
    name: "Master Role",
    component: RolePage,
  },
  {
    path: "/tipe-pembayaran",
    name: "Tipe Pembayaran",
    component: PaymentTypePage,
  },
  {
    path: "/produk",
    name: "Master Produk",
    component: MasterPoskoPage,
  },
  {
    path: "/type-budget",
    name: "Master Tipe Budget",
    component: BudgetTypePage,
  },
  {
    path: "/budget",
    name: "",
    component: BudgetPage,
  },
  {
    path: "/arus-kas",
    name: "",
    component: ArusKasPage,
  },
  {
    path: "/labarugi",
    name: "",
    component: LabaRugi,
  },

  {
    exact: true,
    path: "/",
    name: "Beranda",
    component: BerandaPage,
  },
];

export default routes;
