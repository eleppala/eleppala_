import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="py-12 w-full max-w-md mx-auto space-y-6">
        <p >
          <strong>Interested in working together?</strong><br />
          Whether it’s a project, a job opportunity, or simple feedback — feel free to reach out.
        </p>

        <ContactForm />
      </div>
    </main>
  )
}

export default Contact