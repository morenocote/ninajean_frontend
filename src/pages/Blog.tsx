import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { API_URL, BASE_URL } from "@/config";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom">
          <nav className="mb-4 text-sm text-primary-foreground/60">
            <Link to="/" className="hover:text-primary-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary-foreground">Blog</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
            Nuestro Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Consejos, tendencias y guías para el mantenimiento y renovación de tu hogar
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              {error}. Por favor, inténtalo de nuevo más tarde.
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No hay publicaciones disponibles en este momento.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image.startsWith('/uploads/') ? `${BASE_URL}${post.image}` : post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="mt-3 text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} de lectura</span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Leer más
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-muted py-16">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            ¿Te Gustó Nuestro Contenido?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Contáctanos para cualquier proyecto de renovación o mantenimiento que tengas en mente.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Obtener Presupuesto Gratis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
