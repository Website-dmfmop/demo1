import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function DTNTLivesMatter() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'DTNT लाइव्स मैटर' : 'DTNT Lives Matter'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'गरिमा की' : 'RESTORING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'बहाली' : 'DIGNITY'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'न्याय को' : 'PROMOTING'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'बढ़ावा।' : 'JUSTICE.'}</span>
                                </h1>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="DTNT Lives Matter" className="w-full h-full object-cover" src="/Images/dtnt_lives.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="dtnt-lives-matter" className="py-24 bg-surface px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'DMF पहल' : 'DMF Initiative'}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{language === 'hi' ? 'DTNT लाइव्स मैटर' : 'DTNT Lives Matter'}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-7 space-y-6 text-on-surface-variant leading-relaxed text-base">
                                <p>
                                    {language === 'hi' ? <><strong className="text-primary">DTNT लाइव्स मैटर</strong> डॉ. ज्ञानेश्वर मुलय फाउंडेशन की एक व्यापक सामाजिक पहल है जो भारत की विमुक्त, घुमंतू और अर्ध-घुमंतू जनजातियों (DTNT) की गरिमा बहाल करने, अधिकारों की गारंटी देने और टिकाऊ आजीविका के अवसर बनाने के लिए प्रतिबद्ध और सक्रिय है।</> : <><strong className="text-primary">DTNT Lives Matter</strong> initiative by the Dr. Dnyaneshwar Mulay Foundation is a comprehensive social initiative committed and active in restoring the dignity, guaranteeing rights, and creating sustainable livelihood opportunities for the De-notified, Nomadic, and Semi-Nomadic Tribes (DTNT) of India.</>}
                                </p>
                                <p>
                                    {language === 'hi' ? 'औपनिवेशिक काल के आपराधिक जनजाति अधिनियम 1871 की विरासत के कारण लंबे समय से कलंकित और हाशिए पर रहे, ये समुदाय आज, संवैधानिक अधिकार होने के बावजूद, गरीबी, भूमिहीनता, पहचान दस्तावेजों की कमी और शिक्षा, स्वास्थ्य और बुनियादी सेवाओं से वंचित होने की समस्याओं का सामना करते रहते हैं, जिसने पीढ़ी दर पीढ़ी उनके हाशिए पर रहने के चक्र को जारी रखा है।' : 'Long stigmatized and marginalized due to the legacy of the colonial-era Criminal Tribes Act of 1871, these communities today, despite having constitutional rights, continue to face problems of poverty, landlessness, lack of identity documents, and deprivation of education, health, and basic services, which has perpetuated the cycle of their marginalization generation after generation.'}
                                </p>
                                <p>
                                    {language === 'hi' ? <> इस संदर्भ में, जमीनी स्तर पर काम करते हुए, यह पहल <strong className="text-primary">पहचान, शिक्षा, स्वास्थ्य सेवा और आजीविका</strong> के क्षेत्रों में ठोस हस्तक्षेप करती है ताकि समुदाय को दृश्यता प्रदान की जा सके, उनकी आवाज को मजबूत किया जा सके और अवसर बनाए जा सकें।</> : <>In this context, working at the grassroots level, this initiative makes concrete interventions in the areas of <strong className="text-primary">identity, education, healthcare, and livelihood</strong> to provide visibility to the community, strengthen their voice, and create opportunities.</>}
                                </p>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl mt-6">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        {language === 'hi' ? 'न्याय और समावेश के मूल्यों पर आधारित, यह पहल "जीवित रहने के संघर्ष" से "गरिमा के साथ जीने के अधिकार" तक एक परिवर्तन लाती है, इन समुदायों को आत्मनिर्भर, सशक्त और राष्ट्र के समग्र विकास में सक्रिय भागीदार बनाने का लक्ष्य प्राप्त करती है।' : 'Based on the values of justice and inclusion, this initiative brings about a transformation from "a struggle for survival" to "the right to live with dignity," achieving the goal of making these communities self-reliant, empowered, and active participants in the overall development of the nation.'}
                                    </p>
                                </div>
                            </div>
                            <div className="md:col-span-5 flex flex-col gap-6">
                                <div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 h-[500px]">
                                    <img src="/Images/dr_vinayak.jpeg" alt="Prof Dr Vinayak Lashkar" className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-secondary-container">
                                    <h3 className="font-headline font-bold text-primary text-xl mb-1">{language === 'hi' ? 'प्रो. डॉ. विनायक लष्कर' : 'Prof Dr Vinayak Lashkar'}</h3>
                                    <div className="text-secondary-container font-semibold text-sm uppercase tracking-wider mb-2">{language === 'hi' ? 'विशेषज्ञ - DTNT विकास' : 'Expert - DTNT Development'}</div>
                                    <p className="text-on-surface-variant text-sm">{language === 'hi' ? 'DTNT समुदाय विकास को समर्पित।' : 'Dedicated to DTNT community development.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
