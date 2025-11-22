import { useState, useMemo } from "react";
import { ActionButton, ExpertCard, Select } from "../components";
import { CgSortAz } from "react-icons/cg";
import { featuredOpinions } from "../data/home.data";

interface ExpertOpinion {
    id: number;
    name: string;
    title: string;
    opinion: string;
    image: string;
}

const PublicExpertOpinion = () => {
    const [sortBy, setSortBy] = useState('recently-added');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedSector, setSelectedSector] = useState("All");
    const [isLoading] = useState(false);

    const dummyOpinions: ExpertOpinion[] = useMemo(() => [
        ...featuredOpinions,
        {
            id: 4,
            name: "Vusipenga Thembekwayo",
            title: "African Construction Market Reaches Record $180 Billion in 2025 Reports",
            opinion: "Lagos-Calabar Coastal Railway is a 1,400-kilometre standard gauge railway line designed to connect Nigeria's major coastal cities, states and villages.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 5,
            name: "Kwame Mensah",
            title: "Sustainable Infrastructure Development in West Africa",
            opinion: "The future of African construction lies in sustainable practices that balance economic growth with environmental responsibility and social equity.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 6,
            name: "Fatima Hassan",
            title: "Digital Transformation in African Construction",
            opinion: "Embracing digital technologies and innovative construction methods will be crucial for Africa's infrastructure development in the coming decades.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 7,
            name: "John Mwangi",
            title: "Public-Private Partnerships in Infrastructure",
            opinion: "Effective PPP models are essential for bridging Africa's infrastructure gap and attracting the necessary investment for large-scale projects.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop"
        },
        {
            id: 8,
            name: "Aisha Diallo",
            title: "Urban Planning and Smart Cities in Africa",
            opinion: "As African cities continue to grow, smart urban planning and sustainable city development will become increasingly important for quality of life.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop"
        }
    ], []);

    const regions = ["All", "West Africa", "East Africa", "South Africa", "Central Africa", "North Africa"];
    const countries = ["All", "Nigeria", "Kenya", "South Africa", "Egypt", "Ghana"];
    const sectors = ["All", "Infrastructure", "Energy", "Transportation", "Housing", "Technology"];

    // Filter and sort opinions
    const filteredOpinions = useMemo(() => {
        const opinions = [...dummyOpinions];

        // Apply filters
        if (selectedCountry && selectedCountry !== "All") {
            // Filter logic can be added based on expert location if available
        }

        if (selectedRegion && selectedRegion !== "All") {
            // Filter logic can be added based on expert region if available
        }

        if (selectedSector && selectedSector !== "All") {
            // Filter logic can be added based on expert sector if available
        }

        // Apply sorting
        switch (sortBy) {
            case 'recently-added':
                // Keep original order (newest first)
                break;
            case 'oldest':
                opinions.reverse();
                break;
            case 'alphabetical':
                opinions.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name':
                opinions.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return opinions;
    }, [dummyOpinions, selectedRegion, selectedCountry, selectedSector, sortBy]);

    const clearAllFilters = () => {
        setSelectedRegion("All");
        setSelectedCountry("All");
        setSelectedSector("All");
    };

    const activeFiltersCount = [selectedRegion, selectedCountry, selectedSector].filter(
        val => val !== "All"
    ).length;

    return (
        <div className="min-h-screen mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-10 xl:px-20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className='text-base sm:text-lg md:text-xl font-semibold text-[#181D27] border-b-2 sm:border-b-4 border-[#F89822] py-1 pr-2 sm:pr-4 w-fit'>
                    All Expert Opinions
                </div>
                <ActionButton
                    buttonText={
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <CgSortAz size={18} className="sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Filters</span>
                            {activeFiltersCount > 0 && (
                                <span className="ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 bg-[#F89822] text-white text-xs rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>
                    }
                    outline={true}
                    width="fit"
                    paddingX="px-3 sm:px-4"
                    textSize="text-sm sm:text-base"
                    attributes={{
                        onClick: () => setShowFilters(!showFilters)
                    }}
                />
            </div>

            {showFilters && (
                <div className="mb-8 px-0 lg:px-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className='w-[300px]'>
                                <Select
                                    label="Region"
                                    labelFor="region"
                                    labelColor="text-[#181D27]"
                                    placeholder="Select Region"
                                    options={regions.map((region) => ({ value: region, label: region }))}
                                    attributes={{
                                        value: selectedRegion,
                                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='w-[300px]'>
                                <Select
                                    label="Country"
                                    labelFor="country"
                                    labelColor="text-[#181D27]"
                                    placeholder="Select Country"
                                    options={countries.map((country) => ({ value: country, label: country }))}
                                    attributes={{
                                        value: selectedCountry,
                                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCountry(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='w-[300px]'>
                                <Select
                                    label="Sector"
                                    labelFor="sector"
                                    labelColor="text-[#181D27]"
                                    placeholder="Select Sector"
                                    options={sectors.map((sector) => ({ value: sector, label: sector }))}
                                    attributes={{
                                        value: selectedSector,
                                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSector(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-end">
                            <ActionButton
                                buttonText="Clear All"
                                outline
                                width="fit"
                                attributes={{ type: "button", onClick: clearAllFilters }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {filteredOpinions.map((expert) => (
                        <ExpertCard
                            key={expert.id}
                            expertImage={expert.image}
                            expertName={expert.name}
                            title={expert.title}
                            opinion={expert.opinion}
                            expertId={expert.id}
                            link={`/insights/expert-opinions/${expert.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicExpertOpinion;

