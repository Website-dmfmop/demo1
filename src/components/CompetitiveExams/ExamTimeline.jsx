import React from 'react';

const timelineData = [
    {
        id: 1,
        exam: "UPSC CSE 2026",
        event: "Notification Released",
        date: "Feb 14, 2026",
        status: "past"
    },
    {
        id: 2,
        exam: "UPSC CSE 2026",
        event: "Application Closing",
        date: "Mar 05, 2026",
        status: "past"
    },
    {
        id: 3,
        exam: "SBI PO 2026",
        event: "Online Application Open",
        date: "Jun 15 - Jul 05, 2026",
        status: "active" // This will be the active pulsing node
    },
    {
        id: 4,
        exam: "UPSC CSE 2026",
        event: "Prelims Examination Date",
        date: "May 24, 2026",
        status: "upcoming"
    },
    {
        id: 5,
        exam: "MPSC State Services 2026",
        event: "Prelims Examination",
        date: "Aug 21, 2026",
        status: "upcoming"
    }
];

const ExamTimeline = () => {
    return (
        <section id="timeline" className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Live Exam Calendar 2026
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Track important milestones, notification dates, and examination schedules. Never miss a critical deadline again.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Central Navy Track Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#000080]/10 transform md:-translate-x-1/2 rounded-full"></div>

                    <div className="space-y-12">
                        {timelineData.map((item, index) => (
                            <div key={item.id} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* Timeline Node */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    {item.status === 'active' ? (
                                        <div className="relative flex h-6 w-6">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9933] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-6 w-6 bg-[#FF9933] border-4 border-white shadow-md"></span>
                                        </div>
                                    ) : (
                                        <div className={`h-5 w-5 rounded-full border-4 border-white shadow-sm z-10 ${item.status === 'past' ? 'bg-gray-400' : 'bg-[#000080]'}`}></div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                                    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                                        item.status === 'active' 
                                        ? 'bg-[#FF9933]/5 border-[#FF9933]/30 shadow-[0_8px_30px_rgba(255,153,51,0.15)] transform hover:-translate-y-1' 
                                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                    }`}>
                                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 ${
                                            item.status === 'active' ? 'bg-[#FF9933] text-white' : 
                                            item.status === 'past' ? 'bg-gray-100 text-gray-500' : 'bg-[#000080]/10 text-[#000080]'
                                        }`}>
                                            {item.status === 'active' ? 'Action Required' : item.status}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                            {item.event}
                                        </h3>
                                        <p className="text-[#000080] font-semibold text-[15px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {item.exam}
                                        </p>
                                        <div className={`flex items-center gap-2 text-sm font-medium ${
                                            item.status === 'active' ? 'text-[#FF9933]' : 'text-gray-500'
                                        } ${index % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'}`}>
                                            <span className="material-symbols-outlined text-[18px]">event</span>
                                            {item.date}
                                        </div>
                                        
                                        {item.status === 'active' && (
                                            <div className={`mt-4 pt-4 border-t border-[#FF9933]/20 flex ${index % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'}`}>
                                                <button className="text-sm font-bold text-[#FF9933] hover:text-[#000080] flex items-center gap-1 transition-colors">
                                                    Apply Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExamTimeline;
