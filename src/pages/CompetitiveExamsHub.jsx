import React, { useEffect } from 'react';
import ExamsHero from '../components/CompetitiveExams/ExamsHero';
import ExamGrid from '../components/CompetitiveExams/ExamGrid';
import ResourceTable from '../components/CompetitiveExams/ResourceTable';
import OfficerMentorship from '../components/CompetitiveExams/OfficerMentorship';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';

const CompetitiveExamsHub = () => {
    const { language } = useLanguage();
    const t = commonTranslations[language];

    useEffect(() => {
        document.title = `${t.navCompetitiveExams} | ${t.brandName}`;
    }, [language, t]);

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <ExamsHero />
            <ExamGrid />
            <ResourceTable />
            <OfficerMentorship />
        </div>
    );
};

export default CompetitiveExamsHub;
