import {
  Link,
  useCanGoBack,
  useLocation,
  useRouter,
} from '@tanstack/react-router'
import { ArrowLeft, Home, Moon, Search, ShoppingCart, Sun } from 'lucide-react'
import usePrefStore from '@/stores/Pref.store.ts'

interface HeaderProps {
  title: string
  events?: {
    onSearch?: () => void
  }
}

export default function Header({ title, events }: HeaderProps) {
  const prefStore = usePrefStore()
  const router = useRouter()
  const hasBack = useCanGoBack()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const goBack = async () => {
    if (hasBack) {
      router.history.back()
    } else {
      await router.navigate({ to: '/' })
    }
  }
  const toggleUIMode = () => {
    const newMode = prefStore.uiMode === 'light' ? 'dark' : 'light'
    prefStore.setUIMode(newMode)
  }
  return (
    <header className="header">
      {!isHome && (
        <button className="btn btn-square" onClick={() => goBack()}>
          <i className="icon">
            <ArrowLeft />
          </i>
        </button>
      )}
      <h1 className="header-content">{title}</h1>
      <nav className="nav-list">
        <ul className="flex items-center gap-2">
          {isHome ? (
            <li
              className="nav-item"
              onClick={() => {
                if (events?.onSearch) events.onSearch()
              }}
            >
              <i className="icon">
                <Search />
              </i>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/">
                <i className="icon">
                  <Home />
                </i>
              </Link>
            </li>
          )}
          <li className="nav-item" onClick={() => toggleUIMode()}>
            <i className="icon">
              {prefStore.uiMode === 'light' ? <Sun /> : <Moon />}
            </i>
          </li>
          <li className="nav-item">
            <Link to="/cart">
              <i className="icon">
                <ShoppingCart />
              </i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
