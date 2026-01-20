import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, Award, Clock, Shield, Target, Heart, Briefcase } from "lucide-react";
import clientLogos from "@/assets/clients-logos.png";

const principles = [
  {
    icon: Clock,
    title: "Clear Planning",
    description: "Schedules tailored to each property and project",
  },
  {
    icon: Users,
    title: "Open Communication",
    description: "Transparent communication with clients at every stage",
  },
  {
    icon: Shield,
    title: "Quality Standards",
    description: "Consistent quality and safety, no matter the job size",
  },
];

const services = [
  "Cleaning services",
  "Painting",
  "Drywall and taping",
  "Flooring installation",
  "Finish carpentry",
  "Concrete services",
  "Light demolition",
  "Doors and windows",
  "Decks and fences",
  "Siding and exterior work",
  "Complete renovations and remodeling",
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
            About Ninajean Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Integrated cleaning, maintenance, restoration, and renovation services in Calgary.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Who We Are
            </h2>
            <div className="mt-6 space-y-4 text-body leading-relaxed">
              <p>
                Ninajean Services is a Calgary-based company delivering integrated cleaning, 
                maintenance, restoration, and renovation services for residential and small 
                commercial properties throughout the city and surrounding areas.
              </p>
              <p>
                We understand that a home or business is more than just a building—it's where 
                people live, work, and invest their resources. That's why we approach every 
                project with care, professionalism, and attention to detail, whether it involves 
                routine cleaning, property maintenance, structural work, or full renovations.
              </p>
              <p>
                By offering a wide range of services under one company, we help our clients 
                simplify projects, reduce coordination challenges, and ensure consistent quality 
                from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Our Philosophy</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              Our work is guided by three core principles that form the foundation of reliable 
              service and long-term client trust.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="card-elevated p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <principle.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm text-body">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Approach */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wider text-primary">
                  Our Expertise
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Our Services Approach
              </h2>
              <p className="mt-4 text-body">
                Our team has experience across a broad scope of services. Each project is managed 
                with a practical, hands-on approach to ensure efficiency, clean job sites, and 
                durable results.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-body">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-first lg:order-last">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Award className="mx-auto h-16 w-16 text-primary" />
                  <p className="mt-4 font-heading text-xl font-semibold">Quality First</p>
                  <p className="mt-2 text-sm text-body">Consistent standards on every project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Leadership
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Our Team</h2>
            <div className="mt-6 space-y-4 text-body leading-relaxed">
              <p>
                Ninajean Services is owned and operated by <strong>Ms. Tania Lopez</strong>, who 
                oversees operations and client relationships. With a strong background in accounting 
                and operations management, she brings a structured, detail-oriented approach to 
                every project.
              </p>
              <p>
                Ms. Lopez works closely with a trained and adaptable team of professionals who 
                follow established procedures and quality standards. This hands-on leadership 
                ensures consistency, accountability, and a high level of care for every client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Our Purpose
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Our Mission</h2>
            <p className="mt-6 text-lg text-body leading-relaxed">
              Our mission is to create safe, comfortable, and well-maintained spaces through 
              reliable cleaning, maintenance, restoration, and renovation services. We prioritize 
              customer satisfaction by combining flexible scheduling, clear processes, and 
              consistent workmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Trusted By
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Our Clients</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              We serve a diverse range of residential and small commercial clients across Calgary. 
              We treat every client and property with the same level of diligence, care, and 
              respect—regardless of project size.
            </p>
          </div>
          
          {/* Client Logos */}
          <div className="mt-12 flex justify-center">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <img 
                src={clientLogos} 
                alt="Our trusted clients including Cité des Rocheuses, Boston Pizza, The Metropolitan, Aragon Massage, Subaru, and Capitol Chevrolet" 
                className="max-w-full h-auto md:max-w-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body">
            Contact us today for a free, no-obligation estimate on your cleaning, maintenance, 
            or renovation project.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/contact">Get a Free Estimate</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
