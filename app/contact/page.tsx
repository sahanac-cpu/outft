import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Have a question or want to get in touch? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 flex justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
