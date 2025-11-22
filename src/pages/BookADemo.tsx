import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Input, Select, ActionButton } from '../components';
import { FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';

const BookADemo = () => {
    const navigate = useNavigate();

    // Common countries list
    const countries = [
        { value: 'NG', label: 'Nigeria' },
        { value: 'ZA', label: 'South Africa' },
        { value: 'KE', label: 'Kenya' },
        { value: 'GH', label: 'Ghana' },
        { value: 'EG', label: 'Egypt' },
        { value: 'ET', label: 'Ethiopia' },
        { value: 'TZ', label: 'Tanzania' },
        { value: 'UG', label: 'Uganda' },
        { value: 'AO', label: 'Angola' },
        { value: 'DZ', label: 'Algeria' },
        { value: 'SD', label: 'Sudan' },
        { value: 'MA', label: 'Morocco' },
        { value: 'MZ', label: 'Mozambique' },
        { value: 'MG', label: 'Madagascar' },
        { value: 'CM', label: 'Cameroon' },
        { value: 'CI', label: "Côte d'Ivoire" },
        { value: 'NE', label: 'Niger' },
        { value: 'BF', label: 'Burkina Faso' },
        { value: 'ML', label: 'Mali' },
        { value: 'MW', label: 'Malawi' },
        { value: 'ZM', label: 'Zambia' },
        { value: 'SN', label: 'Senegal' },
        { value: 'TD', label: 'Chad' },
        { value: 'SO', label: 'Somalia' },
        { value: 'ZW', label: 'Zimbabwe' },
        { value: 'GN', label: 'Guinea' },
        { value: 'RW', label: 'Rwanda' },
        { value: 'BJ', label: 'Benin' },
        { value: 'TN', label: 'Tunisia' },
        { value: 'BI', label: 'Burundi' },
    ];

    // Phone country codes
    const phoneCodes = [
        { value: 'US', label: 'US +1' },
        { value: 'GB', label: 'GB +44' },
        { value: 'NG', label: 'NG +234' },
        { value: 'ZA', label: 'ZA +27' },
        { value: 'KE', label: 'KE +254' },
        { value: 'GH', label: 'GH +233' },
        { value: 'EG', label: 'EG +20' },
        { value: 'ET', label: 'ET +251' },
        { value: 'TZ', label: 'TZ +255' },
        { value: 'UG', label: 'UG +256' },
    ];

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        company: Yup.string()
            .min(2, 'Company name must be at least 2 characters')
            .required('Company is required'),
        jobTitle: Yup.string()
            .min(2, 'Job title must be at least 2 characters')
            .required('Job title is required'),
        country: Yup.string()
            .required('Country is required'),
        phoneCode: Yup.string()
            .required('Phone code is required'),
        phoneNumber: Yup.string()
            .matches(/^[\d\s\-()]+$/, 'Please enter a valid phone number')
            .min(10, 'Phone number must be at least 10 digits'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Work email is required'),
        plan: Yup.string()
            .oneOf(['news', 'projects'], 'Please select a plan')
            .required('Plan selection is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            company: '',
            jobTitle: '',
            country: '',
            phoneCode: 'US',
            phoneNumber: '',
            email: '',
            plan: '' as 'news' | 'projects' | '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // Navigate to payment screen with form data
            // navigate('/book-a-demo/payment', {
            //     state: {
            //         formData: values,
            //     },
            // });
        },
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
                <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bitter font-semibold text-[#181D27] mb-2 sm:mb-3">
                        Let's ConstructAfrica Together
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-[#717680] max-w-lg mx-auto px-2">
                        Fill in your information and select your preferred plan, we will guide you through the next steps to either activate your account or book a demo.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
                    <div className="hidden lg:block relative h-full min-h-[600px]">
                        <div className="sticky top-8">
                            <div className="relative flex-1">
                                <div className="absolute inset-0"></div>
                                <img src="/images/map-illustration.svg" alt="Let's Construct Africa Together" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full max-w-lg mx-auto lg:mx-0">
                        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Personal Information - Two Columns */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <Input
                                    label="First name"
                                    labelFor="firstName"
                                    attributes={{
                                        type: 'text',
                                        name: 'firstName',
                                        placeholder: 'First name',
                                        value: formik.values.firstName,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                    }}
                                    error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : undefined}
                                />
                                <Input
                                    label="Last name"
                                    labelFor="lastName"
                                    attributes={{
                                        type: 'text',
                                        name: 'lastName',
                                        placeholder: 'Last name',
                                        value: formik.values.lastName,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                    }}
                                    error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : undefined}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <Input
                                    label="Company"
                                    labelFor="company"
                                    attributes={{
                                        type: 'text',
                                        name: 'company',
                                        placeholder: 'Company name',
                                        value: formik.values.company,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                    }}
                                    error={formik.touched.company && formik.errors.company ? formik.errors.company : undefined}
                                />
                                <Input
                                    label="Job title"
                                    labelFor="jobTitle"
                                    attributes={{
                                        type: 'text',
                                        name: 'jobTitle',
                                        placeholder: 'Role in company',
                                        value: formik.values.jobTitle,
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur,
                                    }}
                                    error={formik.touched.jobTitle && formik.errors.jobTitle ? formik.errors.jobTitle : undefined}
                                />
                            </div>

                            {/* Country */}
                            <Select
                                label="Country"
                                labelFor="country"
                                placeholder="Select country"
                                options={countries}
                                attributes={{
                                    name: 'country',
                                    value: formik.values.country,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                }}
                                error={formik.touched.country && formik.errors.country ? formik.errors.country : undefined}
                            />

                            {/* Phone Number */}
                            <div>
                                <label className="text-[#414651] text-xs sm:text-sm font-medium mb-1 block">
                                    Phone number
                                </label>
                                <div className="flex gap-2 sm:gap-3 mt-1">
                                    <div className="w-20 sm:w-24 flex-shrink-0">
                                        <select
                                            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-[#414651] border border-[#D5D7DA] rounded-lg outline-none transition-all duration-200"
                                            name="phoneCode"
                                            value={formik.values.phoneCode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            {phoneCodes.map((code) => (
                                                <option key={code.value} value={code.value}>
                                                    {code.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-[#414651] border border-[#D5D7DA] rounded-lg outline-none transition-all duration-200"
                                            placeholder="+1 (555) 000-0000"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <span className="text-xs text-[#D95959] mt-1 block">{formik.errors.phoneNumber}</span>
                                )}
                            </div>

                            {/* Work Email */}
                            <Input
                                label="Work email"
                                labelFor="email"
                                attributes={{
                                    type: 'email',
                                    name: 'email',
                                    placeholder: 'you@company.com',
                                    value: formik.values.email,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                }}
                                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                            />

                            {/* Plan Selection */}
                            <div>
                                <h3 className="text-[#181D27] text-sm sm:text-base font-semibold mb-3 sm:mb-4">Select plan</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {/* News Plan */}
                                    <div
                                        className={`relative border rounded-lg sm:rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-200 ${formik.values.plan === 'news'
                                            ? 'border-[#E0891E] bg-[#FFF4E6]'
                                            : 'border-[#E9EAEB] bg-white hover:border-[#E0891E]/50'
                                            }`}
                                        onClick={() => formik.setFieldValue('plan', 'news')}
                                    >
                                        <div className="flex flex-col gap-2 sm:gap-3">
                                            <input
                                                type="radio"
                                                name="plan"
                                                value="news"
                                                checked={formik.values.plan === 'news'}
                                                onChange={() => formik.setFieldValue('plan', 'news')}
                                                onBlur={formik.handleBlur}
                                                className="mt-1 w-4 h-4 text-[#E0891E] border-gray-300 focus:ring-[#E0891E]"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                                    <FiBookOpen className="text-[#E0891E] text-lg sm:text-xl" />
                                                    <span className="text-[#181D27] font-semibold text-sm sm:text-base">News</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#12B76A]">
                                                    <HiCheck className="text-base sm:text-lg" />
                                                    <span>Access to all news.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Projects Plan */}
                                    <div
                                        className={`relative border rounded-lg sm:rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-200 ${formik.values.plan === 'projects'
                                            ? 'border-[#E0891E] bg-[#FFF4E6]'
                                            : 'border-[#E9EAEB] bg-white hover:border-[#E0891E]/50'
                                            }`}
                                        onClick={() => formik.setFieldValue('plan', 'projects')}
                                    >
                                        <div className="flex flex-col gap-2 sm:gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <input
                                                        type="radio"
                                                        name="plan"
                                                        value="projects"
                                                        checked={formik.values.plan === 'projects'}
                                                        onChange={() => formik.setFieldValue('plan', 'projects')}
                                                        onBlur={formik.handleBlur}
                                                        className="mt-1 w-4 h-4 text-[#E0891E] border-gray-300 focus:ring-[#E0891E]"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <FiBriefcase className="text-[#E0891E] text-lg sm:text-xl" />
                                                    <span className="text-[#181D27] font-semibold text-sm sm:text-base">Projects</span>
                                                    <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
                                                        Best value
                                                    </span>
                                                </div>
                                                <div className="space-y-1 sm:space-y-1.5">
                                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#12B76A]">
                                                        <HiCheck className="text-base sm:text-lg flex-shrink-0" />
                                                        <span>Access to all content.</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#12B76A]">
                                                        <HiCheck className="text-base sm:text-lg flex-shrink-0" />
                                                        <span>Access all companies and contacts.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Selection Error */}
                            {formik.touched.plan && formik.errors.plan && (
                                <div className="text-xs text-[#D95959] mt-[-4px] sm:mt-[-8px]">{formik.errors.plan}</div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-2">
                                <ActionButton
                                    buttonText="Book a Demo"
                                    attributes={{
                                        type: 'submit',
                                        disabled: !formik.isValid || formik.isSubmitting,
                                    }}
                                    textSize="text-sm sm:text-base"
                                    width="full"
                                    backgroundColor="#E0891E"
                                    paddingX="px-4 sm:px-6"
                                    loading={formik.isSubmitting}
                                />
                            </div>

                            {/* Login Link */}
                            <div className="text-center pt-2">
                                <p className="text-xs sm:text-sm text-[#717680]">
                                    Already have a subscription?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="text-[#E0891E] font-semibold hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookADemo;

