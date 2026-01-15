export const onRequestPost: PagesFunction = async (context) => {
  const { name, email, message } = await context.request.json()

  // Basic validation
  if (!name || !email || !message) {
    return new Response('Missing fields', { status: 400 })
  }

  const resendApiKey = context.env.RES_AK

  if (!resendApiKey) {
    return new Response('Server configuration error', { status: 500 })
  }

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'Contact Form <noreply@eleppala.com>',
      to: 'contact@eleppala.com',
      reply_to: email,
      subject: `Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  })

  if (send.ok) {
    return new Response('OK', { status: 200 })
  } else {
    return new Response('Failed to send', { status: 500 })
  }
}