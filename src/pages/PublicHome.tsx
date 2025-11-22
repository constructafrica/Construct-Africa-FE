import { ActionButton, ExpertCard, Input, ProjectCard3, Select } from "../components";
import Marquee from "react-fast-marquee";
import { useState, useEffect, useMemo, useRef } from 'react';
import { teamMembers } from "../data/home.data";
import TeamMemberCard from "../components/TeamMemberCard";
import { useLocation } from 'react-router-dom';
import { useGetTrendingProjectsQuery } from "../store/services/projects";
import { useGetExpertsQuery } from "../store/services/expert";
import { Carousel } from "../components/Carousel";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { africanCountries } from "../data/countryMaps";
import { cleanHtmlContent } from "../utils";

const contactFormSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    company: yup.string().required('Company is required'),
    jobTitle: yup.string().required('Job title is required'),
    country: yup.string().required('Country is required'),
    phoneNumber: yup.string(),
    email: yup.string().email('Invalid email address').required('Work email is required'),
});

const ContactForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            company: '',
            jobTitle: '',
            country: '',
            phoneNumber: '',
            email: '',
        },
        validationSchema: contactFormSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6 max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    isRequired
                    labelFor="firstName"
                    error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : undefined}
                    attributes={{
                        type: "text",
                        name: "firstName",
                        id: "firstName",
                        placeholder: "First name",
                        value: formik.values.firstName,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />

                <Input
                    label="Last Name"
                    isRequired
                    labelFor="lastName"
                    error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : undefined}
                    attributes={{
                        type: "text",
                        name: "lastName",
                        id: "lastName",
                        placeholder: "Last name",
                        value: formik.values.lastName,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Company"
                    isRequired
                    labelFor="company"
                    error={formik.touched.company && formik.errors.company ? formik.errors.company : undefined}
                    attributes={{
                        type: "text",
                        name: "company",
                        id: "company",
                        placeholder: "Company name",
                        value: formik.values.company,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />

                <Input
                    label="Job Title"
                    isRequired
                    labelFor="jobTitle"
                    error={formik.touched.jobTitle && formik.errors.jobTitle ? formik.errors.jobTitle : undefined}
                    attributes={{
                        type: "text",
                        name: "jobTitle",
                        id: "jobTitle",
                        placeholder: "Role in company",
                        value: formik.values.jobTitle,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    options={africanCountries}
                    label="Country"
                    isRequired
                    labelFor="country"
                    error={formik.touched.country && formik.errors.country ? formik.errors.country : undefined}
                    attributes={{
                        name: "country",
                        id: "country",
                        value: formik.values.country,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />

                <Input
                    label="Phone number"
                    labelFor="phoneNumber"
                    error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : undefined}
                    attributes={{
                        type: "tel",
                        name: "phoneNumber",
                        id: "phoneNumber",
                        placeholder: "+1 (555) 000-0000",
                        value: formik.values.phoneNumber,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                    }}
                />
            </div>

            <Input
                label="Work Email"
                isRequired
                labelFor="email"
                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                attributes={{
                    type: "email",
                    name: "email",
                    id: "email",
                    placeholder: "you@company.com",
                    value: formik.values.email,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                }}
            />

            <ActionButton
                buttonText="Submit"
                backgroundColor="#E0891E"
                textSize="text-sm sm:text-base"
                width="full"
                attributes={{
                    type: "submit",
                }}
            />
        </form>
    );
};

interface FeatureItemProps {
    feature: {
        id: string;
        title: string;
        description: string;
        image: string;
        headerBadge?: string;
        headerText?: string;
    };
    index: number;
    isActive: boolean;
    progress: number;
    onFeatureClick: (index: number) => void;
    setProgress: (value: number) => void;
}

const FeatureItem = ({ feature, index, isActive, progress, onFeatureClick, setProgress }: FeatureItemProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);

    // Measure content height when active or when switching
    useEffect(() => {
        if (contentRef.current) {
            if (isActive) {
                // Measure and set height when becoming active
                const height = contentRef.current.scrollHeight;
                setContentHeight(height);
            } else {
                // Reset height when becoming inactive
                setContentHeight(0);
            }
        }
    }, [isActive]);

    // Measure mobile image height
    useEffect(() => {
        if (imageRef.current) {
            if (isActive) {
                const height = imageRef.current.scrollHeight;
                setImageHeight(height);
            } else {
                setImageHeight(0);
            }
        }
    }, [isActive]);

    return (
        <div className="mb-3 relative">
            <div className="border-b-2 border-[#D5D7DA]">
                <div
                    className="w-full text-left py-3 sm:py-4 cursor-pointer select-none"
                    onClick={() => {
                        const isMobile = window.innerWidth < 768;
                        onFeatureClick(index);

                        if (isMobile) {
                            // On mobile, set progress to 100 immediately
                            setProgress(100);
                        } else {
                            // On desktop, reset progress to restart animation
                            setProgress(0);
                        }
                    }}
                >
                    <h3 className={`text-base sm:text-lg md:text-[20px] font-semibold transition-colors duration-500 ${isActive ? "text-[#181D27]" : "text-[#A4A7AE]"
                        }`}>
                        {feature.title}
                    </h3>
                </div>

                {/* Description with measured height transition */}
                <div
                    ref={contentRef}
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        maxHeight: `${contentHeight}px`,
                        opacity: isActive ? 1 : 0,
                        paddingBottom: isActive ? '0.75rem' : '0',
                    }}
                >
                    <p className="text-sm sm:text-base text-[#414651] leading-relaxed pt-0 pb-3 sm:pb-4">
                        {feature.description}
                    </p>
                </div>
            </div>

            {isActive && (
                <div
                    className="hidden md:block absolute bottom-0 left-0 h-[2px] bg-[#E0891E] transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            )}

            {/* Mobile Image Section - Always in DOM, transitions smoothly */}
            <div
                ref={imageRef}
                className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: `${imageHeight}px`,
                    marginTop: isActive ? '1rem' : '0',
                    marginBottom: isActive ? '2rem' : '0',
                    opacity: isActive ? 1 : 0,
                }}
            >
                <div style={{
                    backgroundColor: "#7E766F",
                }} className="rounded-2xl pt-6 px-6 min-h-[300px] flex flex-col">
                    <div className="flex flex-col items-center gap-3 justify-center mb-4">
                        <div className="bg-white text-[#181D27] px-3 py-1 rounded-full text-sm font-medium">
                            {feature.headerBadge || 'Email inbox'}
                        </div>
                        <span className="text-white text-sm text-center">
                            {feature.headerText || 'Email notifications for all projects'}
                        </span>
                    </div>

                    <div className="flex-1 border-white border-4 rounded-t-3xl border-b-0 p-2 pb-0 min-h-[200px]">
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover transition-opacity duration-500 rounded-t-xl"
                            style={{ opacity: 1 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PublicHome = () => {
    const location = useLocation();
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1);
    const [displayedImage, setDisplayedImage] = useState('/images/benefit-01.svg');

    const { data: trendingProjectsData, isLoading: isTrendingProjectsLoading } = useGetTrendingProjectsQuery();

    const { data: expertOpinionsData, isLoading: isExpertOpinionsLoading } = useGetExpertsQuery({
        limit: 3,
    });


    useEffect(() => {
        if (location.hash === '#expert-opinions') {
            const scrollToSection = () => {
                const scrollableSection = document.getElementById('scrollable-section');
                const element = document.getElementById('expert-opinions');
                if (element && scrollableSection) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const scrollableTop = scrollableSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - scrollableTop + scrollableSection.scrollTop - offset;

                    scrollableSection.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            };

            scrollToSection();
            setTimeout(scrollToSection, 100);
            setTimeout(scrollToSection, 300);
        }
    }, [location.hash, location.pathname]);

    const brandLogos = [
        { id: 1, name: "Arab Contractors", logo: "/logos/Client 01_Arab Contractors.png" },
        { id: 2, name: "Aksa Energy Company Ghana Ltd", logo: "/logos/Client 02_Aksa Energy Company Ghana Ltd.png" },
        { id: 3, name: "House Matic", logo: "/logos/Client 03_House Matic.png" },
        { id: 4, name: "EquipmentHub", logo: "/logos/Client 04_EquipmentHub.png" },
        { id: 5, name: "Kuulbreeze", logo: "/logos/Client 05_Kuulbreeze.png" },
        { id: 6, name: "Damian James", logo: "/logos/Client 06_Damian James.png" },
    ];

    const features = useMemo(() => [
        {
            id: 'simple',
            title: 'Make Complex Simple',
            description: 'Transform complex project data into clear, actionable insights that drive better decisions.',
            image: '/images/benefit-01.svg',
            headerBadge: 'Easy Search',
            headerText: 'Stramline searches with filters'
        },
        {
            id: 'confidence',
            title: 'Act With Confidence',
            description: 'Every project is verified by local researchers, giving you trusted, decision-ready intelligence you can rely on.',
            image: '/images/benefit-02.svg',
            headerBadge: 'Verified',
            headerText: 'Capable researchers with years of experience'
        },
        {
            id: 'win',
            title: 'Win Projects',
            description: 'Gain early access to project opportunities across Africa, so you can position first, engage early, and win deals.',
            image: '/images/benefit-03.svg',
            headerBadge: 'Email Inbox',
            headerText: 'Email notifications for all projects'
        },
        {
            id: 'ahead',
            title: 'Stay Ahead',
            description: 'Monitor market trends and emerging opportunities before your competitors even know they exist.',
            image: '/images/benefit-04.svg',
            headerBadge: 'Updates',
            headerText: 'Live updates on every followed projects'
        }
    ], []);

    useEffect(() => {
        if (features[0]?.image) {
            setDisplayedImage(features[0].image);
        }
    }, [features]);

    useEffect(() => {
        const currentImage = features[activeFeatureIndex]?.image || '/images/benefit-01.svg';

        setImageOpacity(0);

        const fadeTimeout = setTimeout(() => {
            setDisplayedImage(currentImage);
            setImageOpacity(1);
        }, 200);

        return () => clearTimeout(fadeTimeout);
    }, [activeFeatureIndex, features]);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 768;

        if (!isDesktop) {
            setProgress(100);
            return;
        }

        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0;
                }
                return prev + (100 / (4000 / 50));
            });
        }, 50);

        const featureInterval = setInterval(() => {
            setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
            setProgress(0);
        }, 4000);

        const handleResize = () => {
            const isDesktopNow = window.innerWidth >= 768;
            if (!isDesktopNow) {
                clearInterval(progressInterval);
                clearInterval(featureInterval);
                setProgress(100);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(progressInterval);
            clearInterval(featureInterval);
            window.removeEventListener('resize', handleResize);
        };
    }, [activeFeatureIndex, features.length]);

    const trendingProjects = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "West Africa",
            title: "Egypt seeks consultants for an administration building",
            description: "The Egyptian Environmental Affairs Agency invites consulting firms to indicate interest. The Egyptian Environmental Affairs Agenc...",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "East Africa",
            title: "Kenya Infrastructure Development Project",
            description: "Major infrastructure development initiative across multiple regions in Kenya including roads, bridges, and public facilities...",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "South Africa",
            title: "Cape Town Smart City Initiative",
            description: "Comprehensive smart city development project focusing on sustainable urban planning and digital infrastructure...",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "Central Africa",
            title: "Renewable Energy Grid Expansion",
            description: "Large-scale renewable energy infrastructure project to expand the national grid across multiple provinces...",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
            location: "North Africa",
            title: "Port Modernization Program",
            description: "Comprehensive modernization of major port facilities including container terminals and logistics infrastructure...",
        }
    ];



    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/hero-vid.mp4" type="video/mp4" />
                    <img
                        src="/images/hero-vid-img.svg"
                        alt="Construction in Africa"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </video>

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto absolute bottom-1/2 max-sm:transform max-sm:translate-y-1/2 sm:bottom-16 md:bottom-20">
                    <h1 className="sm:hidden text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-bitter font-semibold mb-2 sm:mb-3 leading-tight px-2">
                        Trusted Intelligence <br /> For Construction <br /> In Africa
                    </h1>
                    <h1 className="max-sm:hidden text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-bitter font-semibold mb-2 sm:mb-3 leading-tight px-2">
                        Trusted Intelligence For Construction In Africa
                    </h1>
                    <p className="sm:hidden text-lg sm:text-base md:text-lg text-[#FDFDFD] max-w-2xl mx-auto px-2">
                        Track projects, discover opportunities, <br /> and make smarter decisions.
                    </p>
                    <p className="max-sm:hidden text-base sm:text-base md:text-lg text-[#FDFDFD] max-w-2xl mx-auto px-2">
                        Track projects, discover opportunities, and make smarter decisions.
                    </p>
                </div>
            </section>

            {/* Trusted by Section */}
            <section className="py-10 sm:py-12 md:py-16">
                <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6">
                    <h2 className="text-sm sm:text-base md:text-lg text-[#414651] mb-2 px-2">
                        Trusted by international contractors, consultants, and investors
                    </h2>
                </div>

                <div className="relative">
                    <Marquee
                        play={true}
                        pauseOnHover={true}
                        pauseOnClick={true}
                        gradient={false}
                        autoFill={true}
                    >
                        {brandLogos.map((brand) => (
                            <div key={brand.id} className="flex items-center justify-center mx-8 sm:mx-12 md:mx-16">
                                <img src={brand.logo} alt={brand.name} className="w-auto h-8 sm:h-10 md:h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* Trending Projects Section */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h2 className="text-sm sm:text-base text-[#414651] mb-3 sm:mb-4 uppercase tracking-wide">
                            Trending Projects
                        </h2>
                        <h3 className="text-xl sm:text-2xl md:text-3xl text-[#181D27] font-bitter font-semibold px-2">
                            Get Insights and Updates on Projects Across Africa
                        </h3>
                    </div>

                    <div className="relative mb-6 sm:mb-8 md:mb-10">
                        <Carousel>
                            {trendingProjectsData?.data.map((project) => (
                                <ProjectCard3
                                    key={project.id}
                                    project={{
                                        image: project.image,
                                        id: project.id.toString(),
                                        title: project.title,
                                        description: project.description,
                                        location: project.location,
                                    }}
                                />
                            ))}
                        </Carousel>
                    </div>
                    <div className="flex justify-center max-sm:mt-16 mt-20">
                        <ActionButton
                            buttonText="Learn More"
                            link="/projects"
                            width="fit"
                            paddingX="px-6 sm:px-8"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 xl:px-28">
                <div className="flex flex-col items-start lg:flex-row lg:items-end gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                    <div className="w-full lg:basis-1/2 ">
                        <p className="text-sm sm:text-base text-[#414651] uppercase tracking-wide mb-3 sm:mb-4">
                            BUILT FOR RESULTS. POWERED BY INSIGHTS.
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight">
                            Uncover Real Opportunities, Win Businesses
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#414651] mb-4 sm:mb-6 leading-relaxed">
                            We deliver trusted, on-the-ground project intelligence, giving you clarity to act fast, plan smarter, and lead in Africa's evolving construction markets.
                        </p>

                        <div className="space-y-0 max-w-md w-full">
                            {features.map((feature, index) => (
                                <FeatureItem
                                    key={feature.id}
                                    feature={feature}
                                    index={index}
                                    isActive={index === activeFeatureIndex}
                                    progress={progress}
                                    onFeatureClick={setActiveFeatureIndex}
                                    setProgress={setProgress}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop Image Section - Hidden on mobile (below md) */}
                    <div className="hidden md:flex flex-1 w-full lg:basis-1/2">
                        <div style={{
                            backgroundColor: "#7E766F",
                        }} className="rounded-4xl pt-10 px-16 h-full flex flex-col">
                            <div className="flex items-center gap-6 justify-center mb-6">
                                <div className="bg-white text-[#181D27] px-3 py-1 rounded-full text-sm font-medium">
                                    {features[activeFeatureIndex]?.headerBadge || 'Email inbox'}
                                </div>
                                <span className="text-white text-base">
                                    {features[activeFeatureIndex]?.headerText || 'Email notifications for all projects'}
                                </span>
                            </div>

                            <div className="flex-1 border-white border-6 rounded-t-4xl border-b-0 p-2 pb-0">
                                <img
                                    src={displayedImage}
                                    alt={features[activeFeatureIndex]?.title || 'Email notifications'}
                                    className="w-full h-full object-cover transition-opacity duration-500 rounded-t-3xl"
                                    style={{ opacity: imageOpacity }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FEF9F4]">
                <div className="max-w-7xl p-6 sm:p-8 md:p-10 lg:p-14 bg-white sm:bg-[url('/images/cta-bg.svg')] bg-cover bg-center mx-auto rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col items-start justify-between gap-4 sm:gap-6">
                    <div className="z-10 relative max-w-lg">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#474747] mb-2 sm:mb-3 md:mb-4">
                            Make Smarter Decisions
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#474747] leading-relaxed">
                            Get real-time insights to make quick decisions and stay ahead in Africa's construction industry.
                        </p>
                    </div>
                    <div className="z-10 relative flex-shrink-0">
                        <ActionButton
                            buttonText="Book a Demo"
                            width="fit"
                            paddingX="px-8"
                        />
                    </div>
                </div>
            </section>

            {/* News and Insights Section */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 sm:mb-10 md:mb-12">
                        <h2 className="text-sm sm:text-base mb-3 text-[#414651] sm:mb-4 uppercase tracking-wide">
                            NEWS AND INSIGHTS
                        </h2>
                        <h3 className="text-xl sm:text-2xl md:text-3xl text-[#181D27] font-semibold font-bitter px-2">
                            Keep up-to-date with the Construction Landscape in Africa
                        </h3>
                    </div>

                    <div className="relative mb-6 sm:mb-8 md:mb-10">
                        <Carousel>
                            {trendingProjects.map((project) => (
                                <ProjectCard3
                                    key={project.id}
                                    project={{
                                        image: project.image,
                                        id: project.id.toString(),
                                        title: project.title,
                                        description: project.description,
                                        location: project.location,
                                    }}
                                />
                            ))}
                        </Carousel>
                    </div>
                    <div className="flex justify-center max-sm:mt-16 mt-20">
                        <ActionButton
                            buttonText="View More News"
                            link="/news"
                            width="fit"
                            paddingX="px-6 sm:px-8"
                        />
                    </div>
                </div>
            </section>

            <section className="pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="max-w-7xl p-6 sm:p-8 md:p-10 lg:p-14 bg-[#FAFAFA] sm:bg-[url('/images/cta-bg-3.svg')] bg-cover bg-center mx-auto rounded-xl sm:rounded-2xl relative overflow-hidden">
                    <div className="relative z-10 pr-0 sm:pr-[200px] md:pr-[300px] lg:pr-[400px]">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] max-w-xl font-bitter font-semibold text-[#181D27] mb-3 sm:mb-4 md:mb-5">
                            Connect with Construct Africa for Key Industry Updates on LinkedIn
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#535862] max-w-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                            Get the latest project updates, trends, and expert analysis delivered directly through our LinkedIn Newsletter.
                        </p>
                        <ActionButton
                            buttonText="Subscribe Now"
                            width="fit"
                            paddingX="px-4 sm:px-6"
                            link="https://www.linkedin.com/newsletters/constructafrica-insights-7367564550356840448/"
                            target="_blank"
                        />
                    </div>
                    {/* <img className="hidden sm:block w-[200px] sm:w-[300px] md:w-[400px] h-auto object-cover absolute right-0 bottom-0 rounded-tl-2xl sm:rounded-tl-3xl" src="https://plus.unsplash.com/premium_photo-1681989486976-9ec9d2eac57a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900" alt="LinkedIn Newsletter" /> */}
                </div>
            </section>

            <section id="expert-opinions" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FEFBF8]">
                <div className="text-center mb-16 sm:mb-10 md:mb-12">
                    <h2 className="text-sm sm:text-base text-[#414651] mb-3 sm:mb-4 uppercase tracking-wide">
                        EXPERT OPINION
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl text-[#181D27] font-semibold font-bitter px-2 capitalize">
                        Hear from experts across different industries
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-4 lg:gap-8 mt-5 lg:mt-10">
                    {expertOpinionsData?.data.map((expert, index) => (
                        <ExpertCard
                            key={expert.id || index}
                            expertImage={expert.photo}
                            expertName={expert.name}
                            title={expert.title}
                            opinion={cleanHtmlContent(expert.opinion || expert.bio || '')}
                            expertId={expert.id}
                            link={`/insights/expert-opinions/${expert.id}`}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8 sm:mt-10 lg:mt-20">
                    <ActionButton
                        buttonText="View More Opinions"
                        width="fit"
                        paddingX="px-6 sm:px-8"
                        link="/insights/expert-opinions"
                    />
                </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#D1C5B8]">
                <div className="max-w-7xl p-6 sm:p-8 md:p-10 lg:p-14 bg-white sm:bg-[url('/images/cta-bg-2.svg')] bg-cover bg-center mx-auto rounded-xl sm:rounded-2xl flex justify-end relative overflow-hidden">
                    <div className="max-w-md">
                        <div className="z-10 relative flex-1">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#474747] mb-2 sm:mb-3 md:mb-4">
                                Get listed
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-[#474747] leading-relaxed">
                                Get a competitive edge with ConstructAfrica. Join thousands of companies making data-driven decisions.
                            </p>
                        </div>
                        <div className="z-10 relative flex-shrink-0 mt-4 md:mt-6">
                            <ActionButton
                                buttonText="Request Listing"
                                width="fit"
                                textSize="text-sm sm:text-base"
                                paddingX="px-4 sm:px-6 md:px-8"
                                link="/get-listed"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 bg-[#FEFBF8]">
                <div className="text-center mb-16 sm:mb-10 md:mb-12">
                    <h2 className="text-sm sm:text-base mb-3 text-[#414651] sm:mb-4 uppercase tracking-wide">
                        ADVISORY BOARD
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl text-[#181D27] font-semibold font-bitter px-2">
                        Meet the ConstructAfrica Industry Advisory Board
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-6 lg:gap-8 mt-5 lg:mt-10">
                    {teamMembers.slice(0, 4).map((member, index: number) => (
                        <TeamMemberCard
                            key={index}
                            member={member}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                    <ActionButton
                        buttonText="View all members"
                        width="fit"
                        textColor="#414651"
                        backgroundColor="#ffffff"
                        textSize="text-sm sm:text-base"
                        paddingX="px-6 sm:px-8"
                        borderColor="#D5D7DA"
                        outlineBgColor="#ffffff"
                        outline
                        link="/advisory-board"
                    />
                </div>
            </section >

            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-0 px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="hidden lg:block relative w-full lg:flex-1 order-2 lg:order-1">
                        <img src="/images/map-illustration.svg" alt="Let's Construct Africa Together" className="w-full h-auto object-cover" />
                    </div>

                    <div className="w-full lg:flex-1 order-1 lg:order-2">
                        <div className="lg:mx-0">
                            <div className="mb-8 sm:mb-10 md:mb-12 text-center lg:text-left">
                                <h2 className="text-sm sm:text-base mb-3 text-[#414651] sm:mb-4 uppercase tracking-wide">
                                    BOOK A DEMO
                                </h2>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3 leading-tight">Let's ConstructAfrica Together</h3>
                                <p className="text-sm sm:text-base md:text-lg text-[#535862] mb-4 sm:mb-6 leading-relaxed">
                                    The trusted intelligence for construction in Africa.
                                </p>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default PublicHome;
