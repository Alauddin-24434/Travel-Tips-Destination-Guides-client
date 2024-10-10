import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

// Fake popular destinations and suggested travelers data
const popularDestinations = [
    { id: 1, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1542744095-170e858ca86c' },
    { id: 2, name: 'Paris, France', image: 'https://images.unsplash.com/photo-1519985176271-ea485a90f3b3' },
    { id: 3, name: 'New York City, USA', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
    { id: 4, name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
];

const latestArticles = [
    { id: 1, title: '10 Tips for Traveling on a Budget', date: 'October 1, 2024' },
    { id: 2, title: 'The Best Places to Visit in Europe', date: 'September 25, 2024' },
    { id: 3, title: 'How to Plan Your Dream Vacation', date: 'September 20, 2024' },
];

const suggestedTravelers = [
    { id: 1, name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/18.jpg' },
    { id: 2, name: 'Mark Thompson', avatar: 'https://randomuser.me/api/portraits/men/19.jpg' },
    { id: 3, name: 'Emma Roberts', avatar: 'https://randomuser.me/api/portraits/women/20.jpg' },
];

const RightSidebar = () => {
    return (
        <div className="h-[100vh] bg-[#f0f2f5] p-4">
            {/* Popular Destinations */}
            <div className="mb-8">
                <h4 className="text-gray-700 font-bold mb-4">Popular Destinations</h4>
                <ul className="space-y-3">
                    {popularDestinations.map((destination) => (
                        <li key={destination.id} className="flex items-center">
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                className="rounded-md"
                                width={64} // Set the width
                                height={64} // Set the height
                            />
                            <span className="ml-3 text-gray-800">{destination.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Latest Articles */}
            <div className="mb-8">
                <h4 className="text-gray-700 font-bold mb-4">Latest Articles</h4>
                <ul className="space-y-3">
                    {latestArticles.map((article) => (
                        <li key={article.id} className="text-gray-800">
                            <h5 className="font-semibold">{article.title}</h5>
                            <p className="text-sm text-gray-500">{article.date}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Suggested Travelers */}
            <div>
                <h4 className="text-gray-700 font-bold mb-4">Suggested Travelers</h4>
                <ul className="space-y-4">
                    {suggestedTravelers.map((traveler) => (
                        <li key={traveler.id} className="flex items-center">
                            <Image
                                src={traveler.avatar}
                                alt={`${traveler.name} Avatar`}
                                className="rounded-full"
                                width={40} // Set the width
                                height={40} // Set the height
                            />
                            <span className="ml-3 text-gray-800">{traveler.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RightSidebar;
