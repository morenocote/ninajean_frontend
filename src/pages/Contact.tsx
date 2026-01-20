import { Layout } from "@/components/layout/Layout";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Get in touch for a free estimate or to discuss your project with our team.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-3xl font-bold">Get in Touch</h2>
              <p className="mt-4 text-body">
                Have a question or ready to start your project? Reach out to us using any of the
                methods below, or fill out the form and we'll get back to you within 24-48 hours.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a
                      href="tel:+14031234567"
                      className="mt-1 block text-body hover:text-primary"
                    >
                      (403) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href="mailto:info@ninajean.ca"
                      className="mt-1 block text-body hover:text-primary"
                    >
                      info@ninajean.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Service Area</h3>
                    <p className="mt-1 text-body">
                      Calgary, Alberta & Surrounding Communities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <div className="mt-1 space-y-1 text-body">
                      <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                      <p>Saturday: 8:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
              <h2 className="font-heading text-2xl font-bold">Get Your Free Estimate</h2>
              <p className="mt-2 text-sm text-body">
                Tell us about your project and we'll provide a detailed, no-obligation quote.
              </p>
              <div className="mt-6">
                <EstimateForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
