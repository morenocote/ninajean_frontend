import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL, BASE_URL } from "@/config";

interface BlogPostData {
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/${slug}`);
        if (!response.ok) throw new Error('Artículo no encontrado');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <h1 className="font-heading text-3xl font-bold text-red-500">
            {error || 'Artículo no encontrado'}
          </h1>
          <p className="mt-4 text-muted-foreground">El artículo que buscas no existe o ha sido movido.</p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
        <img
          src={post.image.startsWith('/uploads/') ? `${BASE_URL}${post.image}` : post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </section>

      {/* Content */}
      <article className="container-custom relative z-10 -mt-24 pb-16">
        <div className="mx-auto max-w-3xl">
          {/* Header Card */}
          <div className="rounded-xl bg-card p-6 shadow-lg md:p-10">
            <nav className="mb-4 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{post.category}</span>
            </nav>

            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {post.category}
            </span>

            <h1 className="mt-4 font-heading text-2xl font-bold text-foreground md:text-4xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} de lectura</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="mt-8 prose prose-lg max-w-none text-muted-foreground">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-muted p-6 text-center md:p-10">
            <h3 className="font-heading text-xl font-bold md:text-2xl">
              ¿Necesitas Ayuda con tu Proyecto?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Nuestro equipo está listo para ayudarte con cualquier proyecto de renovación o mantenimiento.
            </p>
            <Button asChild className="mt-4" size="lg">
              <Link to="/contact">Obtener Presupuesto Gratis</Link>
            </Button>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center border-t border-border pt-8">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver Todos los Artículos
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
