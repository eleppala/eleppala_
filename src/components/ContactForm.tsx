import { useState } from 'react'

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

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
        <div className="flex justify-between mb-1">
          <label htmlFor="name" className="block">Name</label>
          <span className="text-sm">{name.length}/100</span>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-500 border border-zinc-400 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <div className="flex justify-between mb-1">
            <label htmlFor="email" className="block mb-1">Email</label>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={254}
          className="w-full px-3 py-2 bg-zinc-500 border border-zinc-400 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <label htmlFor="message" className="block">Message</label>
          <span className="text-sm">{message.length}/5000</span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-500 border border-zinc-400 rounded focus:outline-none focus:border-primary"
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