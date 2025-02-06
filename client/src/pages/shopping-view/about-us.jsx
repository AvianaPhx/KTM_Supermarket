import React from 'react';
import { ShieldCheck, Heart, Users, Store } from 'lucide-react';
import AboutUs from '../../assets/AboutUs.jpg'; 

const promisePoints = [
    { id: "authentic", label: "Source authentic products directly from their countries of origin", icon: Store },
    { id: "quality", label: "Maintain the highest quality standards", icon: ShieldCheck },
    { id: "service", label: "Provide knowledgeable, friendly service", icon: Heart },
    { id: "community", label: "Support our local multicultural community", icon: Users },
];

export default function OurStory() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Image Section */}
            <div className="relative w-full">
                <img 
                    src={AboutUs} 
                    alt="KTM Supermarket" 
                    className="w-full h-[300px] object-cover"
                />
            </div>
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-bold text-center mb-12">
                        Our Story
                    </h1>
                    
                    <div className="space-y-8 text-lg">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <p className="mb-6">
                                At KTM Supermarket, our story begins with a dream to bring authentic South Asian flavors to the heart of Tamworth. As first-generation Nepalese immigrants, we understand the importance of having access to familiar ingredients that remind you of home.
                            </p>

                            <p className="mb-6">
                                After settling in Tamworth and noticing the growing multicultural community, we recognized a vital need for authentic South Asian groceries in the New England region. With over 15 years of combined experience in retail and a deep understanding of South Asian cuisine, we decided to embark on this entrepreneurial journey to serve our community.
                            </p>

                            <p>
                                KTM Supermarket represents more than just a business to us – it's our commitment to preserving and sharing our cultural heritage. We personally select each product, working directly with suppliers from Nepal, India, and the Pacific Islands to ensure authenticity and quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Our Promise
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {promisePoints.map((point) => (
                            <div key={point.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <point.icon className="w-12 h-12 mb-4 text-blue-600"/>
                                    <span className="font-medium">{point.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl font-medium text-blue-600">
                        Visit us at 235 Peel Street, Tamworth, and experience the warmth of traditional South Asian hospitality.
                    </p>
                </div>
            </section>
        </div>
    );
}