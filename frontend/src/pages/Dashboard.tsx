import { Link } from "react-router-dom";
import {
    DocumentArrowUpIcon,
    ShieldCheckIcon,
    ClockIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Hero Section */}
            <div className="hero bg-base-100 rounded-xl p-6">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold mb-6">
                            Secure Your Documents with Blockchain
                        </h1>
                        <p className="text-xl mb-8 text-gray-500">
                            Certify, verify and track your important documents with immutable
                            blockchain technology
                        </p>
                        <Link to="/uploadDocument" className="btn btn-primary btn-lg gap-2">
                            <DocumentArrowUpIcon className="w-5 h-5" />
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mb-6">Why Choose CertifyChain?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <ShieldCheckIcon className="w-12 h-12 text-primary" />,
                                title: "Military-Grade Security",
                                text: "Blockchain-powered immutability protects your documents"
                            },
                            {
                                icon: <ClockIcon className="w-12 h-12 text-secondary" />,
                                title: "Instant Verification",
                                text: "Verify authenticity of any document in seconds"
                            },
                            {
                                icon: <ChartBarIcon className="w-12 h-12 text-accent" />,
                                title: "Full History Tracking",
                                text: "Complete audit trail for every document"
                            },
                            {
                                icon: <DocumentArrowUpIcon className="w-12 h-12 text-primary" />,
                                title: "Easy Integration",
                                text: "API-first approach for developers"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-4">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-500">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;