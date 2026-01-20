import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, ArrowRight } from "lucide-react";

// Service images
import restorationImg from "@/assets/services/restoration.jpg";
import paintingImg from "@/assets/services/painting.jpg";
import concreteImg from "@/assets/services/concrete.jpg";
import drywallImg from "@/assets/services/drywall.jpg";
import flooringImg from "@/assets/services/flooring.jpg";
import renovationsImg from "@/assets/services/renovations.jpg";
import demolitionImg from "@/assets/services/demolition.jpg";
import carpentryImg from "@/assets/services/carpentry.jpg";
import doorsWindowsImg from "@/assets/services/doors-windows.jpg";
import sidingImg from "@/assets/services/siding.jpg";
import decksImg from "@/assets/services/decks.jpg";
import cleaningImg from "@/assets/services/cleaning.jpg";

// Service image mapping
const serviceImages: Record<string, string> = {
  restoration: restorationImg,
  painting: paintingImg,
  concrete: concreteImg,
  drywall: drywallImg,
  flooring: flooringImg,
  renovations: renovationsImg,
  demolition: demolitionImg,
  carpentry: carpentryImg,
  "doors-windows": doorsWindowsImg,
  siding: sidingImg,
  decks: decksImg,
  cleaning: cleaningImg,
};

interface ServiceData {
  title: string;
  metaTitle: string;
  description: string[];
  includes: string[];
  bestFor: string[];
  faqs: { question: string; answer: string }[];
}

const servicesData: Record<string, ServiceData> = {
  restoration: {
    title: "Restoration Services",
    metaTitle: "Restoration Services in Calgary",
    description: [
      "Our restoration services help Calgary homeowners and businesses recover from unexpected damage. Whether you're dealing with water damage, fire damage, or general wear and tear, our experienced team provides comprehensive restoration solutions.",
      "We work efficiently to minimize disruption to your daily life while ensuring thorough, quality repairs. From initial assessment to final finishing, we handle every aspect of the restoration process.",
      "Trust Ninajean to restore your property to its original condition—or better. We combine skilled craftsmanship with quality materials for lasting results.",
    ],
    includes: [
      "Water damage restoration and remediation",
      "Fire and smoke damage repair",
      "Structural repairs and reinforcement",
      "Mold assessment and remediation coordination",
      "Complete property restoration",
      "Insurance claim assistance",
    ],
    bestFor: [
      "Homeowners dealing with water or fire damage",
      "Property managers maintaining rental units",
      "Commercial buildings requiring restoration",
      "Older homes needing structural updates",
    ],
    faqs: [
      {
        question: "How quickly can you respond to restoration emergencies?",
        answer: "We understand that restoration needs are often urgent. Contact us and we'll arrange to assess your situation as quickly as possible, typically within 24-48 hours.",
      },
      {
        question: "Do you work with insurance companies?",
        answer: "Yes, we can provide detailed documentation and estimates that work with your insurance claim process. We're experienced in working alongside insurance adjusters.",
      },
      {
        question: "What areas do you serve for restoration services?",
        answer: "We provide restoration services throughout Calgary and surrounding communities including Airdrie, Cochrane, Okotoks, and Chestermere.",
      },
    ],
  },
  painting: {
    title: "Painting (Interior & Exterior)",
    metaTitle: "Painting Services in Calgary",
    description: [
      "Transform your Calgary home or business with our professional painting services. We deliver flawless results for both interior and exterior projects, using premium paints and proven techniques.",
      "Our skilled painters pay attention to every detail—from thorough surface preparation to clean, crisp lines. We protect your furniture and floors, and leave your space spotless when we're done.",
      "Whether you're refreshing a single room or repainting your entire property, Ninajean delivers beautiful, long-lasting results that enhance your property's value and appeal.",
    ],
    includes: [
      "Interior wall and ceiling painting",
      "Exterior house painting",
      "Cabinet and trim painting",
      "Surface preparation and repairs",
      "Color consultation assistance",
      "Deck and fence staining",
    ],
    bestFor: [
      "Homeowners updating their living spaces",
      "Landlords preparing units for new tenants",
      "Commercial spaces needing a fresh look",
      "Homes requiring exterior weather protection",
    ],
    faqs: [
      {
        question: "How long does a typical painting project take?",
        answer: "Timeline depends on the scope. A single room typically takes 1-2 days, while whole-house projects may take 1-2 weeks. We'll provide a detailed timeline with your estimate.",
      },
      {
        question: "Do you provide paint and materials?",
        answer: "Yes, we provide all paint and materials. We use high-quality, durable paints suited to Calgary's climate. We can also work with specific brands if you have preferences.",
      },
      {
        question: "Can you paint in winter?",
        answer: "Interior painting can be done year-round. For exterior work, we recommend warmer months when temperatures are consistently above 10°C for proper paint adhesion.",
      },
    ],
  },
  concrete: {
    title: "Concrete Services",
    metaTitle: "Concrete Services in Calgary",
    description: [
      "Ninajean provides comprehensive concrete services for Calgary properties. From new installations to repairs, we deliver durable, professional results that withstand our harsh Canadian winters.",
      "Our concrete work includes driveways, patios, walkways, steps, and foundation repairs. We use quality materials and proper techniques to ensure your concrete surfaces last for years.",
      "Trust our experienced team to handle your concrete project from start to finish, including proper grading, reinforcement, and finishing for a professional result.",
    ],
    includes: [
      "Driveway installation and replacement",
      "Patio and walkway construction",
      "Concrete steps and stairs",
      "Foundation crack repair",
      "Garage floor installation",
      "Decorative concrete options",
    ],
    bestFor: [
      "Homeowners replacing cracked driveways",
      "New construction concrete needs",
      "Backyard patio installations",
      "Commercial parking areas",
    ],
    faqs: [
      {
        question: "When is the best time to pour concrete in Calgary?",
        answer: "The ideal time is late spring through early fall when temperatures are consistently above 10°C. This ensures proper curing and long-term durability.",
      },
      {
        question: "How long before I can use my new driveway?",
        answer: "You can typically walk on new concrete after 24-48 hours. For vehicle traffic, we recommend waiting 7 days to allow proper curing.",
      },
      {
        question: "Do you remove old concrete?",
        answer: "Yes, we handle complete removal and disposal of old concrete as part of our replacement services. This is included in your project estimate.",
      },
    ],
  },
  drywall: {
    title: "Drywall & Taping",
    metaTitle: "Drywall & Taping Services in Calgary",
    description: [
      "Expert drywall installation and finishing services for Calgary homes and businesses. Whether you're finishing a basement, repairing damage, or building new walls, our team delivers smooth, professional results.",
      "We handle everything from hanging drywall to taping, mudding, and sanding. Our skilled finishers ensure seamless joints and perfectly smooth surfaces ready for paint.",
      "Count on Ninajean for drywall repairs of all sizes—from small holes to complete wall replacements. We match existing textures for invisible repairs.",
    ],
    includes: [
      "New drywall installation",
      "Drywall taping and mudding",
      "Ceiling drywall work",
      "Hole and crack repairs",
      "Texture matching and application",
      "Water damage drywall repair",
    ],
    bestFor: [
      "Basement development projects",
      "Renovation and remodeling work",
      "Damage repair after incidents",
      "New room additions",
    ],
    faqs: [
      {
        question: "Can you match my existing wall texture?",
        answer: "Yes, we're experienced in matching various textures including smooth, orange peel, knockdown, and stipple finishes for seamless repairs.",
      },
      {
        question: "How long does drywall installation take?",
        answer: "A standard basement takes 3-5 days for installation and finishing. Each coat of mud needs to dry before the next application, which extends the timeline.",
      },
      {
        question: "Do you handle the painting after drywall work?",
        answer: "Absolutely. We offer complete finishing services including priming and painting, so you get a fully finished result.",
      },
    ],
  },
  flooring: {
    title: "Flooring Installation",
    metaTitle: "Flooring Installation Services in Calgary",
    description: [
      "Transform your Calgary home with beautiful new flooring from Ninajean. We install all types of flooring including hardwood, laminate, vinyl, tile, and carpet with precision and care.",
      "Our installation process includes proper subfloor preparation, moisture barriers where needed, and clean, professional installation. We ensure your new floors look great and last for years.",
      "From modern vinyl plank to classic hardwood, we help you choose the right flooring for your lifestyle, budget, and design preferences.",
    ],
    includes: [
      "Hardwood floor installation",
      "Laminate and vinyl plank flooring",
      "Tile installation (ceramic and porcelain)",
      "Carpet installation",
      "Subfloor repair and preparation",
      "Flooring removal and disposal",
    ],
    bestFor: [
      "Home renovations and updates",
      "Basement development projects",
      "Replacing worn or damaged floors",
      "New construction finishing",
    ],
    faqs: [
      {
        question: "What type of flooring is best for Calgary homes?",
        answer: "It depends on the room and your needs. Engineered hardwood handles humidity changes well. Vinyl is great for moisture-prone areas. We'll help you choose the best option.",
      },
      {
        question: "Do you remove old flooring?",
        answer: "Yes, we handle complete removal and disposal of existing flooring as part of our installation service. This is factored into your estimate.",
      },
      {
        question: "How long before I can walk on new floors?",
        answer: "For most floating floors (laminate, vinyl), you can walk on them immediately. Tile requires 24-48 hours to set. Hardwood may need longer depending on the finish.",
      },
    ],
  },
  renovations: {
    title: "Renovations & Remodeling",
    metaTitle: "Renovations & Remodeling Services in Calgary",
    description: [
      "Complete renovation and remodeling services for Calgary homeowners. Whether you're updating a kitchen, renovating a bathroom, or finishing a basement, Ninajean manages your project from start to finish.",
      "We coordinate all aspects of your renovation including demolition, framing, electrical, plumbing coordination, drywall, flooring, and finishing. One team, one point of contact, quality results.",
      "Our experienced team works with you to bring your vision to life while staying on budget and timeline. We handle permits, inspections, and ensure all work meets Calgary building codes.",
    ],
    includes: [
      "Kitchen renovations and updates",
      "Bathroom remodeling",
      "Basement development and finishing",
      "Whole-home renovations",
      "Room additions",
      "Accessibility modifications",
    ],
    bestFor: [
      "Homeowners updating dated spaces",
      "Growing families needing more room",
      "Investment property improvements",
      "Aging-in-place modifications",
    ],
    faqs: [
      {
        question: "Do you handle permits for renovations?",
        answer: "Yes, we coordinate permit applications and inspections for projects that require them. We ensure all work meets Calgary building codes and regulations.",
      },
      {
        question: "How long does a typical kitchen renovation take?",
        answer: "A complete kitchen renovation typically takes 4-8 weeks depending on scope and complexity. We provide a detailed timeline before starting work.",
      },
      {
        question: "Can I stay in my home during renovations?",
        answer: "In most cases, yes. We work to minimize disruption and can phase the work to keep essential areas functional. We'll discuss the best approach for your project.",
      },
    ],
  },
  demolition: {
    title: "Light Demolition",
    metaTitle: "Light Demolition Services in Calgary",
    description: [
      "Safe and efficient light demolition services for Calgary renovation projects. We carefully remove walls, fixtures, flooring, and other elements to prepare your space for renovation.",
      "Our demolition team works cleanly and safely, protecting areas not being demolished and properly disposing of all debris. We're experienced in identifying load-bearing walls and other structural elements.",
      "Whether you're opening up a floor plan, removing old fixtures, or preparing for a major renovation, Ninajean handles demolition work professionally and efficiently.",
    ],
    includes: [
      "Interior wall removal",
      "Fixture and cabinet removal",
      "Flooring removal",
      "Ceiling removal",
      "Debris hauling and disposal",
      "Site preparation for renovation",
    ],
    bestFor: [
      "Pre-renovation preparation",
      "Opening floor plans",
      "Removing outdated fixtures",
      "Preparing for new finishes",
    ],
    faqs: [
      {
        question: "Can you identify load-bearing walls?",
        answer: "Yes, our team is experienced in identifying load-bearing structures. For major structural changes, we coordinate with engineers when required.",
      },
      {
        question: "What happens to the demolition debris?",
        answer: "We handle all debris removal and proper disposal. Recyclable materials are diverted from landfills when possible.",
      },
      {
        question: "Do you handle asbestos or hazardous materials?",
        answer: "We can identify potential hazardous materials, but specialized contractors must handle actual asbestos or hazmat removal. We can coordinate this if needed.",
      },
    ],
  },
  carpentry: {
    title: "Finish Carpentry",
    metaTitle: "Finish Carpentry Services in Calgary",
    description: [
      "Elevate your Calgary home with expert finish carpentry from Ninajean. We specialize in the detailed woodwork that adds character and value—trim, moldings, built-ins, and custom features.",
      "Our skilled carpenters deliver precision work with clean lines and tight joints. From classic crown molding to modern minimalist trim, we execute your vision with craftsmanship and care.",
      "Whether you're finishing a renovation or adding custom features to your home, our finish carpentry brings the polish and detail that makes a house feel complete.",
    ],
    includes: [
      "Crown molding installation",
      "Baseboard and trim work",
      "Wainscoting and wall paneling",
      "Custom built-in shelving",
      "Interior door casing",
      "Custom closet systems",
    ],
    bestFor: [
      "Home finishing and upgrades",
      "Custom storage solutions",
      "Adding architectural detail",
      "Renovation finishing touches",
    ],
    faqs: [
      {
        question: "Can you match existing trim in my home?",
        answer: "Yes, we can match most existing trim profiles. For older or custom profiles, we can often source or mill matching pieces.",
      },
      {
        question: "Do you do custom built-ins?",
        answer: "Absolutely. We design and build custom shelving, entertainment units, window seats, and other built-in features tailored to your space.",
      },
      {
        question: "What wood species do you work with?",
        answer: "We work with a variety of materials including pine, oak, maple, MDF, and more. We'll help you choose the best material for your project and budget.",
      },
    ],
  },
  "doors-windows": {
    title: "Doors & Windows Installation",
    metaTitle: "Doors & Windows Installation in Calgary",
    description: [
      "Professional door and window installation services for Calgary homes and businesses. We install interior doors, entry doors, patio doors, and windows of all types.",
      "Proper installation is critical for energy efficiency, security, and appearance. Our installers ensure weathertight seals, proper alignment, and clean finishing for every opening.",
      "Whether you're upgrading to energy-efficient windows, replacing a worn entry door, or installing new interior doors during a renovation, Ninajean delivers quality installation.",
    ],
    includes: [
      "Entry door installation",
      "Interior door installation",
      "Window replacement",
      "Patio and sliding doors",
      "Door hardware installation",
      "Weatherstripping and sealing",
    ],
    bestFor: [
      "Upgrading to energy-efficient windows",
      "Replacing worn or damaged doors",
      "Improving home security",
      "Renovation finishing",
    ],
    faqs: [
      {
        question: "How long does window replacement take?",
        answer: "Most window replacements take 30-60 minutes per window. A typical home can be completed in 1-2 days depending on the number of windows.",
      },
      {
        question: "Do you dispose of old doors and windows?",
        answer: "Yes, removal and disposal of old units is included in our service. We ensure proper cleanup and disposal.",
      },
      {
        question: "Can you install doors and windows in winter?",
        answer: "Yes, we can work year-round. We take extra precautions in cold weather to maintain your home's temperature and ensure proper installation.",
      },
    ],
  },
  siding: {
    title: "Siding & Exterior Work",
    metaTitle: "Siding & Exterior Services in Calgary",
    description: [
      "Protect and beautify your Calgary property with professional siding and exterior services from Ninajean. We install, repair, and replace siding, fascia, soffit, and other exterior elements.",
      "Calgary's climate demands quality materials and proper installation. We use weather-resistant products and proven techniques to ensure your exterior stands up to our winters.",
      "From vinyl and fiber cement to wood and aluminum, we work with all siding types to give your home the curb appeal and protection it deserves.",
    ],
    includes: [
      "Vinyl siding installation",
      "Fiber cement siding",
      "Fascia and soffit work",
      "Siding repair and replacement",
      "Exterior trim finishing",
      "Caulking and weatherproofing",
    ],
    bestFor: [
      "Updating home exteriors",
      "Repairing storm damage",
      "Improving energy efficiency",
      "Increasing curb appeal",
    ],
    faqs: [
      {
        question: "What siding material is best for Calgary?",
        answer: "Vinyl and fiber cement are popular for Calgary's climate—they're durable, low-maintenance, and handle temperature swings well. We'll help you choose the best option.",
      },
      {
        question: "Can you work on the exterior year-round?",
        answer: "We can do exterior work in milder temperatures. For optimal results, we recommend scheduling major siding projects for spring through fall.",
      },
      {
        question: "Do you replace just damaged sections?",
        answer: "Yes, we can repair or replace damaged sections without redoing the entire exterior. We work to match existing materials as closely as possible.",
      },
    ],
  },
  "decks-fences": {
    title: "Decks & Fences",
    metaTitle: "Deck & Fence Services in Calgary",
    description: [
      "Create your perfect outdoor living space with custom deck and fence construction from Ninajean. We design and build beautiful, functional outdoor structures for Calgary homes.",
      "From simple cedar decks to composite multi-level designs, we build outdoor spaces that extend your living area and increase your property value. Our fences provide privacy, security, and curb appeal.",
      "We use quality materials suited to Calgary's climate and build to last. Trust our experienced team to create outdoor spaces you'll enjoy for years to come.",
    ],
    includes: [
      "Custom deck design and construction",
      "Composite and wood deck options",
      "Privacy and decorative fencing",
      "Deck repairs and refinishing",
      "Railings and stairs",
      "Pergolas and outdoor structures",
    ],
    bestFor: [
      "Creating outdoor entertainment spaces",
      "Adding privacy to your yard",
      "Replacing aging decks or fences",
      "Increasing property value",
    ],
    faqs: [
      {
        question: "Wood or composite—which is better?",
        answer: "Wood costs less upfront and has a natural look. Composite costs more initially but requires less maintenance and lasts longer. We'll help you weigh the options.",
      },
      {
        question: "Do you need a permit to build a deck in Calgary?",
        answer: "Most decks require a permit in Calgary. We handle the permit process and ensure your deck meets all building codes and regulations.",
      },
      {
        question: "How long does deck construction take?",
        answer: "A typical deck takes 3-7 days to build depending on size and complexity. We provide a timeline with your estimate.",
      },
    ],
  },
  cleaning: {
    title: "Cleaning Services",
    metaTitle: "Cleaning Services in Calgary",
    description: [
      "Keep your Calgary home or business spotless with professional cleaning services from Ninajean. We provide thorough, reliable cleaning for residential and commercial properties.",
      "Our cleaning team is trained, professional, and detail-oriented. Whether you need regular maintenance cleaning, deep cleaning, or post-construction cleanup, we deliver consistently excellent results.",
      "We use quality cleaning products and proven techniques to ensure every surface is sanitized and sparkling. Trust Ninajean to maintain a clean, healthy environment for your family or employees.",
    ],
    includes: [
      "Regular house cleaning",
      "Deep cleaning services",
      "Move-in/move-out cleaning",
      "Post-construction cleanup",
      "Commercial office cleaning",
      "Window and surface cleaning",
    ],
    bestFor: [
      "Busy homeowners needing regular cleaning",
      "Property managers between tenants",
      "Post-renovation cleanup",
      "Commercial spaces requiring maintenance",
    ],
    faqs: [
      {
        question: "Do you bring your own cleaning supplies?",
        answer: "Yes, we bring all necessary cleaning supplies and equipment. If you have preferences for specific products (eco-friendly, hypoallergenic), let us know and we can accommodate.",
      },
      {
        question: "How often should I schedule cleaning?",
        answer: "It depends on your needs. Most residential clients prefer weekly or bi-weekly cleaning. We also offer one-time deep cleaning or monthly maintenance options.",
      },
      {
        question: "Are your cleaners insured?",
        answer: "Yes, all our cleaning staff are fully insured and background-checked for your peace of mind and security.",
      },
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !servicesData[slug]) {
    return <Navigate to="/services" replace />;
  }

  const service = servicesData[slug];

  return (
    <Layout>
      {/* Hero with Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={serviceImages[slug]}
            alt={service.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        {/* Content */}
        <div className="container-custom relative z-10 py-20 md:py-32">
          <nav className="mb-4 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl lg:text-6xl max-w-3xl">
            {service.metaTitle}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            {service.description[0].substring(0, 150)}...
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="space-y-4">
                {service.description.map((paragraph, index) => (
                  <p key={index} className="text-body leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* What's Included */}
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold">What This Service Includes</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold">Best For</h2>
                <ul className="mt-4 space-y-2">
                  {service.bestFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold">Our Process</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { step: "1", title: "Request an Estimate", desc: "Fill out our form or call us" },
                    { step: "2", title: "We Review", desc: "Site visit if needed" },
                    { step: "3", title: "Get Your Quote", desc: "Clear, detailed pricing" },
                  ].map((item) => (
                    <div key={item.step} className="rounded-xl bg-section-alt p-5 text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-body">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="mt-4">
                  {service.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-body">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-heading text-xl font-bold">
                  Get an Estimate for This Service
                </h3>
                <p className="mt-2 text-sm text-body">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>
                <div className="mt-6">
                  <EstimateForm preselectedService={service.title} compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
