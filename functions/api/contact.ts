export const onRequestPost: PagesFunction = async (context) => {
  const { name, email, message } = await context.request.json()

  // Basic validation
  if (!name || !email || !message) {
    return new Response('Missing fields', { status: 400 })
  }

  const send = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: 'contact@eleppala.com' }],
        },
      ],
      from: {
        email: 'noreply@eleppala.com',
        name: 'Contact Form',
      },
      reply_to: {
        email: email,
        name: name,
      },
      subject: `Contact from ${name}`,
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        },
      ],
    }),
  })

  if (send.ok) {
    return new Response('OK', { status: 200 })
  } else {
    return new Response('Failed to send', { status: 500 })
  }
}