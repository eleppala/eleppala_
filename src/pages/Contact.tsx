import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="py-12 w-full max-w-md  space-y-6">
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