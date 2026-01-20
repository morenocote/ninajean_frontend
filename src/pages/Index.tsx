import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, Star, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { EstimateForm } from "@/components/forms/EstimateForm";
import {
  Paintbrush,
  Hammer,
  Home,
  Wrench,
  Layers,
  Fence,
  SquareStack,
  DoorOpen,
  Construction,
  Truck,
  Ruler,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// Project images
import kitchenProject from "@/assets/projects/kitchen-renovation.jpg";
import livingRoomProject from "@/assets/projects/living-room-painting.jpg";
import deckProject from "@/assets/projects/deck-installation.jpg";
import basementProject from "@/assets/projects/basement-renovation.jpg";
import bathroomProject from "@/assets/projects/bathroom-renovation.jpg";
import sidingProject from "@/assets/projects/siding-exterior.jpg";

const recentProjects = [
  { image: kitchenProject, title: "Kitchen Renovation", location: "Calgary, AB" },
  { image: livingRoomProject, title: "Interior Painting", location: "Airdrie, AB" },
  { image: deckProject, title: "Deck & Fence", location: "Calgary, AB" },
  { image: basementProject, title: "Basement Finishing", location: "Cochrane, AB" },
  { image: bathroomProject, title: "Bathroom Remodel", location: "Calgary, AB" },
  { image: sidingProject, title: "Siding Installation", location: "Okotoks, AB" },
];

const services = [
  { name: "Restoration Services", icon: Construction, href: "/services/restoration" },
  { name: "Painting", icon: Paintbrush, href: "/services/painting" },
  { name: "Concrete Services", icon: SquareStack, href: "/services/concrete" },
  { name: "Drywall & Taping", icon: Layers, href: "/services/drywall" },
  { name: "Flooring Installation", icon: Ruler, href: "/services/flooring" },
  { name: "Renovations", icon: Home, href: "/services/renovations" },
  { name: "Light Demolition", icon: Truck, href: "/services/demolition" },
  { name: "Finish Carpentry", icon: Hammer, href: "/services/carpentry" },
  { name: "Doors & Windows", icon: DoorOpen, href: "/services/doors-windows" },
  { name: "Siding & Exterior", icon: Wrench, href: "/services/siding" },
  { name: "Decks & Fences", icon: Fence, href: "/services/decks-fences" },
];

const whyChooseUs = [
  {
    title: "Local Calgary Company",
    description: "Based right here in Calgary, we understand the local climate and building codes.",
  },
  {
    title: "Fast & Clear Estimates",
    description: "Get transparent pricing with no hidden fees. We respond within 24-48 hours.",
  },
  {
    title: "Quality Workmanship",
    description: "Our experienced team delivers professional results on every project.",
  },
  {
    title: "Residential & Commercial",
    description: "We serve both homeowners and small businesses throughout Calgary.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Request an Estimate",
    description: "Fill out our simple form or give us a call. Tell us about your project.",
  },
  {
    step: "02",
    title: "We Review or Visit",
    description: "We'll review your request and schedule a site visit if needed.",
  },
  {
    step: "03",
    title: "Receive Your Quote",
    description: "Get a clear, detailed quote with no obligations or hidden costs.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Calgary, AB",
    text: "Ninajean did an amazing job on our basement renovation. Professional, on time, and the quality exceeded our expectations.",
    rating: 5,
  },
  {
    name: "David L.",
    location: "Airdrie, AB",
    text: "We hired them for interior painting and drywall repair. The team was respectful, clean, and delivered excellent results.",
    rating: 5,
  },
  {
    name: "Jennifer K.",
    location: "Calgary, AB",
    text: "Great experience from estimate to completion. They built us a beautiful deck that we enjoy every summer.",
    rating: 5,
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="container-custom relative z-10 flex min-h-[600px] items-center py-16 lg:min-h-[700px]">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <MapPin className="h-4 w-4" />
              Serving Calgary & Surrounding Areas
            </div>
            <h1 className="font-heading text-3xl font-bold leading-tight text-background sm:text-4xl md:text-5xl lg:text-6xl">
              Professional Maintenance & Renovation Services in Calgary, Alberta
            </h1>
            <p className="mt-6 text-lg text-background/80 md:text-xl">
              Reliable, high-quality construction and renovation solutions for homes and small
              businesses.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get a Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="tel:+14031234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Our Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              From minor repairs to complete renovations, we offer a comprehensive range of
              maintenance and construction services.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.name}
                to={service.href}
                className="card-elevated group flex items-center gap-4 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-foreground">{service.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Why Choose Ninajean?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              We're committed to delivering exceptional quality and service on every project.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Simple 3-Step Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              Getting started is easy. Here's how we work with you.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                {index < processSteps.length - 1 && (
                  <div className="absolute left-[60%] top-10 hidden h-0.5 w-[80%] bg-border md:block" />
                )}
                <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-body">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Our Recent Projects</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              Take a look at some of our completed work across Calgary.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-background translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm text-background/80">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body">
              We take pride in delivering quality work and excellent customer service.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card-elevated p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-body">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="overflow-hidden rounded-2xl bg-foreground">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="font-heading text-3xl font-bold text-background md:text-4xl">
                  Get Your Free Estimate Today
                </h2>
                <p className="mt-4 text-background/70">
                  Tell us about your project and we'll provide a detailed, no-obligation quote
                  within 24-48 hours.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-background/80">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Free, no-obligation estimates
                  </li>
                  <li className="flex items-center gap-3 text-background/80">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Response within 24-48 hours
                  </li>
                  <li className="flex items-center gap-3 text-background/80">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Transparent, upfront pricing
                  </li>
                </ul>
              </div>
              <div className="bg-background p-8 lg:p-12">
                <EstimateForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
