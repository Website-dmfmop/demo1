import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/api';

export default function BlogListing() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, [search, category, page]);

    const fetchBlogs = async () => {
        setLoading(true);
        setError('');
        try {
            const query = new URLSearchParams({ page, limit: 9 });
            if (search) query.append('search', search);
            if (category) query.append('category', category);

            const res = await fetch(`${API_URL}/api/blogs?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch blogs');
            const data = await res.json();
            setBlogs(data.data);
            setTotalPages(data.pagination.pages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface">
            {/* Hero Section */}
            <section className="bg-primary py-24 px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white mb-6">Blog & Stories</h1>
                    <p className="text-secondary-fixed-dim text-lg md:text-xl font-medium mb-8">Stories, Insights & Updates</p>
                    <p className="text-white/80 max-w-2xl mx-auto text-base">Discover our initiatives, inspiring journeys, community impact, events and achievements.</p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="bg-surface-container-low border-b border-outline-variant/20 sticky top-[72px] z-40">
                <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                        {['', 'General', 'Events', 'Success Stories', 'Initiatives'].map(cat => (
                            <button key={cat} onClick={() => {setCategory(cat); setPage(1);}} className={`px-4 py-2 rounded-full font-label text-sm font-semibold whitespace-nowrap transition-colors ${category === cat ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'}`}>
                                {cat || 'All'}
                            </button>
                        ))}
                    </div>
                    <div className="w-full sm:w-64 relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                        <input type="text" placeholder="Search articles..." value={search} onChange={e => {setSearch(e.target.value); setPage(1);}} className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:border-primary text-sm" />
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 px-8 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-600 bg-red-50 rounded-xl">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p>{error}</p>
                        <button onClick={fetchBlogs} className="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Retry</button>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-32 text-on-surface-variant">
                        <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">article</span>
                        <h3 className="font-headline text-2xl font-bold text-primary mb-2">No articles found</h3>
                        <p>Try adjusting your search or category filters.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map(blog => (
                                <Link to={`/blog/${blog.slug}`} key={blog._id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-outline-variant/10">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img src={`${API_URL}${blog.featuredImage}`} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary/90 backdrop-blur text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded uppercase shadow-sm">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-3">
                                            {new Date(blog.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                        <h3 className="font-headline text-xl font-bold text-primary mb-3 leading-snug group-hover:text-secondary-container transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-on-surface-variant text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                                            {blog.shortDescription}
                                        </p>
                                        <div className="flex items-center text-primary font-bold text-sm uppercase tracking-widest group-hover:text-secondary-container transition-colors mt-auto">
                                            Read Full Story <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center items-center gap-2">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-outline-variant/30 text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/5">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-lg font-bold text-sm ${page === i + 1 ? 'bg-primary text-white' : 'border border-outline-variant/30 text-primary hover:bg-primary/5'}`}>
                                        {i + 1}
                                    </button>
                                ))}
                                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-outline-variant/30 text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/5">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}
