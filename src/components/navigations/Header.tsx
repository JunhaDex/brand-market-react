import { Link } from '@tanstack/react-router'
import { Home, ShoppingCart, Sun } from 'lucide-react'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header-content">My Application</h1>
      <nav className="nav-list">
        <ul className="flex items-center gap-2">
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
