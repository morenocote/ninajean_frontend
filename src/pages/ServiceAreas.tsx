import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, CheckCircle, Phone } from "lucide-react";

const areas = [
  {
    name: "Calgary",
    description: "Our home base. We serve all Calgary neighborhoods including NW, NE, SW, and SE quadrants.",
    primary: true,
  },
  {
    name: "Airdrie",
    description: "Fast response times for Airdrie residents just north of Calgary.",
    primary: false,
  },
  {
    name: "Cochrane",
    description: "Serving the growing Cochrane community west of Calgary.",
    primary: false,
  },
  {
    name: "Okotoks",
    description: "Quality service for Okotoks and the Foothills region south of Calgary.",
    primary: false,
  },
  {
    name: "Chestermere",
    description: "Reliable renovation services for Chestermere homeowners east of Calgary.",
    primary: false,
  },
  {
    name: "Surrounding Areas",
    description: "Contact us to discuss service availability for other communities near Calgary.",
    primary: false,
  },
];

const services = [
  "Restoration Services",
  "Interior & Exterior Painting",
  "Concrete Work",
  "Drywall & Taping",
  "Flooring Installation",
  "Complete Renovations",
  "Light Demolition",
  "Finish Carpentry",
  "Doors & Windows",
  "Siding & Exterior Work",
  "Decks & Fences",
];

export default function ServiceAreas() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
            Serving Calgary & Surrounding Areas
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Professional maintenance and renovation services throughout the Calgary region.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Where We Work
            </h2>
            <p className="mt-4 text-body">
              Ninajean Maintenance & Renovation proudly serves Calgary and nearby communities.
              As a local company, we understand the unique needs of our climate and building standards.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <div
                key={area.name}
                className={`card-elevated p-6 ${
                  area.primary ? "border-2 border-primary" : ""
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{area.name}</h3>
                </div>
                <p className="text-body">{area.description}</p>
                {area.primary && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    Primary Service Area
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Services Available in All Areas
              </h2>
              <p className="mt-4 text-body">
                We bring our full range of maintenance and renovation services to all the
                communities we serve. Whether you're in downtown Calgary or a surrounding town,
                you get the same quality work and professional service.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link to="/contact">Get a Free Estimate</Link>
                </Button>
              </div>
            </div>
            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-body">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Why Local Matters
            </h2>
            <p className="mt-4 text-body">
              Being based in Calgary means we understand the local environment, from our harsh
              winters to specific building codes. We're invested in our community and committed
              to building lasting relationships with our clients.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl bg-section-alt p-6">
                <h3 className="font-heading font-semibold">Fast Response</h3>
                <p className="mt-2 text-sm text-body">
                  Local presence means quicker scheduling and response times.
                </p>
              </div>
              <div className="rounded-xl bg-section-alt p-6">
                <h3 className="font-heading font-semibold">Climate Knowledge</h3>
                <p className="mt-2 text-sm text-body">
                  We know how to build for Calgary's unique weather challenges.
                </p>
              </div>
              <div className="rounded-xl bg-section-alt p-6">
                <h3 className="font-heading font-semibold">Community Trust</h3>
                <p className="mt-2 text-sm text-body">
                  Our reputation is built on serving our neighbors well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Not Sure If We Serve Your Area?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body">
            Contact us to discuss your project. We may be able to accommodate locations beyond
            our standard service area.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+14031234567" className="gap-2">
                <Phone className="h-5 w-5" />
                Call (403) 123-4567
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
