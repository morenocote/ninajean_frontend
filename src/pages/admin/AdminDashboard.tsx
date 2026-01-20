import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    LogOut,
    Plus,
    Loader2,
    Trash2,
    Edit,
    X,
    Save,
    CheckCircle,
    Filter,
    Calendar as CalendarIcon
} from "lucide-react";
import { API_URL, BASE_URL } from "@/config";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"blogs" | "quotes">("blogs");
    const [blogs, setBlogs] = useState<any[]>([]);
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        date: new Date().toISOString().split('T')[0],
        readTime: "5 min",
        category: "Renovaciones"
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Quote Filters
    const [quoteFilters, setQuoteFilters] = useState({
        status: "all",
        date: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const blogsRes = await fetch(`${API_URL}/blogs`);
            const blogsData = await blogsRes.json();
            setBlogs(blogsData);

            const token = localStorage.getItem("adminToken");
            const quotesRes = await fetch(`${API_URL}/quotes`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const quotesData = await quotesRes.json();
            setQuotes(quotesData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
    };

    const deleteBlog = async (id: number) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${API_URL}/blogs/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenModal = (blog: any = null) => {
        setSelectedFile(null);
        if (blog) {
            setEditingBlog(blog);
            setImagePreview(blog.image && blog.image.startsWith('/uploads/') ? `${BASE_URL}${blog.image}` : blog.image);
            setFormData({
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.excerpt,
                content: blog.content,
                image: blog.image,
                date: blog.date.split('T')[0],
                readTime: blog.readTime,
                category: blog.category
            });
        } else {
            setEditingBlog(null);
            setImagePreview("");
            setFormData({
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                image: "",
                date: new Date().toISOString().split('T')[0],
                readTime: "5 min",
                category: "Renovaciones"
            });
        }
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from title if title changes and no custom slug is set
            ...(name === "title" && !editingBlog ? { slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') } : {})
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 250 * 1024) {
                alert("La imagen es demasiado pesada (máximo 250KB)");
                e.target.value = "";
                return;
            }
            if (!file.type.startsWith("image/")) {
                alert("Por favor selecciona un archivo de imagen");
                e.target.value = "";
                return;
            }
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const updateQuoteStatus = async (id: number, newStatus: string) => {
        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${API_URL}/quotes/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Error updating status");
        }
    };

    const filteredQuotes = quotes.filter(quote => {
        const matchesStatus = quoteFilters.status === "all" || quote.status === quoteFilters.status;
        const matchesDate = !quoteFilters.date || new Date(quote.created_at).toISOString().split('T')[0] === quoteFilters.date;
        return matchesStatus && matchesDate;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem("adminToken");

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== "image") {
                data.append(key, formData[key as keyof typeof formData]);
            }
        });

        if (selectedFile) {
            data.append("image", selectedFile);
        } else if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            const url = editingBlog
                ? `${API_URL}/blogs/${editingBlog.id}`
                : `${API_URL}/blogs`;

            const method = editingBlog ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Failed to save blog");
            }

            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Error saving blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card p-6 shadow-sm">
                <div className="mb-10 flex items-center gap-2 font-heading text-xl font-bold text-primary">
                    <LayoutDashboard className="h-6 w-6" />
                    <span>Admin Panel</span>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab("blogs")}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "blogs" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                    >
                        <FileText className="h-5 w-5" />
                        Manage Blogs
                    </button>
                    <button
                        onClick={() => setActiveTab("quotes")}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "quotes" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                    >
                        <MessageSquare className="h-5 w-5" />
                        Manage Quotes
                    </button>
                </nav>

                <div className="mt-auto border-t border-border pt-6">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="font-heading text-3xl font-bold capitalize">
                        {activeTab === "blogs" ? "Blog Posts" : "Quote Requests"}
                    </h1>
                    {activeTab === "blogs" ? (
                        <Button onClick={() => handleOpenModal()} className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Post
                        </Button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <select
                                    value={quoteFilters.status}
                                    onChange={(e) => setQuoteFilters(prev => ({ ...prev, status: e.target.value }))}
                                    className="bg-transparent text-sm font-medium focus:outline-none border-none cursor-pointer"
                                >
                                    <option value="all">Todos los estados</option>
                                    <option value="pending">Pendientes</option>
                                    <option value="finalizado">Finalizados</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <input
                                    type="date"
                                    value={quoteFilters.date}
                                    onChange={(e) => setQuoteFilters(prev => ({ ...prev, date: e.target.value }))}
                                    className="bg-transparent text-sm font-medium focus:outline-none border-none cursor-pointer"
                                />
                                {quoteFilters.date && (
                                    <button
                                        onClick={() => setQuoteFilters(prev => ({ ...prev, date: "" }))}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                        {activeTab === "blogs" ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/50">
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {blogs.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                                                    No blog posts found. Create your first one!
                                                </td>
                                            </tr>
                                        ) : (
                                            blogs.map((blog) => (
                                                <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                                                    <td className="px-6 py-4 font-medium">{blog.title}</td>
                                                    <td className="px-6 py-4 text-muted-foreground">{new Date(blog.date).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                                                            {blog.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                onClick={() => handleOpenModal(blog)}
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                onClick={() => deleteBlog(blog.id)}
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/50">
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Service</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {filteredQuotes.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                                                    No quote requests found with these filters.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredQuotes.map((quote) => (
                                                <tr key={quote.id} className="hover:bg-muted/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium">{quote.fullName}</div>
                                                        <div className="text-xs text-muted-foreground">{quote.email}</div>
                                                        <div className="text-xs text-muted-foreground">{quote.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-muted-foreground">{quote.service}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                            }`}>
                                                            {quote.status === 'pending' ? 'Pendiente' : 'Finalizado'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        {new Date(quote.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {quote.status === 'pending' && (
                                                            <Button
                                                                onClick={() => updateQuoteStatus(quote.id, "finalizado")}
                                                                variant="outline"
                                                                size="sm"
                                                                className="gap-1 text-green-600 border-green-200 hover:bg-green-50"
                                                            >
                                                                <CheckCircle className="h-4 w-4" />
                                                                Finalizar
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Blog Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card p-8 shadow-2xl border border-border">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold font-heading">
                                {editingBlog ? "Edit Blog Post" : "New Blog Post"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        required
                                        placeholder="Post Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (URL)</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        required
                                        placeholder="post-slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        required
                                        placeholder="e.g. Renovaciones"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Blog Image (Max 250KB)</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="cursor-pointer"
                                />
                                {imagePreview && (
                                    <div className="mt-4">
                                        <Label className="mb-2 block text-xs">Image Preview:</Label>
                                        <div className="aspect-video overflow-hidden rounded-lg border border-border shadow-inner bg-muted/50">
                                            <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                        </div>
                                    </div>
                                )}
                                <p className="text-[10px] text-muted-foreground">
                                    Nota: Si no seleccionas una imagen nueva, se mantendrá la actual (si existe).
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    required
                                    placeholder="Brief summary of the post..."
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Full Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    required
                                    placeholder="Detailed content of the post..."
                                    className="min-h-[200px]"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="gap-2" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    {editingBlog ? "Update Post" : "Create Post"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
