import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

// Project images
import projectKitchen from "@/assets/projects/project-kitchen.jpg";
import projectBasement from "@/assets/projects/project-basement.jpg";
import projectExteriorPainting from "@/assets/projects/project-exterior-painting.jpg";
import projectDeck from "@/assets/projects/project-deck.jpg";
import projectBathroom from "@/assets/projects/project-bathroom.jpg";
import projectDriveway from "@/assets/projects/project-driveway.jpg";
import projectInteriorPainting from "@/assets/projects/project-interior-painting.jpg";
import projectFence from "@/assets/projects/project-fence.jpg";
import projectFlooring from "@/assets/projects/project-flooring.jpg";

const projects = [
  {
    id: 1,
    title: "Kitchen Renovation",
    category: "Renovations",
    location: "Calgary NW",
    image: projectKitchen,
  },
  {
    id: 2,
    title: "Basement Development",
    category: "Renovations",
    location: "Airdrie",
    image: projectBasement,
  },
  {
    id: 3,
    title: "Exterior Painting",
    category: "Painting",
    location: "Calgary SW",
    image: projectExteriorPainting,
  },
  {
    id: 4,
    title: "Deck Construction",
    category: "Decks & Fences",
    location: "Cochrane",
    image: projectDeck,
  },
  {
    id: 5,
    title: "Bathroom Remodel",
    category: "Renovations",
    location: "Calgary SE",
    image: projectBathroom,
  },
  {
    id: 6,
    title: "Driveway Replacement",
    category: "Concrete",
    location: "Calgary NE",
    image: projectDriveway,
  },
  {
    id: 7,
    title: "Interior Painting",
    category: "Painting",
    location: "Okotoks",
    image: projectInteriorPainting,
  },
  {
    id: 8,
    title: "Fence Installation",
    category: "Decks & Fences",
    location: "Calgary NW",
    image: projectFence,
  },
  {
    id: 9,
    title: "Flooring Installation",
    category: "Flooring",
    location: "Chestermere",
    image: projectFlooring,
  },
];

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    title: string;
  } | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
            Our Projects
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Take a look at some of our completed work across Calgary and surrounding areas.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="card-elevated group overflow-hidden cursor-pointer"
                onClick={() =>
                  setSelectedImage({ image: project.image, title: project.title })
                }
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-3 font-heading text-base sm:text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-body">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 sm:right-6 sm:top-6 text-background hover:text-primary transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] overflow-hidden rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="h-auto max-h-[85vh] w-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 sm:p-6">
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-background">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="section-padding bg-section-alt">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold md:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-sm sm:text-base">
            Contact us today for a free estimate. Your project could be our next success story.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/contact">Get a Free Estimate</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
