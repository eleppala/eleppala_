import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <nav className="text-third px-6 py-4 bg-secondary">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">eleppala</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Topbar