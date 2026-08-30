import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Get In Touch</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
           ASK US ANYTHING
          </h1>
        
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 border border-[#E7E1D8] bg-white p-5">
              <Mail className="mt-1 text-[#fd6f93]" size={20} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#fd6f93]">Email Us</h4>
                <p className="mt-1 text-sm font-medium text-[#171412]">novara@example.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border border-[#E7E1D8] bg-white p-5">
              <Phone className="mt-1 text-[#fd6f93]" size={20} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#fd6f93]">Call Concierge</h4>
                <p className="mt-1 text-sm font-medium text-[#171412]">+1 (800) 555-NOVARA</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border border-[#E7E1D8] bg-white p-5">
              <MapPin className="mt-1 text-[#fd6f93]" size={20} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#fd6f93]">Headquarters</h4>
                <p className="mt-1 text-sm font-medium text-[#171412]">Fifth Avenue, Suite 1400, New York, NY</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl font-medium text-[#171412]">Send a Message</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#171412]">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full border border-[#E7E1D8] p-2.5 text-sm outline-none focus:border-[#fd6f93]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#171412]">Your Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1 w-full border border-[#E7E1D8] p-2.5 text-sm outline-none focus:border-[#fd6f93]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#171412]">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we assist you today?"
                  className="mt-1 w-full border border-[#E7E1D8] p-2.5 text-sm outline-none focus:border-[#fd6f93]"
                />
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 border border-[#171412] bg-[#171412] py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
              >
                <Send size={14} /> Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Map */}
        <div className="mt-12
         overflow-hidden border border-[#E7E1D8] bg-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14773.154137578934!2d90.3488!3d23.8289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c71b8d5e3e3d%3A0x1!2sGhoroia%20Mor%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-48 sm:h-64"
          />
        </div>

      </div>
    </main>
  );
}
