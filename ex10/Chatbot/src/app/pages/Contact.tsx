import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@aiassistant.com',
      link: 'mailto:support@aiassistant.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 AI Street, Tech Valley, CA 94000',
      link: null,
    },
  ];

  return (
    <div className="bg-[#343541] min-h-full">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#444654] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#10a37f] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-sm text-gray-300 hover:text-[#10a37f] transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-300">{info.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#444654] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Business Hours</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#444654] rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-[#10a37f] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 text-center">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#40414f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#10a37f] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#40414f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#10a37f] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#40414f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#10a37f] transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-[#40414f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#10a37f] transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      * Required fields
                    </p>
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#10a37f] hover:bg-[#0d8b6b] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Send Message
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-[#444654] rounded-lg p-8">
              <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-1">How quickly will I receive a response?</h3>
                  <p className="text-sm text-gray-300">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Do you offer phone support?</h3>
                  <p className="text-sm text-gray-300">
                    Yes, phone support is available for Pro and Enterprise customers during business hours.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Can I schedule a demo?</h3>
                  <p className="text-sm text-gray-300">
                    Absolutely! Mention "demo request" in your message and we'll arrange a personalized demonstration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
