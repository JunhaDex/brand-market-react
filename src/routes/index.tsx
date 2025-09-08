import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import HomePage from '@/pages/Home/Index.tsx'
import DetailPage from '@/pages/Detail/Index.tsx'
import CartPage from '@/pages/Cart/Index.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'product/$id',
  component: DetailPage,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'cart',
  component: CartPage,
})

const routeTree = rootRoute.addChildren([indexRoute, detailRoute, cartRoute])
export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})
