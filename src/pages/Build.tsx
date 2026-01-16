
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const postFiles: Record<string, string> = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw', import: 'default' })

const posts = Object.entries(postFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, content]) => {
    const lines = content.split('\n')
    const titleLine = lines.find(line => line.startsWith('## ')) || ''
    const title = titleLine.replace('## ', '')
    const body = lines.filter(line => !line.startsWith('## ')).join('\n')
    return { path, title, body }
  })

function Build() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (path: string) => {
    setExpanded(expanded === path ? null : path)
  }

  return (
    <main className="min-h-screen py-16 px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Build Log</h1>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.path} className="border-b border-zinc-700 pb-4">
            <button
              onClick={() => toggle(post.path)}
              className="text-left w-full text-xl font-semibold hover:text-primary"
            >
              {post.title} {expanded === post.path ? '−' : '+'}
            </button>
            {expanded === post.path && (
              <div className="mt-4">
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}

export default Build