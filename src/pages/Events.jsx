import React from 'react';

export default function Events() {
  return (
    <div>
      
<main className="pb-20">
{/* Hero Section */}
<section className="relative px-8 pt-32 pb-24 overflow-hidden">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
<div className="md:col-span-7 z-10">
<span className="font-label text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Calendar</span>
<h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
                        Collective <span className="text-secondary-container">Action</span> &amp; Diplomatic Discourse
                    </h1>
<p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
                        Join us at the intersection of diplomacy and social change. Our curated events bridge the gap between global policy and local community impact.
                    </p>
</div>
<div className="md:col-span-5 relative">
<div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-lg shadow-2xl rotate-3 transform translate-x-4">
<img className="w-full h-full object-cover" data-alt="Dignified conference hall with warm lighting and a group of people engaged in high-level diplomatic discussion" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDykwf8ZdUexD0fua_uvL164YSBasLDsQxkxqptEXKlNarry63BP3ntUqs0EuOkMxZmdnTuuwogpaMylEf1zcxOi51ptjq0VtaG7CRsA24AJgT-pyrQyDvaDgMVcAcgxfeEsLQBMLc_6mVWXr4OxwiJOAeYf6H4xWHpdsLtd7jfOBnAdafEl7I4yL5RlQNxJGLNQfWraWSBSUwIy_h1Xj4Yx7jbcaFX3IzO2FIKKVDpkFghUr-sYIxhVemgPFGVxS4keRnHAVPFLoCp"/>
</div>
<div className="absolute -bottom-8 -left-8 aspect-square w-48 bg-secondary-container p-6 shadow-xl -rotate-6 hidden md:block">
<div className="border border-white/20 h-full w-full flex flex-col justify-center items-center text-white text-center">
<span className="font-headline text-4xl font-bold">12+</span>
<span className="font-label text-[10px] uppercase tracking-widest">Upcoming Sessions</span>
</div>
</div>
</div>
</div>
</section>
{/* Featured / Next Event - Asymmetric Layout */}
<section className="px-8 py-20 bg-surface-container">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row gap-0">
<div className="md:w-1/2 bg-primary p-12 md:p-16 flex flex-col justify-center order-2 md:order-1">
<div className="bg-secondary-container text-white self-start px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest">Featured Seminar</div>
<h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Navigating Global South Relations in the 21st Century</h2>
<div className="space-y-4 mb-8">
<div className="flex items-center text-white/80 gap-3">
<span className="material-symbols-outlined text-secondary-container">calendar_today</span>
<span className="font-label text-sm tracking-wide">OCTOBER 14, 2024 • 10:00 AM</span>
</div>
<div className="flex items-center text-white/80 gap-3">
<span className="material-symbols-outlined text-secondary-container">location_on</span>
<span className="font-label text-sm tracking-wide">CONSTITUTION CLUB OF INDIA, NEW DELHI</span>
</div>
</div>
<button className="bg-white text-primary px-8 py-4 rounded-md font-headline font-bold text-sm hover:bg-secondary-container hover:text-white transition-all self-start">
                            REGISTER FOR SEAT
                        </button>
</div>
<div className="md:w-1/2 h-80 md:h-auto order-1 md:order-2">
<img className="w-full h-full object-cover" data-alt="Modern high-tech boardroom setting with glass walls and professional atmosphere for a diplomatic summit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaj4DNrYBpp3P0VGznaI-srORiNL9MLn1PVyn06hkTBRCCSzuOb_B-f1AthItVFZt6WqJv-wfj0THeVXNnXPcLG_j63m-4UGCTearKN3AL0_ZfOFmt79RrZ-Z3_56_10yLC_DtBHFyw1xJOFPdIMx6qS4xkWD-wv530AyScycky8SVbYdye7AJQs4y3DrRswj8w8GTrRu3JWeBoF5mAY5xvhyw_ARADjzphRz2VhuGlZ-8xgXZ27yOq4b3XS2c1c8LithmWS6Ovtml"/>
</div>
</div>
</div>
</section>
{/* Chronological Grid */}
<section className="px-8 py-24">
<div className="max-w-7xl mx-auto">
<div className="flex justify-between items-end mb-16">
<div>
<h2 className="font-headline text-3xl font-extrabold text-primary mb-2">Upcoming Engagements</h2>
<div className="w-20 h-1.5 bg-secondary-container"></div>
</div>
<a className="group flex items-center gap-2 font-label font-bold text-xs tracking-widest text-primary hover:text-secondary transition-colors" href="#">
                        ARCHIVE OF PAST EVENTS
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
{/* Event Card 1 */}
<div className="flex flex-col group">
<div className="mb-6 relative overflow-hidden bg-surface-container-low aspect-[16/10]">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" data-alt="Professional workshop setting where a mentor is speaking to a group of young enthusiastic individuals" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkrcTIn8499udTId9hVF1HmU4NFqb6jFggjmW1EXobghEd-aYveCW81Jq3JgaqoBTpwT8fyGN8u1P1QygysTAwE31wjCcL__qJ1b8r8I2ZHl88Jaxt2li6IEblgfxAFfb2nLvh5dx6HRJ5cMxfxjoYUMS0V0H1I4D_DYVnwYORMOmrO8bAJ3u0XZSjvz0u0owugGHss5v8udf1owyjFFPQIck-iySludCyIwtL5QomtcEpSlTUbNkfASiUfxfA41u9KCilA3N8eePL"/>
<div className="absolute top-4 left-4 bg-white px-4 py-2 text-center shadow-lg">
<span className="block text-primary font-headline font-extrabold text-xl leading-none">22</span>
<span className="block text-on-surface-variant font-label text-[10px] font-bold uppercase tracking-tighter">OCT</span>
</div>
</div>
<span className="font-label text-secondary text-[10px] font-bold uppercase tracking-widest mb-2">Education &amp; Outreach</span>
<h3 className="font-headline text-xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary-container transition-colors">Youth Leadership Summit: Voices of Pune</h3>
<div className="flex items-center gap-2 text-on-surface-variant mb-6 text-sm">
<span className="material-symbols-outlined text-base">location_on</span>
<span>Savitribai Phule Pune University</span>
</div>
<button className="mt-auto border-b border-outline-variant py-2 flex items-center justify-between font-label font-bold text-xs tracking-widest hover:border-primary transition-all">
                            RSVP NOW
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
{/* Event Card 2 */}
<div className="flex flex-col group">
<div className="mb-6 relative overflow-hidden bg-surface-container-low aspect-[16/10]">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" data-alt="Elegant literary festival setting with books and sophisticated audience listening to a speaker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5TJozaDKRZFCftmq1IZtkjtCLjTVpfMiYQeCX7fxpIswHrxzhyPtXp2xClnNABn1aNAtqPVG7w48L2MCLOd3IdLIj7cUibQQTRxe_QBiJzJwTZfOr28GWbinH-ModgKDPdtZzEFZqwahj4u05GiIiLyL9KV-FvK1p1jjIyotyflCHtGKV9AoYYEIJAdaGGoUR0Cnu3ZihAQYfNL3aJeBVg_X2bZUJrTaqsXy0SXixZKeOiWXurz3qWJtvqIwd0BIQ3nwqSqELmDfr"/>
<div className="absolute top-4 left-4 bg-white px-4 py-2 text-center shadow-lg">
<span className="block text-primary font-headline font-extrabold text-xl leading-none">05</span>
<span className="block text-on-surface-variant font-label text-[10px] font-bold uppercase tracking-tighter">NOV</span>
</div>
</div>
<span className="font-label text-secondary text-[10px] font-bold uppercase tracking-widest mb-2">Policy Dialogue</span>
<h3 className="font-headline text-xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary-container transition-colors">India's Soft Power: A Diplomatic Review</h3>
<div className="flex items-center gap-2 text-on-surface-variant mb-6 text-sm">
<span className="material-symbols-outlined text-base">location_on</span>
<span>India Habitat Centre, New Delhi</span>
</div>
<button className="mt-auto border-b border-outline-variant py-2 flex items-center justify-between font-label font-bold text-xs tracking-widest hover:border-primary transition-all">
                            RSVP NOW
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
{/* Event Card 3 */}
<div className="flex flex-col group">
<div className="mb-6 relative overflow-hidden bg-surface-container-low aspect-[16/10]">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" data-alt="Community medical outreach camp with doctors and local volunteers assisting elderly citizens" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO3U_TYe5ma-00qGi5HpjyYsrzd3yxLgdbri-WygrdTGEvt-qg1fEr2Yi35Ahm8YUJhX9gBHK4OgjdxP5w2HGUoAs-okd5CXBsepsf3SI2nFFiFz5LegsJ-mcGu8IP2zwdiWyjJ3ly7S2MHdEiDKLQQM1gpbwfyDKV71aeSd2ohB5bCfkrQB6E0C3A3PdoBP-b5tswqMvE3jsJmllHPqJCZLStOY621zcz2GcgOvK__EEOufEtUSDJaIhvEEX5KlmcjXGyc-MB9pWH"/>
<div className="absolute top-4 left-4 bg-white px-4 py-2 text-center shadow-lg">
<span className="block text-primary font-headline font-extrabold text-xl leading-none">18</span>
<span className="block text-on-surface-variant font-label text-[10px] font-bold uppercase tracking-tighter">NOV</span>
</div>
</div>
<span className="font-label text-secondary text-[10px] font-bold uppercase tracking-widest mb-2">Medical Outreach</span>
<h3 className="font-headline text-xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary-container transition-colors">Rural Health Empowerment Drive</h3>
<div className="flex items-center gap-2 text-on-surface-variant mb-6 text-sm">
<span className="material-symbols-outlined text-base">location_on</span>
<span>Satara Regional Community Center</span>
</div>
<button className="mt-auto border-b border-outline-variant py-2 flex items-center justify-between font-label font-bold text-xs tracking-widest hover:border-primary transition-all">
                            RSVP NOW
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</section>
{/* Subscription / Newsletter */}
<section className="px-8 py-20 bg-primary overflow-hidden relative">
{/* Decorative Textured Background */}
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7GE90_fUymXyksXKhSv_mfkkda3drkxfNeZ6ccncg7mSMgyh2n0Ymef3Dq4lCxXJhnLUZWPUHP2OZQq_W8505bR1ANFxXlwuQkumwD5FdJHn22d8ZRoQ5v0w_TFM0uW0QKI8oJdvYqRDyjmYwJ91nbAGCpLb9wbq84ce1lH9HoapaEc5hhFFK5Q_nNgYUFFYaXcgqOy8HnllJ4vWFQUyO4V0ko0xsTkTjdwrXjCwjxUw-s2hf0DIwXdW5me1MDT6oN5xwaLqPaqVj')" }}></div>
<div className="max-w-3xl mx-auto text-center relative z-10">
<h2 className="font-headline text-3xl font-bold text-white mb-4">Stay Informed on Future Initiatives</h2>
<p className="font-body text-white/60 mb-10 text-lg">Receive exclusive invitations to our high-level seminars and foundation updates directly to your inbox.</p>
<form className="flex flex-col md:flex-row gap-4">
<input className="flex-grow bg-white/5 border border-white/10 px-6 py-4 text-white font-label text-sm tracking-widest focus:outline-none focus:border-secondary-container transition-colors" placeholder="YOUR EMAIL ADDRESS" type="email"/>
<button className="bg-secondary-container text-white px-10 py-4 font-headline font-bold text-sm hover:bg-[#fe9832]/80 transition-all uppercase tracking-widest">
                        Subscribe
                    </button>
</form>
</div>
</section>
</main>

    </div>
  );
}
