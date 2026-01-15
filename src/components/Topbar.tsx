import { Link } from 'react-router-dom'
import DarkToggle from './DarkToggle'

function Topbar() {
  return (
    <nav className="px-6 py-4 ">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl hover:text-primary">eleppala</Link>
        <div className="flex gap-6">
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