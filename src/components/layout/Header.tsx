import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpeg";

const services = [
  { name: "Restoration Services", href: "/services/restoration" },
  { name: "Painting", href: "/services/painting" },
  { name: "Concrete Services", href: "/services/concrete" },
  { name: "Drywall & Taping", href: "/services/drywall" },
  { name: "Flooring Installation", href: "/services/flooring" },
  { name: "Renovations & Remodeling", href: "/services/renovations" },
  { name: "Light Demolition", href: "/services/demolition" },
  { name: "Finish Carpentry", href: "/services/carpentry" },
  { name: "Doors & Windows", href: "/services/doors-windows" },
  { name: "Siding & Exterior", href: "/services/siding" },
  { name: "Decks & Fences", href: "/services/decks-fences" },
  { name: "Cleaning Services", href: "/services/cleaning" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Projects", href: "/projects" },
  { name: "About Us", href: "/about" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src={logo} 
              alt="Nina Jean Maintenance Renovation Ltd" 
              className="h-12 w-auto md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) =>
                  item.hasDropdown ? (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                          isActive(item.href) && "text-primary"
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2">
                          <li className="col-span-2 mb-2">
                            <NavigationMenuLink asChild>
                              <Link
                                to="/services"
                                className="block rounded-md bg-secondary p-4 font-medium hover:bg-secondary/80"
                              >
                                <span className="font-heading text-lg">All Services</span>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  View our complete range of services
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {services.map((service) => (
                            <li key={service.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={service.href}
                                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                                >
                                  {service.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                          isActive(item.href) && "text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" size="sm" asChild>
              <a href="tel:+14031234567" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">Call Now</span>
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link to="/contact">Get a Free Estimate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="default" size="sm" asChild>
              <a href="tel:+14031234567">
                <Phone className="h-4 w-4" />
              </a>
            </Button>
            <button
              type="button"
              className="rounded-md p-2 text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border pb-4 lg:hidden">
            <nav className="mt-4 space-y-1">
              {navigation.map((item) =>
                item.hasDropdown ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium hover:bg-muted",
                        isActive(item.href) && "text-primary"
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="mt-1 space-y-1 pl-4">
                        <Link
                          to="/services"
                          className="block rounded-md px-4 py-2 text-sm font-medium text-primary hover:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Services
                        </Link>
                        {services.map((service) => (
                          <Link
                            key={service.name}
                            to={service.href}
                            className="block rounded-md px-4 py-2 text-sm hover:bg-muted"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block rounded-md px-4 py-3 text-base font-medium hover:bg-muted",
                      isActive(item.href) && "text-primary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
            <div className="mt-4 px-4">
              <Button className="w-full" size="lg" asChild>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get a Free Estimate
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
