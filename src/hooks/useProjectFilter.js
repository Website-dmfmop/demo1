import { useMemo } from 'react';

const useProjectFilter = (projects, filters, searchQuery) => {
    return useMemo(() => {
        return projects.filter(project => {
            // 1. Search Query
            const matchesSearch = 
                !searchQuery ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                project.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            // 2. Sectors (OR logic)
            const matchesSector = 
                filters.sectors.length === 0 || 
                filters.sectors.some(s => project.category?.includes(s) || s.includes(project.category));
            
            // 3. Zones & Wards (Mocking logic assuming exact match)
            const matchesZone = filters.zones.length === 0 || filters.zones.includes(project.zone);
            const matchesWard = filters.wards.length === 0 || filters.wards.includes(project.ward);
            
            // 4. Status
            const matchesStatus = filters.status.length === 0 || filters.status.includes(project.status);
            
            // 5. Budget Range
            const goalInLakhs = (project.fundingGoal || 0) / 100000;
            const matchesBudget = goalInLakhs >= filters.budgetRange[0] && goalInLakhs <= filters.budgetRange[1];

            // 6. SDG Goals (Intersection logic: project must have AT LEAST ONE of the selected SDGs)
            const matchesSDG = filters.sdgGoals.length === 0 || 
                filters.sdgGoals.some(sdg => project.sdgs?.includes(sdg) || project.sdgGoals?.includes(sdg));

            // 7. Compliance (Multi-select tax exemptions + booleans)
            let matchesCompliance = true;
            if (filters.compliance.includes('80G')) {
                matchesCompliance = matchesCompliance && project.taxExemptions?.includes('80G');
            }
            if (filters.compliance.includes('12A')) {
                matchesCompliance = matchesCompliance && project.taxExemptions?.includes('12A');
            }
            if (filters.compliance.includes('FCRA')) {
                matchesCompliance = matchesCompliance && project.hasFCRA;
            }

            // 8. New Institutional Booleans
            const matchesCSR1 = !filters.csr1Validated || project.csr1Validated;
            const matchesNiti = !filters.nitiAayog || project.hasNitiAayog;
            const matchesAspirational = !filters.aspirationalDistrict || project.isAspirationalDistrict;
            const matchesCoInvestment = !filters.coInvestment || project.hasCoInvestment;

            // 9. Demographics (Intersection: Project must target AT LEAST ONE of the selected demographics)
            const matchesDemographics = filters.targetDemographics.length === 0 ||
                filters.targetDemographics.some(demo => project.targetDemographics?.includes(demo));

            // 10. Audit Layer
            const matchesAudit = filters.auditLayer.length === 0 || filters.auditLayer.includes(project.auditLayer);

            // 11. Overhead Cap
            const matchesOverhead = filters.overheadCap === 100 || (project.overheadPercent && project.overheadPercent <= filters.overheadCap);

            return matchesSearch && matchesSector && matchesZone && matchesWard && 
                   matchesStatus && matchesBudget && matchesSDG && matchesCompliance && 
                   matchesCSR1 && matchesNiti && matchesAspirational && matchesCoInvestment &&
                   matchesDemographics && matchesAudit && matchesOverhead;
        });
    }, [projects, filters, searchQuery]);
};

export default useProjectFilter;
