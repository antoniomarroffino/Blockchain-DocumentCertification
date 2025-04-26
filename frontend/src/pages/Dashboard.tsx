import {Link} from "react-router-dom";
import {ChartBarIcon, ClockIcon, DocumentArrowUpIcon, ShieldCheckIcon} from "@heroicons/react/24/outline";

const features = [
    {
        icon: <ShieldCheckIcon className="w-12 h-12 text-primary"/>,
        title: "Military-Grade Security",
        text: "Blockchain-powered immutability protects your documents"
    },
    {
        icon: <ClockIcon className="w-12 h-12 text-secondary"/>,
        title: "Instant Verification",
        text: "Verify authenticity of any document in seconds"
    },
    {
        icon: <ChartBarIcon className="w-12 h-12 text-accent"/>,
        title: "Full History Tracking",
        text: "Complete audit trail for every document"
    },
    {
        icon: <DocumentArrowUpIcon className="w-12 h-12 text-primary"/>,
        title:
            "Easy Integration",
        text:
            "API-first approach for developers"
    }
]

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            {/* Hero Section */}
            <div className="hero bg-base-100 rounded-lg md:rounded-xl p-4 md:p-6">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                            Secure Your Documents with Blockchain
                        </h1>
                        <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-500">
                            Certify, verify and track your important documents
                        </p>
                        <Link to="/uploadDocument" className="btn btn-primary btn-sm md:btn-lg gap-1 md:gap-2">
                            <DocumentArrowUpIcon className="w-4 h-4 md:w-5 md:h-5"/>
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="card bg-base-100 shadow-sm md:shadow-xl">
                <div className="card-body p-4 md:p-6">
                    <h2 className="card-title text-xl md:text-3xl mb-4 md:mb-6">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="p-3 md:p-4">
                                <div className="mb-2 md:mb-4">{feature.icon}</div>
                                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-500">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;