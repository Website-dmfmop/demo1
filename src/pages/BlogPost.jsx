import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../config/api';
import DOMPurify from 'dompurify';

export default function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${API_URL}/api/blogs/${slug}`);
                if (!res.ok) {
                    if (res.status === 404) throw new Error('Blog post not found');
                    throw new Error('Failed to load blog post');
                }
                const data = await res.json();
                setBlog(data);
                if (data.seoTitle) document.title = data.seoTitle;
                if (data.seoDescription) {
                    let meta = document.querySelector('meta[name="description"]');
                    if (meta) meta.content = data.seoDescription;
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">sentiment_dissatisfied</span>
                <h1 className="font-headline text-3xl font-bold text-primary mb-2">Oops!</h1>
                <p className="text-on-surface-variant mb-6">{error}</p>
                <Link to="/blog" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm">
                    Back to Blog
                </Link>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <main className="min-h-screen bg-surface pb-24">
            {/* Header / Hero */}
            <div className="bg-primary pt-32 pb-48 px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="mb-6 flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase text-white/80">
                        <Link to="/blog" className="hover:text-white transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Blog
                        </Link>
                        <span>•</span>
                        <span className="text-secondary-fixed-dim">{blog.category}</span>
                    </div>
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
                        <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">person</span> {blog.author}</div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">calendar_month</span> {new Date(blog.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-4 sm:px-8 -mt-32 relative z-20">
                <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant/10">
                    <img src={`${API_URL}${blog.featuredImage}`} alt={blog.title} className="w-full aspect-[16/9] md:aspect-[21/9] object-cover" />
                    
                    <div className="p-8 md:p-12 lg:p-16">
                        <div className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:text-primary prose-p:text-on-surface-variant prose-a:text-secondary-container hover:prose-a:text-primary prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.mainContent) }}
                        ></div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors uppercase tracking-widest text-sm">
                        <span className="material-symbols-outlined">arrow_back</span> Read More Stories
                    </Link>
                </div>
            </div>
        </main>
    );
}
