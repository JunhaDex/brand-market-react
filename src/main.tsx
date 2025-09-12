import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/routes'
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'
import '@/assets/css/main.css'

dayjs.extend(customParse)
const TanStackQueryProviderContext = TanStackQueryProvider.getContext()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}
