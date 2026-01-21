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
    Calendar as CalendarIcon,
    Users,
    Download,
    Menu
} from "lucide-react";
import * as XLSX from 'xlsx';
import { API_URL, BASE_URL } from "@/config";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"blogs" | "quotes" | "contractors">("blogs");
    const [blogs, setBlogs] = useState<any[]>([]);
    const [quotes, setQuotes] = useState<any[]>([]);
    const [contractors, setContractors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [editingContractor, setEditingContractor] = useState<any>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const [contractorForm, setContractorForm] = useState({
        nombre: "",
        telefono: "",
        email: "",
        direccion: "",
        estado: "activo"
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
            if (blogsRes.ok) {
                const blogsData = await blogsRes.json();
                setBlogs(Array.isArray(blogsData) ? blogsData : []);
            }

            const token = localStorage.getItem("adminToken");

            const quotesRes = await fetch(`${API_URL}/quotes`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (quotesRes.ok) {
                const quotesData = await quotesRes.json();
                setQuotes(Array.isArray(quotesData) ? quotesData : []);
            } else if (quotesRes.status === 401 || quotesRes.status === 400) {
                // If token is invalid or unauthorized, logout
                // handleLogout();
                // return;
            }

            const contractorsRes = await fetch(`${API_URL}/contractors`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (contractorsRes.ok) {
                const contractorsData = await contractorsRes.json();
                setContractors(Array.isArray(contractorsData) ? contractorsData : []);
            }
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

    const deleteContractor = async (id: number) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este contratista?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${API_URL}/contractors/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenModal = (item: any = null) => {
        setSelectedFile(null);
        if (activeTab === "blogs") {
            if (item) {
                setEditingBlog(item);
                setImagePreview(item.image && item.image.startsWith('/uploads/') ? `${BASE_URL}${item.image}` : item.image);
                setFormData({
                    title: item.title,
                    slug: item.slug,
                    excerpt: item.excerpt,
                    content: item.content,
                    image: item.image,
                    date: item.date.split('T')[0],
                    readTime: item.readTime,
                    category: item.category
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
        } else if (activeTab === "contractors") {
            if (item) {
                setEditingContractor(item);
                setContractorForm({
                    nombre: item.nombre,
                    telefono: item.telefono || "",
                    email: item.email || "",
                    direccion: item.direccion || "",
                    estado: item.estado || "activo"
                });
            } else {
                setEditingContractor(null);
                setContractorForm({
                    nombre: "",
                    telefono: "",
                    email: "",
                    direccion: "",
                    estado: "activo"
                });
            }
        }
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (activeTab === "blogs") {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                // Auto-generate slug from title if title changes and no custom slug is set
                ...(name === "title" && !editingBlog ? { slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') } : {})
            }));
        } else if (activeTab === "contractors") {
            setContractorForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
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

    const exportToExcel = (type: 'quotes' | 'contractors') => {
        let dataToExport = [];
        let fileName = "";

        if (type === 'quotes') {
            dataToExport = filteredQuotes.map(q => ({
                'Nombre': q.fullName,
                'Email': q.email,
                'Teléfono': q.phone,
                'Servicio': q.service,
                'Estado': q.status === 'pending' ? 'Pendiente' : 'Finalizado',
                'Fecha': new Date(q.created_at).toLocaleDateString()
            }));
            fileName = `Quotes_${new Date().toISOString().split('T')[0]}.xlsx`;
        } else {
            dataToExport = contractors.map(c => ({
                'Nombre': c.nombre,
                'Email': c.email,
                'Teléfono': c.telefono,
                'Dirección': c.direccion,
                'Estado': c.estado === 'activo' ? 'Activo' : 'Inactivo'
            }));
            fileName = `Contractors_${new Date().toISOString().split('T')[0]}.xlsx`;
        }

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, fileName);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem("adminToken");

        try {
            if (activeTab === "blogs") {
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
            } else if (activeTab === "contractors") {
                const url = editingContractor
                    ? `${API_URL}/contractors/${editingContractor.id}`
                    : `${API_URL}/contractors`;

                const method = editingContractor ? "PUT" : "POST";

                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(contractorForm)
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || "Failed to save contractor");
                }
            }

            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Error saving data");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-primary-foreground p-2 rounded-lg shadow-lg"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 border-r border-border bg-card p-6 shadow-sm
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="mb-10 flex items-center gap-2 font-heading text-xl font-bold text-primary">
                    <LayoutDashboard className="h-6 w-6" />
                    <span>Admin Panel</span>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => {
                            setActiveTab("blogs");
                            setIsMobileMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "blogs" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                    >
                        <FileText className="h-5 w-5" />
                        <span className="hidden sm:inline">Manage Blogs</span>
                        <span className="sm:hidden">Blogs</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("quotes");
                            setIsMobileMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "quotes" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span className="hidden sm:inline">Manage Quotes</span>
                        <span className="sm:hidden">Quotes</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("contractors");
                            setIsMobileMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === "contractors" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            }`}
                    >
                        <Users className="h-5 w-5" />
                        <span className="hidden sm:inline">Manage Contractors</span>
                        <span className="sm:hidden">Contractors</span>
                    </button>
                </nav>

                <div className="mt-auto border-t border-border pt-6">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:inline">Sign Out</span>
                        <span className="sm:hidden">Exit</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                <header className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold capitalize">
                        {activeTab === "blogs" ? "Blog Posts" : activeTab === "quotes" ? "Quote Requests" : "Contractors"}
                    </h1>
                    {activeTab === "blogs" ? (
                        <Button onClick={() => handleOpenModal()} className="gap-2 w-full sm:w-auto">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">New Post</span>
                            <span className="sm:hidden">New</span>
                        </Button>
                    ) : activeTab === "contractors" ? (
                        <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                            <Button
                                onClick={() => exportToExcel('contractors')}
                                variant="outline"
                                className="gap-2 text-green-600 border-green-200 hover:bg-green-50"
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Export Excel</span>
                                <span className="sm:hidden">Export</span>
                            </Button>
                            <Button onClick={() => handleOpenModal()} className="gap-2">
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">New Contractor</span>
                                <span className="sm:hidden">New</span>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <Button
                                onClick={() => exportToExcel('quotes')}
                                variant="outline"
                                className="gap-2 text-green-600 border-green-200 hover:bg-green-50"
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Export Excel</span>
                                <span className="sm:hidden">Export</span>
                            </Button>
                            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
                                <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <select
                                    value={quoteFilters.status}
                                    onChange={(e) => setQuoteFilters(prev => ({ ...prev, status: e.target.value }))}
                                    className="bg-transparent text-sm font-medium focus:outline-none border-none cursor-pointer w-full"
                                >
                                    <option value="all">Todos</option>
                                    <option value="pending">Pendientes</option>
                                    <option value="finalizado">Finalizados</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <input
                                    type="date"
                                    value={quoteFilters.date}
                                    onChange={(e) => setQuoteFilters(prev => ({ ...prev, date: e.target.value }))}
                                    className="bg-transparent text-sm font-medium focus:outline-none border-none cursor-pointer w-full"
                                />
                                {quoteFilters.date && (
                                    <button
                                        onClick={() => setQuoteFilters(prev => ({ ...prev, date: "" }))}
                                        className="text-muted-foreground hover:text-foreground flex-shrink-0"
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
                    <>
                        {activeTab === "blogs" ? (
                            <>
                                {/* Mobile Card View */}
                                <div className="block md:hidden space-y-3 p-4">
                                    {!Array.isArray(blogs) || blogs.length === 0 ? (
                                        <div className="text-center py-10 text-muted-foreground">
                                            No blog posts found. Create your first one!
                                        </div>
                                    ) : (
                                        blogs.map((blog) => (
                                            <div key={blog.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-base flex-1 pr-2">{blog.title}</h3>
                                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs whitespace-nowrap">
                                                        {blog.category}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {new Date(blog.date).toLocaleDateString()}
                                                </p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleOpenModal(blog)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        onClick={() => deleteBlog(blog.id)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Desktop Table View */}
                                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
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
                                                {!Array.isArray(blogs) || blogs.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                                                            No blog posts found. Create your first one!
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    blogs.map((blog) => (
                                                        <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                                                            <td className="px-6 py-4 font-medium">{blog.title}</td>
                                                            <td className="px-6 py-4 text-muted-foreground">
                                                                {new Date(blog.date).toLocaleDateString()}
                                                            </td>
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
                                </div>
                            </>
                        ) : activeTab === "quotes" ? (
                            <>
                                {/* Mobile Card View - Quotes */}
                                <div className="block md:hidden space-y-3 p-4">
                                    {!Array.isArray(filteredQuotes) || filteredQuotes.length === 0 ? (
                                        <div className="text-center py-10 text-muted-foreground">
                                            No quote requests found with these filters.
                                        </div>
                                    ) : (
                                        filteredQuotes.map((quote) => (
                                            <div key={quote.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-base">{quote.fullName}</h3>
                                                        <p className="text-xs text-muted-foreground">{quote.email}</p>
                                                        <p className="text-xs text-muted-foreground">{quote.phone}</p>
                                                    </div>
                                                    <span className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ml-2 ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                        {quote.status === 'pending' ? 'Pendiente' : 'Finalizado'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">{quote.service}</p>
                                                <p className="text-xs text-muted-foreground mb-3">
                                                    {new Date(quote.created_at).toLocaleDateString()}
                                                </p>
                                                {quote.status === 'pending' && (
                                                    <Button
                                                        onClick={() => updateQuoteStatus(quote.id, "finalizado")}
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full text-green-600 border-green-200 hover:bg-green-50"
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Finalizar
                                                    </Button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Desktop Table View - Quotes */}
                                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
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
                                                {!Array.isArray(filteredQuotes) || filteredQuotes.length === 0 ? (
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
                                                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
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
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Mobile Card View - Contractors */}
                                <div className="block md:hidden space-y-3 p-4">
                                    {!Array.isArray(contractors) || contractors.length === 0 ? (
                                        <div className="text-center py-10 text-muted-foreground">
                                            No contractors found. Add your first one!
                                        </div>
                                    ) : (
                                        contractors.map((contractor) => (
                                            <div key={contractor.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-base">{contractor.nombre}</h3>
                                                        <p className="text-xs text-muted-foreground">{contractor.email}</p>
                                                        <p className="text-xs text-muted-foreground">{contractor.telefono}</p>
                                                    </div>
                                                    <span className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ml-2 ${contractor.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {contractor.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">{contractor.direccion}</p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleOpenModal(contractor)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        onClick={() => deleteContractor(contractor.id)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Desktop Table View - Contractors */}
                                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-border bg-muted/50">
                                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Contact Info</th>
                                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Address</th>
                                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {!Array.isArray(contractors) || contractors.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                                                            No contractors found. Add your first one!
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    contractors.map((contractor) => (
                                                        <tr key={contractor.id} className="hover:bg-muted/30 transition-colors">
                                                            <td className="px-6 py-4 font-medium">{contractor.nombre}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="text-xs text-muted-foreground">{contractor.email}</div>
                                                                <div className="text-xs text-muted-foreground">{contractor.telefono}</div>
                                                            </td>
                                                            <td className="px-6 py-4 text-muted-foreground">{contractor.direccion}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${contractor.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                    {contractor.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        onClick={() => handleOpenModal(contractor)}
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                                                    >
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => deleteContractor(contractor.id)}
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
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>

            {/* Blog Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-card p-5 sm:p-6 lg:p-8 shadow-2xl border border-border">
                        <div className="mb-5 sm:mb-6 flex items-center justify-between sticky top-0 bg-card pb-3 border-b border-border sm:border-0 sm:pb-0 sm:static">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-heading">
                                {activeTab === "blogs"
                                    ? (editingBlog ? "Editar Blog" : "Nuevo Blog")
                                    : (editingContractor ? "Editar Contratista" : "Nuevo Contratista")
                                }
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-lg"
                            >
                                <X className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                            {activeTab === "blogs" ? (
                                <>
                                    <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2">
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="title" className="text-sm font-medium">Título</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                required
                                                placeholder="Título del post"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="slug" className="text-sm font-medium">Slug (URL)</Label>
                                            <Input
                                                id="slug"
                                                name="slug"
                                                required
                                                placeholder="slug-del-post"
                                                value={formData.slug}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2">
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="category" className="text-sm font-medium">Categoría</Label>
                                            <Input
                                                id="category"
                                                name="category"
                                                required
                                                placeholder="ej. Renovaciones"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="date" className="text-sm font-medium">Fecha</Label>
                                            <Input
                                                id="date"
                                                name="date"
                                                type="date"
                                                required
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 sm:space-y-2">
                                        <Label htmlFor="image" className="text-sm font-medium">Imagen del Blog <span className="text-xs text-muted-foreground">(Máx 250KB)</span></Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="cursor-pointer text-sm file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium"
                                        />
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <Label className="mb-2 block text-xs font-medium">Vista previa:</Label>
                                                <div className="aspect-video overflow-hidden rounded-lg border border-border shadow-inner bg-muted/50 max-h-48">
                                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                                </div>
                                            </div>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Nota: Si no seleccionas una imagen nueva, se mantendrá la actual (si existe).
                                        </p>
                                    </div>

                                    <div className="space-y-1.5 sm:space-y-2">
                                        <Label htmlFor="excerpt" className="text-sm font-medium">Resumen</Label>
                                        <Textarea
                                            id="excerpt"
                                            name="excerpt"
                                            required
                                            placeholder="Breve resumen del post..."
                                            value={formData.excerpt}
                                            onChange={handleInputChange}
                                            className="min-h-[80px] text-sm sm:text-base resize-none"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-1.5 sm:space-y-2">
                                        <Label htmlFor="content" className="text-sm font-medium">Contenido Completo</Label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            required
                                            placeholder="Contenido detallado del post..."
                                            className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base resize-none"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            rows={6}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2">
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="nombre" className="text-sm font-medium">Nombre</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                required
                                                placeholder="Nombre Completo"
                                                value={contractorForm.nombre}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="telefono" className="text-sm font-medium">Teléfono</Label>
                                            <Input
                                                id="telefono"
                                                name="telefono"
                                                placeholder="(555) 123-4567"
                                                value={contractorForm.telefono}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2">
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="email@ejemplo.com"
                                                value={contractorForm.email}
                                                onChange={handleInputChange}
                                                className="text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <Label htmlFor="estado" className="text-sm font-medium">Estado</Label>
                                            <select
                                                id="estado"
                                                name="estado"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={contractorForm.estado}
                                                onChange={handleInputChange}
                                            >
                                                <option value="activo">Activo</option>
                                                <option value="inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 sm:space-y-2">
                                        <Label htmlFor="direccion" className="text-sm font-medium">Dirección</Label>
                                        <Textarea
                                            id="direccion"
                                            name="direccion"
                                            placeholder="Dirección completa"
                                            value={contractorForm.direccion}
                                            onChange={handleInputChange}
                                            className="min-h-[80px] text-sm sm:text-base resize-none"
                                            rows={3}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-5 sticky bottom-0 bg-card pb-1 sm:pb-0 sm:static border-t border-border sm:border-0 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto text-sm sm:text-base"
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" className="gap-2 w-full sm:w-auto text-sm sm:text-base" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    {activeTab === "blogs"
                                        ? (editingBlog ? "Actualizar" : "Crear Post")
                                        : (editingContractor ? "Actualizar" : "Crear Contratista")
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
