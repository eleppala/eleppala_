import { useState } from 'react'

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-6 py-2 bg-primary text-secondary font-medium rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>
      {status === 'success' && <p className="text-primary">Message sent!</p>}
      {status === 'error' && <p className="text-red-500">Something went wrong. Try again.</p>}
    </form>
  )
}

export default ContactForm