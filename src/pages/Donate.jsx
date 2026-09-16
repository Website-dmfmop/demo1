import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { donateTranslations } from '../translations/pages';

// ============================================================================
// DONATION CONFIGURATION
// Keep this section isolated so real donation details can be dropped in later
// without modifying the UI layout or presentation logic.
// ============================================================================
export const DONATION_CONFIG = {
    // Official live donation channels enabled
    isLive: true,

    // QR Information
    qr: {
        imageSrc: '/Images/donation_qr.png',
    },

    // Official Direct Bank Transfer Details
    bank: {
        accountName: 'Dr. Dnyaneshwar Mule Foundation',
        bankName: 'HDFC',
        accountNumber: '50200124275122',
        ifsc: 'HDFC0002054',
    },

    // Genuine Organization Contact for donation queries and receipts
    support: {
        email: 'corporate@dmfmop.org',
        phone: '+91 8999744563',
    },
};

export default function Donate() {
    const { language } = useLanguage();
    const t = donateTranslations[language] || donateTranslations.en;

    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (text, fieldName) => {
        if (!text) return;
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedField(fieldName);
                setTimeout(() => setCopiedField(null), 2500);
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopy(text, fieldName);
            });
        } else {
            fallbackCopy(text, fieldName);
        }
    };

    const fallbackCopy = (text, fieldName) => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2500);
        } catch (err) {
            console.warn('Copy failed', err);
        }
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-surface text-on-surface">
            {/* ── 1. HERO SECTION ─────────────────────────────────── */}
            <section className="relative overflow-hidden bg-[#00003c] pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20 md:pb-24">
                {/* Background photo with subtle dark overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Community Empowerment"
                        className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
                        src="/Images/2.png"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00003c] via-[#00003c]/90 to-[#00003c]/60"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10">
                    <div className="max-w-3xl">
                        {/* Pre-title Tag */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fe9832]/15 border border-[#fe9832]/30 mb-5">
                            <span className="w-2 h-2 rounded-full bg-[#fe9832] animate-pulse"></span>
                            <span className="font-label text-[#fe9832] uppercase tracking-[0.2em] font-bold text-xs">
                                {t.heroTag}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                            {t.heroTitle}{' '}
                            <span className="text-[#fe9832] underline decoration-[#fe9832]/40 decoration-wavy underline-offset-8">
                                {t.heroTitleHighlight}
                            </span>
                        </h1>

                        {/* Sincere Subtitle */}
                        <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-body">
                            {t.heroDesc}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <button
                                id="hero-donate-cta"
                                onClick={() => scrollToSection('donation-methods')}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#fe9832] hover:bg-[#e08324] text-[#00003c] font-headline font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-xl hover:shadow-[0_10px_25px_rgba(254,152,50,0.35)] transition-all transform active:scale-95"
                            >
                                <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                                {t.heroCta}
                            </button>

                            <button
                                onClick={() => scrollToSection('why-support')}
                                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-headline font-semibold text-sm rounded-lg backdrop-blur-sm border border-white/20 transition-all hover:border-white/40"
                            >
                                <span className="material-symbols-outlined text-lg">info</span>
                                {t.heroSecondaryCta}
                            </button>
                        </div>

                        {/* Trust Highlights */}
                        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-300">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[#fe9832] text-xl shrink-0">account_balance</span>
                                <span>Direct NGO Bank Transfer</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[#fe9832] text-xl shrink-0">qr_code_scanner</span>
                                <span>Instant UPI QR Channel</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[#fe9832] text-xl shrink-0">shield</span>
                                <span>100% Direct Grassroots Impact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. WHY YOUR SUPPORT MATTERS ─────────────────────── */}
            <section id="why-support" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="font-label text-[#8f4e00] font-bold tracking-[0.2em] text-xs uppercase block mb-3">
                        {t.whySupportTag}
                    </span>
                    <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary mb-4 tracking-tight">
                        {t.whySupportTitle}
                    </h2>
                    <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed font-body">
                        {t.whySupportSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pillar 1: Social Innovation Path */}
                    <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">lightbulb</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-3">
                                {t.pillar1Title}
                            </h3>
                            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-6 font-body">
                                {t.pillar1Desc}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-surface-container flex items-center text-xs font-semibold text-primary uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base mr-2 text-[#fe9832]">check_circle</span>
                            Grassroots Problem Solving
                        </div>
                    </div>

                    {/* Pillar 2: Skill Reach Programmes */}
                    <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-xl bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center mb-6 group-hover:bg-[#2e7d32] group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">build</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-3">
                                {t.pillar2Title}
                            </h3>
                            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-6 font-body">
                                {t.pillar2Desc}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-surface-container flex items-center text-xs font-semibold text-[#2e7d32] uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base mr-2 text-[#2e7d32]">check_circle</span>
                            Youth Vocational Dignity
                        </div>
                    </div>

                    {/* Pillar 3: She Leads (Women's Leadership) */}
                    <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                        <div>
                            <div className="w-14 h-14 rounded-xl bg-[#fe9832]/15 text-[#8f4e00] flex items-center justify-center mb-6 group-hover:bg-[#fe9832] group-hover:text-[#00003c] transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">diversity_1</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-primary mb-3">
                                {t.pillar3Title}
                            </h3>
                            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-6 font-body">
                                {t.pillar3Desc}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-surface-container flex items-center text-xs font-semibold text-[#8f4e00] uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base mr-2 text-[#fe9832]">check_circle</span>
                            Rural Economic Self-Reliance
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. MAIN DONATION SECTION (CENTERPIECE) ──────────── */}
            <section id="donation-methods" className="py-20 bg-surface-container-low px-6 sm:px-8 lg:px-12 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">
                            <span className="material-symbols-outlined text-sm">payments</span>
                            {t.donationMethodsTag}
                        </div>
                        <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-primary mb-4 tracking-tight">
                            {t.donationMethodsTitle}
                        </h2>
                        <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-body">
                            {t.donationMethodsSubtitle}
                        </p>
                    </div>

                    {/* TWO-COLUMN DONATION METHODS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* ── OPTION A: UPI / QR CODE (5 cols) ── */}
                        <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-8 sm:p-10 border border-outline-variant/50 shadow-lg flex flex-col justify-between">
                            <div>
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div>
                                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#fe9832]/15 text-[#8f4e00] text-xs font-black uppercase tracking-wider mb-2">
                                            {t.qrBadge}
                                        </span>
                                        <h3 className="font-headline text-2xl font-extrabold text-primary">
                                            {t.qrTitle}
                                        </h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                                    </div>
                                </div>

                                {/* QR Placeholder / Live Display */}
                                <div className="my-6">
                                    {DONATION_CONFIG.qr.imageSrc ? (
                                        <div className="bg-white p-6 rounded-2xl border border-outline-variant/60 shadow-inner flex flex-col items-center justify-center">
                                            <img
                                                src={DONATION_CONFIG.qr.imageSrc}
                                                alt="Official DMF Donation QR Code"
                                                className="w-56 h-56 object-contain rounded-lg shadow-sm"
                                            />
                                            <div className="mt-4 flex flex-col items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-semibold">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    Official UPI QR Code
                                                </span>
                                                <a
                                                    href={DONATION_CONFIG.qr.imageSrc}
                                                    download="DMF_Donation_QR.png"
                                                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-hover font-semibold underline underline-offset-4 transition-colors mt-1"
                                                >
                                                    <span className="material-symbols-outlined text-sm">download</span>
                                                    Save QR to Device
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Clearly Unmistakable Development / Pending Placeholder */
                                        <div className="bg-surface-container-low/70 border-2 border-dashed border-[#fe9832]/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                            {/* Decorative watermark */}
                                            <div className="w-20 h-20 rounded-2xl bg-[#fe9832]/10 text-[#8f4e00] flex items-center justify-center mb-4">
                                                <span className="material-symbols-outlined text-4xl">qr_code_2</span>
                                            </div>

                                            <h4 className="font-headline font-bold text-primary text-base mb-1">
                                                {t.qrPlaceholderTitle}
                                            </h4>

                                            <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-xs mb-4">
                                                {t.qrPlaceholderDesc}
                                            </p>

                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fe9832]/10 text-[#8f4e00] text-xs font-semibold">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                Official QR Updating Soon
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* QR Payment Instructions */}
                                <div className="space-y-3 pt-2">
                                    <div className="font-headline font-bold text-primary text-sm tracking-wide">
                                        {t.qrStepsTitle}
                                    </div>
                                    <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant">
                                        <li className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                                            <span>{t.qrStep1}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                                            <span>{t.qrStep2}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5 bg-[#fe9832]/10 p-2.5 rounded-xl border border-[#fe9832]/25 text-primary">
                                            <span className="material-symbols-outlined text-base text-[#8f4e00] shrink-0 mt-0.5">photo_library</span>
                                            <span className="font-medium text-xs sm:text-[13px] leading-relaxed">{t.qrStepAlt}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                                            <span>{t.qrStep3}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">4</span>
                                            <span>{t.qrStep4}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Mobile User Tip */}
                            <div className="mt-8 pt-4 border-t border-surface-container text-xs text-on-surface-variant/80 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#fe9832] text-base shrink-0">smartphone</span>
                                <span>Browsing from mobile? You can also use the Direct Bank Transfer details (Option 2) in your banking app.</span>
                            </div>
                        </div>

                        {/* ── OPTION B: DIRECT BANK TRANSFER (7 cols) ── */}
                        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-8 sm:p-10 border border-outline-variant/50 shadow-lg flex flex-col justify-between">
                            <div>
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div>
                                        <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-2">
                                            {t.bankBadge}
                                        </span>
                                        <h3 className="font-headline text-2xl font-extrabold text-primary">
                                            {t.bankTitle}
                                        </h3>
                                        <p className="text-on-surface-variant text-sm mt-1 font-body">
                                            {t.bankDesc}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                                    </div>
                                </div>

                                {/* Bank Details Card */}
                                <div className="bg-gradient-to-br from-surface-container-low to-surface-container p-6 sm:p-8 rounded-2xl border border-outline-variant/60 shadow-sm relative overflow-hidden mb-8">
                                    {/* Credential Grid */}
                                    <div className="space-y-4">
                                        {/* Bank Name */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant/30 gap-1">
                                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                                {t.bankNameLabel}
                                            </span>
                                            <span className="font-headline font-semibold text-primary text-sm sm:text-base">
                                                {DONATION_CONFIG.bank.bankName}
                                            </span>
                                        </div>

                                        {/* Account Name */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant/30 gap-2">
                                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                                {t.accNameLabel}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-headline font-semibold text-primary text-sm sm:text-base">
                                                    {DONATION_CONFIG.bank.accountName}
                                                </span>
                                                <button
                                                    id="copy-acc-name-btn"
                                                    onClick={() => handleCopy(DONATION_CONFIG.bank.accountName, 'accName')}
                                                    className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-all inline-flex items-center gap-1.5 active:scale-95 shadow-sm"
                                                    title="Copy Account Name"
                                                    aria-label="Copy Account Name"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {copiedField === 'accName' ? 'check' : 'content_copy'}
                                                    </span>
                                                    {copiedField === 'accName' ? t.copiedBtn : t.copyBtn}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Account Number + Copy Button */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant/30 gap-2">
                                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                                {t.accNumberLabel}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-sm sm:text-base font-bold text-primary tracking-wide">
                                                    {DONATION_CONFIG.bank.accountNumber}
                                                </span>
                                                <button
                                                    id="copy-acc-btn"
                                                    onClick={() => handleCopy(DONATION_CONFIG.bank.accountNumber, 'accNumber')}
                                                    className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-all inline-flex items-center gap-1.5 active:scale-95 shadow-sm"
                                                    title="Copy Account Number"
                                                    aria-label="Copy Account Number"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {copiedField === 'accNumber' ? 'check' : 'content_copy'}
                                                    </span>
                                                    {copiedField === 'accNumber' ? t.copiedBtn : t.copyBtn}
                                                </button>
                                            </div>
                                        </div>

                                        {/* IFSC Code + Copy Button */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                                {t.ifscLabel}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-sm sm:text-base font-bold text-primary tracking-wide">
                                                    {DONATION_CONFIG.bank.ifsc}
                                                </span>
                                                <button
                                                    id="copy-ifsc-btn"
                                                    onClick={() => handleCopy(DONATION_CONFIG.bank.ifsc, 'ifsc')}
                                                    className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-all inline-flex items-center gap-1.5 active:scale-95 shadow-sm"
                                                    title="Copy IFSC Code"
                                                    aria-label="Copy IFSC Code"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {copiedField === 'ifsc' ? 'check' : 'content_copy'}
                                                    </span>
                                                    {copiedField === 'ifsc' ? t.copiedBtn : t.copyBtn}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Transfer Step-by-Step */}
                                <div className="space-y-3">
                                    <div className="font-headline font-bold text-primary text-sm tracking-wide">
                                        {t.bankStepsTitle}
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-on-surface-variant">
                                        <li className="flex items-start gap-2.5 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/30">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                                            <span>{t.bankStep1}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/30">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                                            <span>{t.bankStep2}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/30">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                                            <span>{t.bankStep3}</span>
                                        </li>
                                        <li className="flex items-start gap-2.5 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/30">
                                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">4</span>
                                            <span>{t.bankStep4}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Reassurance note */}
                            <div className="mt-8 pt-4 border-t border-surface-container text-xs text-on-surface-variant/80 flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-600 text-base shrink-0">verified_user</span>
                                <span>Zero third-party gateway deductions: 100% of your contribution reaches the foundation directly.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 4. AFTER CONTRIBUTING & TRANSACTION ACKNOWLEDGEMENT ─ */}
            <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-primary to-[#00005a] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-[#fe9832]/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#fe9832] font-label font-bold text-xs uppercase tracking-[0.2em] mb-4">
                            {t.afterDonatingTag}
                        </span>
                        <h2 className="font-headline text-2xl sm:text-3xl font-extrabold mb-4">
                            {t.afterDonatingTitle}
                        </h2>
                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 font-body">
                            {t.afterDonatingDesc}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#fe9832] text-[#00003c] flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-300">{t.contactEmailLabel}</div>
                                    <a
                                        href={`mailto:${DONATION_CONFIG.support.email}`}
                                        className="font-bold text-white hover:text-[#fe9832] transition-colors text-sm sm:text-base"
                                    >
                                        {DONATION_CONFIG.support.email}
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#fe9832] text-[#00003c] flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-xl">call</span>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-300">{t.contactPhoneLabel}</div>
                                    <a
                                        href={`tel:${DONATION_CONFIG.support.phone.replace(/\s+/g, '')}`}
                                        className="font-bold text-white hover:text-[#fe9832] transition-colors text-sm sm:text-base"
                                    >
                                        {DONATION_CONFIG.support.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. TRUST & TRANSPARENCY ──────────────────────────── */}
            <section className="py-20 bg-surface-container-low px-6 sm:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-12">
                        <span className="font-label text-[#8f4e00] font-bold tracking-[0.2em] text-xs uppercase block mb-3">
                            {t.trustTag}
                        </span>
                        <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-4">
                            {t.trustTitle}
                        </h2>
                        <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed font-body">
                            {t.trustDesc}
                        </p>
                    </div>

                    {/* 3 Integrity & Governance Pillar Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-2xl">verified</span>
                                </div>
                                <h3 className="font-headline font-bold text-primary text-lg mb-2">
                                    {t.trustPoint1Title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                    {t.trustPoint1Desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-container text-xs font-semibold text-green-700 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Grassroots Accountability
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-2xl">balance</span>
                                </div>
                                <h3 className="font-headline font-bold text-primary text-lg mb-2">
                                    {t.trustPoint2Title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                    {t.trustPoint2Desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-container text-xs font-semibold text-green-700 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Values-Based Leadership
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-2xl">eco</span>
                                </div>
                                <h3 className="font-headline font-bold text-primary text-lg mb-2">
                                    {t.trustPoint3Title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                    {t.trustPoint3Desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-surface-container text-xs font-semibold text-green-700 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Long-Term Self-Reliance
                            </div>
                        </div>
                    </div>

                    {/* Full-Width Corporate Partnerships & CSR Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                <span className="material-symbols-outlined text-base text-[#fe9832]">handshake</span>
                                Institutional & CSR Engagement
                            </div>
                            <h3 className="font-headline font-bold text-primary text-xl mb-1">
                                {t.csrTitle}
                            </h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                {t.csrDesc}
                            </p>
                        </div>
                        <Link
                            to="/join-us?purpose=Partner"
                            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-95"
                        >
                            {t.csrCta}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 6. FINAL CALL TO ACTION ─────────────────────────── */}
            <section className="py-20 px-6 sm:px-8 lg:px-12 bg-surface text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-[#fe9832]/20 text-[#8f4e00] flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-3xl">favorite</span>
                    </div>

                    <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary mb-4 tracking-tight">
                        {t.finalCtaTitle}
                    </h2>

                    <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mb-8 font-body">
                        {t.finalCtaDesc}
                    </p>

                    <button
                        onClick={() => scrollToSection('donation-methods')}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-[#fe9832] hover:bg-[#e08324] text-[#00003c] font-headline font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-xl hover:shadow-[0_10px_25px_rgba(254,152,50,0.35)] transition-all transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">payments</span>
                        {t.finalCtaBtn}
                    </button>
                </div>
            </section>
        </div>
    );
}
