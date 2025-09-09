import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import HomePage from '@/pages/Home/Index.tsx'
import { lazy } from 'react'
import MobileView from '@/components/layouts/MobileView.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <MobileView>
        <Outlet />
      </MobileView>
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
  component: lazy(() => import('@/pages/Detail/Index.tsx')),
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'cart',
  component: lazy(() => import('@/pages/Cart/Index.tsx')),
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
