import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { API_URL, authFetch } from '../config/api';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ]
};

const BlogAdminTab = ({ showToast }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [form, setForm] = useState({
        title: '',
        slug: '',
        shortDescription: '',
        mainContent: '',
        category: 'General',
        author: '',
        status: 'Draft',
        seoTitle: '',
        seoDescription: '',
        featuredImage: null
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await authFetch(`${API_URL}/api/blogs/admin/all`);
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (err) {
            showToast('Failed to fetch blogs', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('slug', form.slug);
        formData.append('shortDescription', form.shortDescription);
        formData.append('mainContent', form.mainContent);
        formData.append('category', form.category);
        formData.append('author', form.author);
        formData.append('status', form.status);
        formData.append('seoTitle', form.seoTitle);
        formData.append('seoDescription', form.seoDescription);
        if (form.featuredImage) {
            formData.append('featuredImage', form.featuredImage);
        }

        try {
            const url = editingId ? `${API_URL}/api/blogs/${editingId}` : `${API_URL}/api/blogs`;
            const method = editingId ? 'PUT' : 'POST';
            const res = await authFetch(url, {
                method,
                body: formData
            });

            if (res.ok) {
                showToast(`Blog ${editingId ? 'updated' : 'created'} successfully`, 'success');
                setShowForm(false);
                setEditingId(null);
                fetchBlogs();
            } else {
                const data = await res.json();
                showToast(data.error || 'Operation failed', 'error');
            }
        } catch (err) {
            showToast('Operation failed', 'error');
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            const res = await authFetch(`${API_URL}/api/blogs/${itemToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Blog deleted successfully', 'success');
                fetchBlogs();
            }
        } catch (err) {
            showToast('Failed to delete blog', 'error');
        } finally {
            setItemToDelete(null);
        }
    };

    const togglePublishStatus = async (blog) => {
        const newStatus = blog.status === 'Draft' ? 'Published' : 'Draft';
        const formData = new FormData();
        formData.append('status', newStatus);

        try {
            const res = await authFetch(`${API_URL}/api/blogs/${blog._id}`, {
                method: 'PUT',
                body: formData
            });
            if (res.ok) {
                showToast(`Blog ${newStatus === 'Published' ? 'published' : 'unpublished'} successfully`, 'success');
                fetchBlogs();
            }
        } catch (err) {
            showToast('Failed to update status', 'error');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-on-surface-variant">Loading blogs...</div>;
    }

    if (showForm) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-primary">{editingId ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
                    <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (auto-generated if empty)</label>
                            <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., my-first-blog" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                            <input type="text" required value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                            <input type="text" required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                        <textarea required rows="2" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Content *</label>
                        <div className="bg-white">
                            <ReactQuill theme="snow" value={form.mainContent} onChange={(content) => setForm({...form, mainContent: content})} modules={modules} className="h-64 mb-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image {editingId ? '(Leave empty to keep existing)' : '*'}</label>
                            <input type="file" accept="image/*" required={!editingId} onChange={e => setForm({...form, featuredImage: e.target.files[0]})} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                            <input type="text" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                            <input type="text" value={form.seoDescription} onChange={e => setForm({...form, seoDescription: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">{editingId ? 'Update Post' : 'Create Post'}</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-primary">Blog & Stories Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage articles, stories, and news updates.</p>
                </div>
                <button onClick={() => {
                    setForm({ title: '', slug: '', shortDescription: '', mainContent: '', category: 'General', author: '', status: 'Draft', seoTitle: '', seoDescription: '', featuredImage: null });
                    setEditingId(null);
                    setShowForm(true);
                }} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span> New Post
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500 text-sm">No blog posts found.</td>
                                </tr>
                            ) : (
                                blogs.map(blog => (
                                    <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-gray-900">{blog.title}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{new Date(blog.publishedDate).toLocaleDateString()}</div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{blog.category}</td>
                                        <td className="p-4 text-sm text-gray-600">{blog.author}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => togglePublishStatus(blog)} title={blog.status === 'Draft' ? 'Publish' : 'Unpublish'} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-100">
                                                    <span className="material-symbols-outlined text-[18px]">{blog.status === 'Draft' ? 'publish' : 'unpublished'}</span>
                                                </button>
                                                <button onClick={() => {
                                                    setForm({ title: blog.title, slug: blog.slug, shortDescription: blog.shortDescription, mainContent: blog.mainContent, category: blog.category, author: blog.author, status: blog.status, seoTitle: blog.seoTitle, seoDescription: blog.seoDescription, featuredImage: null });
                                                    setEditingId(blog._id);
                                                    setShowForm(true);
                                                }} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button onClick={() => setItemToDelete(blog._id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
                        <div className="flex items-center gap-4 mb-6 text-red-600">
                            <span className="material-symbols-outlined text-3xl">warning</span>
                            <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 mb-8">Are you sure you want to delete this blog post? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setItemToDelete(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete Post</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogAdminTab;
