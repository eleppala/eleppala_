import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md text-center space-y-4">
        <p className="text-gray-500">
          NOTE: This contact form is not in use.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}

export default Contact