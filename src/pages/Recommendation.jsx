import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';

const CROP_DATA = {
    Jakarta: {
        dry: ['Corn', 'Chili', 'Eggplant'],
        rainy: ['Rice', 'Spinach', 'Mustard Greens'],
        transition: ['Tomato', 'Cucumber'],
    },
    Surabaya: {
        dry: ['Corn', 'Soybeans', 'Chili'],
        rainy: ['Rice', 'Spinach', 'Mustard Greens'],
        transition: ['Tomato', 'Cabbage'],
    },
    Bandung: {
        dry: ['Chili', 'Carrot', 'Lettuce'],
        rainy: ['Spinach', 'Rice', 'Mustard Greens'],
        transition: ['Tomato', 'Kale'],
    },
    Medan: {
        dry: ['Corn', 'Cassava', 'Chili'],
        rainy: ['Rice', 'Spinach', 'Eggplant'],
        transition: ['Tomato', 'Cucumber'],
    },
    Makassar: {
        dry: ['Cassava', 'Peanuts', 'Corn'],
        rainy: ['Rice', 'Spinach', 'Mustard Greens'],
        transition: ['Tomato', 'Eggplant'],
    },
    Yogyakarta: {
        dry: ['Chili', 'Corn', 'Sweet Potato'],
        rainy: ['Spinach', 'Rice', 'Mustard Greens'],
        transition: ['Tomato', 'Green Beans'],
    },
    Palembang: {
        dry: ['Corn', 'Cassava', 'Chili'],
        rainy: ['Rice', 'Spinach', 'Water Spinach'],
        transition: ['Tomato', 'Cucumber'],
    },
    Semarang: {
        dry: ['Corn', 'Peanuts', 'Chili'],
        rainy: ['Rice', 'Mustard Greens', 'Cabbage'],
        transition: ['Tomato', 'Green Beans'],
    },
    Balikpapan: {
        dry: ['Corn', 'Chili', 'Eggplant'],
        rainy: ['Rice', 'Spinach', 'Mustard Greens'],
        transition: ['Tomato', 'Cucumber'],
    },
    Denpasar: {
        dry: ['Corn', 'Cassava', 'Chili'],
        rainy: ['Rice', 'Spinach', 'Mustard Greens'],
        transition: ['Tomato', 'Cucumber'],
    },
    Banjarmasin: {
        dry: ['Corn', 'Peanuts', 'Sweet Potato'],
        rainy: ['Rice', 'Spinach', 'Mustard Greens'],
        transition: ['Tomato', 'Cucumber'],
    },
    Pekanbaru: {
        dry: ['Corn', 'Cassava', 'Chili'],
        rainy: ['Rice', 'Spinach', 'Water Spinach'],
        transition: ['Tomato', 'Cabbage'],
    },
    Manado: {
        dry: ['Corn', 'Chili', 'Peanuts'],
        rainy: ['Rice', 'Spinach', 'Eggplant'],
        transition: ['Tomato', 'Green Beans'],
    },
    Pontianak: {
        dry: ['Corn', 'Cassava', 'Chili'],
        rainy: ['Rice', 'Spinach', 'Water Spinach'],
        transition: ['Tomato', 'Cucumber'],
    },
    Malang: {
        dry: ['Chili', 'Carrot', 'Lettuce'],
        rainy: ['Spinach', 'Rice', 'Mustard Greens'],
        transition: ['Tomato', 'Kale'],
    },
};

function getSeason(month) {
    if ([12, 1, 2].includes(month)) return 'rainy';
    if ([3, 4, 5, 6, 7, 8].includes(month)) return 'dry';
    return 'transition';
}

export default function Recommendation() {
    const [city, setCity] = useState('');
    const [plants, setPlants] = useState([]);
    const [season, setSeason] = useState('');
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setNotFound(false);
        const trimmed = city.trim();
        if (!trimmed) {
            setError('Please enter a city name.');
            return;
        }

        const formattedCity = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        const month = new Date().getMonth() + 1;
        const currentSeason = getSeason(month);
        setSeason(currentSeason);

        const matchedCity = CROP_DATA[formattedCity];
        if (matchedCity && matchedCity[currentSeason]) {
            setPlants(matchedCity[currentSeason]);
        } else {
            setNotFound(true);
            setPlants([]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 flex justify-center items-center gap-2">
                    🌾 Smart Crop Recommendations
                </h1>
                <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl mx-auto">
                    Find the most suitable crops for your region based on seasonal and regional data.
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <div className="w-full max-w-md relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-green-600" />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city (e.g., Jakarta)"
                        className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
                >
                    🔍 Get Recommendations
                </button>
            </form>

            {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10"
            >
                {notFound ? (
                    <div className="text-center text-gray-600 mt-6">
                        <p className="text-lg">Currently, we don’t have detailed crop data for this city.</p>
                        <p className="text-sm mt-1">Please try a nearby major city instead.</p>
                    </div>
                ) : plants.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-green-700 text-center mb-4">
                            Recommended Crops for {city.charAt(0).toUpperCase() + city.slice(1)} ({season})
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {plants.map((plant, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl p-4 shadow hover:shadow-md border border-gray-100 transition"
                                >
                                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                                        <FaLeaf /> {plant}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Ideal for the {season} season</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </motion.div>
        </div>
    );
}
