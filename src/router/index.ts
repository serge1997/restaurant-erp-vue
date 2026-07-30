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
          component: defineAsyncComponent(() => import('@/views/administrative/productCategory/ProductCategoryView.vue'))
        },
        {
          path: 'suppliers',
          component: defineAsyncComponent(() => import('@/views/administrative/supplier/SupplierView.vue'))
        },
        {
          path: 'menu-categories',
          component: defineAsyncComponent(() => import('@/views/administrative/menuCategory/MenuCategoryView.vue'))
        },
        {
          path: 'tables',
          component: defineAsyncComponent(() => import('@/views/administrative/table/TableView.vue'))
        },
        {
          path: 'rooms',
          component: defineAsyncComponent(() => import('@/views/administrative/room/RoomView.vue'))
        }
      ]
    },
    {
      path: '/stock',
      children: [
        {
          path: 'products',
          component: defineAsyncComponent(() => import('@/views/Stock/Product/ProductView.vue')),
        },
        {
          path: "purchase-requisitions",
          component: defineAsyncComponent(() => import('@/views/Stock/PurchaseRequisition/PurchaseRequisitionView.vue'))
        }, 
        {
          path: "stock-movements",
          component: defineAsyncComponent(() => import('@/views/Stock/StockMovment/StockMovmentView.vue'))
        }
      ]
    },
    {
      path: '/menu',
      children: [
        {
          path: ':tableId?',
          component: defineAsyncComponent(() => import('@/views/menu/Menu/MenuView.vue'))
        },
        {
          path: 'items',
          component: defineAsyncComponent(() => import('@/views/menu/MenuItem/MenuItemView.vue'))
        }
      ]
    },
    {
      path: '/settings',
      children: [
        {
          path: 'users',
          component: defineAsyncComponent(() => import('@/views/configuration/User/UserView.vue'))
        },
        {
          path: 'restaurants',
          component: defineAsyncComponent(() => import('@/views/administrative/restaurant/RestaurantView.vue'))
        },
      ]
    },
    {
      path: '/orders',
      children: [
        {
          path: '',
          component: defineAsyncComponent(() => import('@/views/orders/orders/OrderView.vue')),
          name: 'orders'
        },
        {
          path: 'history',
          component: defineAsyncComponent(() => import('@/views/orders/history/OrderHistoryView.vue')),
          name: 'history'
        },
        {
          path: 'tables/:orderId?',
          component: defineAsyncComponent(() => import('@/views/orders/tables/tableOrderView.vue')),
          name: 'table-orders'
        }
      ]
    },
    {
      path: '/admin',
      children: [
        {
          path: 'restaurant-chain',
          name: 'restaurantChain',
          component: defineAsyncComponent(() => import('@/views/admin/restaurantChain/RestaurantChainView.vue'))
        }
      ]
    },
    {
      path: '/',
      component: defineAsyncComponent(() => import('@/views/home/homeView.vue')),
      name: 'HomeView'
    },
    {
      path: '/login',
      component: defineAsyncComponent(() => import('@/views/auth/LoginView.vue')),
      name: 'login'
    },
    {
      path: '/register',
     children:[
      {
        path: "",
        component: defineAsyncComponent(() => import('@/views/register/registerView.vue')),
        name: 'register'
      },
      {
        path: "confirmation/:token",
        component: defineAsyncComponent(() => import('@/views/register/confirmation/registerConfirmationView.vue')),
        name: 'register_confirmation'
      }
     ]
    }
  ],
})

export default router
