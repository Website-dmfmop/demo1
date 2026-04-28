import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TIME_SLOTS = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
];

const PURPOSE_OPTIONS = [
    'Consultation Meeting',
    'Project Discussion',
    'Volunteer Orientation',
    'Partnership Meeting',
    'Campus Visit',
    'Interview / Assessment',
    'Training Session',
    'Other',
];

const initialForm = {
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    purpose: '',
    message: '',
};

export default function SlotBooking() {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [bookedSlots, setBookedSlots] = useState([]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (form.date) {
            fetch(`${API_URL}/api/slot-bookings/booked?date=${form.date}`)
                .then(res => res.json())
                .then(data => setBookedSlots(Array.isArray(data) ? data : []))
                .catch(err => console.error('Failed to fetch booked slots', err));
        } else {
            setBookedSlots([]);
        }
    }, [form.date]);

    // Minimum date is tomorrow
    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/api/slot-bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSubmitted(true);
                setForm(initialForm);
            } else {
                const data = await res.json();
                setError(data.error || 'Booking failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero */}
            <section className="bg-primary mt-[88px] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-1 bg-secondary-container shrink-0"></div>
                                <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">Appointments</p>
                            </div>
                            <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                <span className="block mb-2">BOOK</span>
                                <span className="block mb-2">YOUR</span>
                                <span className="block text-secondary-container mb-2">SLOT</span>
                                <span className="block text-secondary-container">TODAY.</span>
                            </h1>
                            <p className="mt-8 text-white/70 text-base md:text-lg leading-relaxed max-w-md">
                                Schedule a meeting, campus visit, or consultation with the DMF team.
                                Pick your preferred date, time, and purpose — we'll confirm your booking promptly.
                            </p>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                            <img alt="Book a Slot" className="w-full h-full object-cover" src="/Images/book_slot.jpeg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest uppercase text-secondary-container">Simple Process</span>
                        <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-primary mt-2">How It Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', icon: 'edit_calendar', title: 'Pick a Date', desc: 'Choose a convenient date from the calendar for your appointment.' },
                            { step: '02', icon: 'schedule', title: 'Select Time', desc: 'Pick an available one-hour time slot that works best for you.' },
                            { step: '03', icon: 'assignment', title: 'Fill Details', desc: 'Provide your name, contact information, and purpose of visit.' },
                            { step: '04', icon: 'verified', title: 'Get Confirmed', desc: 'Our team will review and confirm your booking via email or phone.' },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-white transition-all relative">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-secondary-container text-white text-xs font-bold rounded-full flex items-center justify-center">{item.step}</span>
                                </div>
                                <h3 className="font-headline font-bold text-lg text-primary mb-2">{item.title}</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-20 bg-surface-container-low">
                <div className="max-w-3xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest uppercase text-secondary-container">Reserve Now</span>
                        <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-primary mt-2">Book Your Appointment</h2>
                        <p className="mt-3 text-on-surface-variant max-w-2xl mx-auto">
                            Fill in the details below and our team will confirm your slot within 24 hours.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-green-100">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-4xl">event_available</span>
                            </div>
                            <h3 className="font-headline font-bold text-2xl text-primary mb-3">Slot Booked Successfully!</h3>
                            <p className="text-on-surface-variant max-w-md mx-auto mb-8">
                                Your appointment request has been submitted. Our team will contact you shortly to confirm the booking.
                            </p>
                            <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all">
                                Book Another Slot
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 space-y-10">

                            {/* Personal Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">person</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">Your Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name *</label>
                                        <input required name="name" value={form.name} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address *</label>
                                        <input required type="email" name="email" value={form.email} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="your@email.com" />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number *</label>
                                        <input required name="phone" value={form.phone} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                            </div>

                            {/* Date & Time Selection */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary-container flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">calendar_month</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">Select Date & Time</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preferred Date *</label>
                                        <input required type="date" name="date" value={form.date} onChange={handleChange} min={getMinDate()}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Time Slot *</label>
                                        <select required name="timeSlot" value={form.timeSlot} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="">Choose a time slot...</option>
                                            {TIME_SLOTS.map(slot => {
                                                const isBooked = bookedSlots.includes(slot);
                                                return (
                                                    <option key={slot} value={slot} disabled={isBooked}>
                                                        {slot} {isBooked ? '(Already Booked)' : ''}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Purpose */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">topic</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">Purpose of Visit</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Purpose *</label>
                                        <select required name="purpose" value={form.purpose} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="">Select purpose...</option>
                                            {PURPOSE_OPTIONS.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Additional Notes (Optional)</label>
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            placeholder="Any specific topics you'd like to discuss, number of attendees, etc..." />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl flex items-center gap-3">
                                    <span className="material-symbols-outlined">error</span>
                                    <p className="font-medium text-sm">{error}</p>
                                </div>
                            )}

                            <div className="pt-2">
                                <button type="submit" disabled={submitting}
                                    className="w-full py-4 bg-primary text-white font-headline font-bold text-lg rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                                    {submitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Booking...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">event_available</span>
                                            Confirm Booking
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    By booking, you agree that DMF may contact you to confirm or reschedule your appointment.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
