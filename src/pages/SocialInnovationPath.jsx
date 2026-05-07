import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function SocialInnovationPath() {
    const { language } = useLanguage();
    const t = subPageTranslations[language];
    return (
        <div>
            <main>
                <section className="bg-primary mt-[88px] py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-1 bg-secondary-container shrink-0"></div>
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'सामाजिक नवाचार पथ' : 'Social Innovation Path'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'समाधानों का' : 'CO-CREATING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'सह-निर्माण' : 'SOLUTIONS'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'प्रभाव को' : 'DRIVING'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'आगे बढ़ाना।' : 'IMPACT.'}</span>
                                </h1>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Social Innovation Path" className="w-full h-full object-cover" src="/Images/Social_innovation_path.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="social-innovation-path" className="py-24 bg-surface px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
                            <div>
                                <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'DMF पहल' : 'DMF Initiative'}</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{language === 'hi' ? 'सामाजिक नवाचार पथ' : 'Social Innovation Path'}</h2>
                                <div className="w-16 h-1 bg-secondary-container mb-6"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-8">
                                    {language === 'hi' ? 'डॉ. ज्ञानेश्वर मुलय फाउंडेशन में, हम मानते हैं कि वास्तविक और स्थायी परिवर्तन तब उभरता है जब नवाचार उद्देश्य से मिलता है। हमारी सामाजिक नवाचार प्रयोगशालाएं गतिशील मंच हैं जहां विचार, लोग और संसाधन एक साथ आते हैं ताकि गंभीर सामाजिक चुनौतियों को हल किया जा सके — छात्रों, शिक्षाविदों, सरकारी हितधारकों, उद्योग विशेषज्ञों और समुदाय के सदस्यों को व्यावहारिक, मापनीय और प्रभावी समाधान सह-निर्माण करने के लिए एक साथ लाना।' : 'At Dr. Dnyaneshwar Mulay Foundation, we believe that real and lasting change emerges when innovation meets purpose. Our Social Innovation Labs are dynamic platforms where ideas, people, and resources come together to solve pressing social challenges — bringing together students, academicians, government stakeholders, industry experts, and community members to co-create practical, scalable, and impactful solutions.'}
                                </p>
                                <div className="bg-primary/5 border-l-4 border-secondary-container rounded-r-2xl p-6">
                                    <h3 className="font-headline text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary-container">visibility</span> {language === 'hi' ? 'हमारा विज़न' : 'Our Vision'}
                                    </h3>
                                    <p className="text-on-surface-variant leading-relaxed">{language === 'hi' ? 'नवाचार का एक जीवंत पारिस्थितिकी तंत्र बनाना जो समुदायों को सशक्त बनाए, संस्थाओं को मजबूत करे और टिकाऊ और समावेशी विकास को आगे बढ़ाए।' : 'To build a vibrant ecosystem of innovation that empowers communities, strengthens institutions, and drives sustainable and inclusive development.'}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="/Images/Social_innovation_image.jpeg"
                                    alt="Social Innovation Path"
                                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                                    style={{ maxHeight: '480px' }}
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                            </div>
                        </div>

                        <h3 className="font-headline text-2xl font-bold text-primary text-center mb-10">{language === 'hi' ? 'हमारी सामाजिक नवाचार प्रयोगशालाएं क्या करती हैं' : 'What Our Social Innovation Labs Do'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {[
                                { icon: 'handshake', title: language === 'hi' ? 'समाधान सह-निर्माण' : 'Co-create Solutions', desc: language === 'hi' ? 'हम वास्तविक-दुनिया की जरूरतों में निहित समाधान डिजाइन करने के लिए विविध हितधारकों के बीच सहयोग को सुगम बनाते हैं।' : 'We facilitate collaboration among diverse stakeholders to design solutions rooted in real-world needs.' },
                                { icon: 'lightbulb', title: language === 'hi' ? 'नवाचार और रचनात्मकता को बढ़ावा' : 'Foster Innovation & Creativity', desc: language === 'hi' ? 'हम जटिल सामाजिक मुद्दों को संबोधित करने के लिए अभिनव सोच और अंतर-विषयक दृष्टिकोण को प्रोत्साहित करते हैं।' : 'We encourage out-of-the-box thinking and interdisciplinary approaches to address complex social issues.' },
                                { icon: 'science', title: language === 'hi' ? 'प्रोटोटाइप और परीक्षण' : 'Prototype & Test Ideas', desc: language === 'hi' ? 'हम नवोन्मेषी समाधानों को बड़े पैमाने पर लागू करने से पहले प्रयोग, पायलट और परिष्कृत करने के लिए एक सुरक्षित स्थान प्रदान करते हैं।' : 'We provide a safe space to experiment, pilot, and refine innovative solutions before scaling them.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface-container-low rounded-2xl p-6 border-t-4 border-secondary-container hover:-translate-y-1 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-4 block">{item.icon}</span>
                                    <h4 className="font-headline font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                            {[
                                { icon: 'build', title: language === 'hi' ? 'क्षमता निर्माण' : 'Build Capacities', desc: language === 'hi' ? 'हम छात्रों, युवाओं और पेशेवरों को समस्या-समाधान, डिज़ाइन थिंकिंग और सामाजिक नवाचार में प्रशिक्षित करते हैं।' : 'We train students, youth, and professionals in problem-solving, design thinking, and social innovation.' },
                                { icon: 'trending_up', title: language === 'hi' ? 'प्रभाव का विस्तार' : 'Scale Impact', desc: language === 'hi' ? 'हम उच्च-संभावना वाले समाधानों की पहचान करते हैं और क्षेत्रों और सेक्टरों में उनके विस्तार का समर्थन करते हैं।' : 'We identify high-potential solutions and support their expansion across regions and sectors.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface-container-low rounded-2xl p-6 border-t-4 border-secondary-container hover:-translate-y-1 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-4 block">{item.icon}</span>
                                    <h4 className="font-headline font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                            <div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 h-full">
                                <img
                                    src="/Images/Social_innovation_path.jpeg"
                                    alt="Social Innovation Path"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="bg-surface-container-low rounded-2xl p-10">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-8 text-center">{language === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Approach'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {[
                                    { icon: 'groups', label: language === 'hi' ? 'सहयोग' : 'Collaboration', desc: language === 'hi' ? 'विविध दृष्टिकोणों के लिए कई हितधारकों को शामिल करना' : 'Engaging multiple stakeholders for diverse perspectives' },
                                    { icon: 'lightbulb', label: language === 'hi' ? 'नवाचार' : 'Innovation', desc: language === 'hi' ? 'प्रौद्योगिकी और रचनात्मक सोच का लाभ उठाना' : 'Leveraging technology and creative thinking' },
                                    { icon: 'location_on', label: language === 'hi' ? 'समुदाय-केंद्रित डिज़ाइन' : 'Community-Centric Design', desc: language === 'hi' ? 'समावेशी और स्थानीय रूप से प्रासंगिक समाधान' : 'Inclusive and locally relevant solutions' },
                                    { icon: 'analytics', label: language === 'hi' ? 'साक्ष्य-आधारित कार्रवाई' : 'Evidence-Based Action', desc: language === 'hi' ? 'डेटा, अनुसंधान और क्षेत्र की अंतर्दृष्टि का उपयोग' : 'Using data, research, and field insights' },
                                    { icon: 'eco', label: language === 'hi' ? 'स्थिरता' : 'Sustainability', desc: language === 'hi' ? 'मापनीय और दीर्घकालिक मॉडल' : 'Scalable and long-lasting models' },
                                ].map((a, i) => (
                                    <div key={i} className="text-center p-4 bg-surface-container-lowest rounded-xl">
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{a.icon}</span>
                                        <div className="font-headline font-bold text-primary text-sm mb-2">{a.label}</div>
                                        <div className="text-on-surface-variant text-xs leading-relaxed">{a.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-on-surface-variant leading-relaxed mb-2">{language === 'hi' ? 'हम भागीदारों, संस्थाओं, कॉर्पोरेट्स और व्यक्तियों को नवाचार और समावेशी विकास से प्रेरित भविष्य के निर्माण में हमारे साथ सहयोग करने के लिए आमंत्रित करते हैं।' : 'We invite partners, institutions, corporates, and individuals to collaborate with us in building a future driven by innovation and inclusive growth.'}</p>
                            <p className="font-headline font-bold text-primary text-lg">{language === 'hi' ? 'आइए, साथ मिलकर ऐसे समाधान बनाएं जो मायने रखते हैं।' : 'Together, let\'s create solutions that matter.'}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
