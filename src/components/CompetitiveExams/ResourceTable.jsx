import React from 'react';

const resources = [
    { id: 1, name: "UPSC CSE 2025 Official Syllabus & Pattern", category: "UPSC", year: 2025, size: "2.4 MB" },
    { id: 2, name: "MPSC State Services Previous Year Papers (2020-2024)", category: "MPSC", year: 2024, size: "15.8 MB" },
    { id: 3, name: "Banking Awareness Monthly Digest - Jan 2026", category: "Banking", year: 2026, size: "4.1 MB" },
    { id: 4, name: "SSC CGL Tier-1 Mock Test Series with Solutions", category: "SSC", year: 2025, size: "8.5 MB" },
    { id: 5, name: "Complete Indian Polity Notes for Civil Services", category: "UPSC / MPSC", year: 2025, size: "12.0 MB" },
];

const ResourceTable = () => {
    return (
        <section id="resources" className="py-20 bg-[#F8F9FA]">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Resource Vault
                        </h2>
                        <p className="text-gray-600 max-w-2xl text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Download officially verified syllabi, previous year question papers, and high-yield study materials curated by experts.
                        </p>
                    </div>
                    <button className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-[#000080] font-semibold text-sm hover:border-[#000080] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter Resources
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <thead>
                                <tr className="bg-[#000080] text-white">
                                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider">Document Name</th>
                                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Exam Category</th>
                                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider hidden md:table-cell">Year</th>
                                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider hidden lg:table-cell">Size</th>
                                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {resources.map((res, index) => (
                                    <tr key={res.id} className={`hover:bg-[#FF9933]/5 transition-colors border-b border-gray-100 ${index % 2 === 0 ? 'bg-[#F8F9FA]' : 'bg-white'}`}>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                                </div>
                                                <span className="font-semibold text-gray-900 text-[15px]">{res.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 hidden sm:table-cell">
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                                                {res.category}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 hidden md:table-cell text-gray-500 font-medium">
                                            {res.year}
                                        </td>
                                        <td className="py-5 px-6 hidden lg:table-cell text-gray-500 font-medium">
                                            {res.size}
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <a 
                                                href="#" // Placeholder for actual download URL
                                                download 
                                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#000080]/5 text-[#000080] hover:bg-[#000080] hover:text-white transition-all duration-300"
                                                title="Download PDF"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">download</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResourceTable;
