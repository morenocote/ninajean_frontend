import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const services = [
  { name: "Restoration Services", href: "/services/restoration" },
  { name: "Painting", href: "/services/painting" },
  { name: "Concrete Services", href: "/services/concrete" },
  { name: "Drywall & Taping", href: "/services/drywall" },
  { name: "Flooring Installation", href: "/services/flooring" },
  { name: "Renovations & Remodeling", href: "/services/renovations" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { 
    name: "WhatsApp", 
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ), 
    href: "https://wa.me/14035551234?text=Hola!%20Me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios." 
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="gradient-primary">
        <div className="container-custom py-12 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/80">
            Get a free, no-obligation estimate for your maintenance or renovation project.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">Get a Free Estimate</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="tel:+14031234567" className="gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                alt="Nina Jean Maintenance Renovation Ltd" 
                className="h-16 w-auto bg-white rounded-lg p-1"
              />
            </Link>
            <p className="mt-4 text-sm text-background/70">
              Professional maintenance and renovation services in Calgary, Alberta. Quality
              workmanship you can trust.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+14031234567"
                className="flex items-center gap-3 text-sm text-background/70 hover:text-background"
              >
                <Phone className="h-4 w-4" />
                (403) 123-4567
              </a>
              <a
                href="mailto:info@ninajean.ca"
                className="flex items-center gap-3 text-sm text-background/70 hover:text-background"
              >
                <Mail className="h-4 w-4" />
                info@ninajean.ca
              </a>
              <p className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4" />
                Calgary, Alberta, Canada
              </p>
              <p className="flex items-center gap-3 text-sm text-background/70">
                <Clock className="h-4 w-4" />
                Mon - Sat: 7:00 AM - 6:00 PM
              </p>
            </div>
            {/* Social Media Icons */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-background">Our Services</h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-background/70 hover:text-background"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-sm font-medium text-primary hover:underline">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-background">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/70 hover:text-background">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-background">Service Areas</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-background/70">Calgary, AB</li>
              <li className="text-sm text-background/70">Airdrie</li>
              <li className="text-sm text-background/70">Cochrane</li>
              <li className="text-sm text-background/70">Okotoks</li>
              <li className="text-sm text-background/70">Chestermere</li>
            </ul>
            <Link
              to="/service-areas"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              View All Areas →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-background/60 md:text-left">
              © {new Date().getFullYear()} Ninajean Maintenance & Renovation. All rights reserved.
            </p>
            <p className="text-center text-sm text-background/60 md:text-right">
              Serving Calgary & Surrounding Areas
            </p>
          </div>
          {/* Created By Credit */}
          <div className="mt-4 text-center">
            <p className="text-sm text-background/50">
              Created by{" "}
              <a
                href="https://rcwinnovation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Rcw Innovation Inc
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
