import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/administrative',
      children: [
        {
          path: 'product-categories',
          component: defineAsyncComponent(() => import('@/views/administrative/productCategory/ProductCategoryView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: 'suppliers',
          component: defineAsyncComponent(() => import('@/views/administrative/supplier/SupplierView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: 'menu-categories',
          component: defineAsyncComponent(() => import('@/views/administrative/menuCategory/MenuCategoryView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: 'tables',
          component: defineAsyncComponent(() => import('@/views/administrative/table/TableView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: 'rooms',
          component: defineAsyncComponent(() => import('@/views/administrative/room/RoomView.vue')),
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '/stock',
      children: [
        {
          path: 'products',
          component: defineAsyncComponent(() => import('@/views/Stock/Product/ProductView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: "purchase-requisitions",
          component: defineAsyncComponent(() => import('@/views/Stock/PurchaseRequisition/PurchaseRequisitionView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: "stock-movements",
          component: defineAsyncComponent(() => import('@/views/Stock/StockMovment/StockMovmentView.vue')),
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '/menu',
      children: [
        {
          path: ':tableId?',
          component: defineAsyncComponent(() => import('@/views/menu/Menu/MenuView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: 'items',
          component: defineAsyncComponent(() => import('@/views/menu/MenuItem/MenuItemView.vue')),
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '/settings',
      children: [
        {
          path: 'users',
          component: defineAsyncComponent(() => import('@/views/configuration/User/UserView.vue')),
          meta: {requiresAuth: true}
        },
        {
          path: 'restaurants',
          component: defineAsyncComponent(() => import('@/views/administrative/restaurant/RestaurantView.vue')),
          meta: {requiresAuth: true}
        },
      ]
    },
    {
      path: '/orders',
      children: [
        {
          path: '',
          component: defineAsyncComponent(() => import('@/views/orders/orders/OrderView.vue')),
          name: 'orders',
          meta: {requiresAuth: true}
        },
        {
          path: 'history',
          component: defineAsyncComponent(() => import('@/views/orders/history/OrderHistoryView.vue')),
          meta: {requiresAuth: true},
          name: 'history'
        },
        {
          path: 'tables/:orderId?',
          component: defineAsyncComponent(() => import('@/views/orders/tables/tableOrderView.vue')),
          meta: {requiresAuth: true},
          name: 'table-orders'
        },
        {
          path: "reservations",
          component: defineAsyncComponent(() => import("@/views/orders/reservation/reservationView.vue")),
          meta: {requiresAuth: true},
          name: "reservation"
        }
      ]
    },
    {
      path: '/admin',
      children: [
        {
          path: 'restaurant-chain',
          name: 'restaurantChain',
          component: defineAsyncComponent(() => import('@/views/admin/restaurantChain/RestaurantChainView.vue')),
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '/',
      component: defineAsyncComponent(() => import('@/views/home/homeView.vue')),
      meta: {requiresAuth: true},
      name: 'home'
    },
    {
      path: '/login',
      component: defineAsyncComponent(() => import('@/views/auth/LoginView.vue')),
      meta: {guest: true},
      name: 'login'
    },
    {
      path: '/register',
     children:[
      {
        path: "",
        component: defineAsyncComponent(() => import('@/views/register/registerView.vue')),
        name: 'register',
        meta: {guest: true}
      },
      {
        path: "confirmation/:token",
        component: defineAsyncComponent(() => import('@/views/register/confirmation/registerConfirmationView.vue')),
        meta: {guest: true},
        name: 'register_confirmation'
      }
     ]
    }
  ],
})

export default router
