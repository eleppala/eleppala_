import { Link } from 'react-router-dom'
import DarkToggle from './DarkToggle'

function Topbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 px-4 py-4 z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl hover:text-primary">eleppala</Link>
        <div className="flex gap-2">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/build" className="hover:text-primary">Build</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <DarkToggle />
        </div>
      </div>
    </nav>
  )
}

export default Topbar