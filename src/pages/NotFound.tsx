import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <div className="font-mono">
          <p className="text-lg">
            <span className="text-red-500">bash: </span>
            page not found
          </p>
        </div>
        <h1 className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="text-foreground hover:text-primary"
        >
          cd ~
        </Link>
      </div>
    </main>
  )
}

export default NotFound
