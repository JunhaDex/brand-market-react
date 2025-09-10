import { Link } from '@tanstack/react-router'
import { Home, Search, ShoppingCart, Sun } from 'lucide-react'

interface HeaderProps {
  events?: {
    onSearch?: () => void
  }
}

export default function Header({ events }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-content">My Application</h1>
      <nav className="nav-list">
        <ul className="flex items-center gap-2">
          <li
            className="nav-item"
            onClick={() => {
              if (events?.onSearch) events?.onSearch()
            }}
          >
            <i className="icon">
              <Search />
            </i>
          </li>
          <li className="nav-item">
            <Link to="/">
              <i className="icon">
                <Home />
              </i>
            </Link>
          </li>
          <li className="nav-item">
            <i className="icon">
              <Sun />
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
