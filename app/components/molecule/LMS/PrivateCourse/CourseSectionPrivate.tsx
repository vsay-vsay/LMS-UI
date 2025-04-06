import React, { useState, useEffect } from "react";
import { FiSearch, FiGrid, FiList } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { getPrivateCourses, getCourseFeatures } from '../../../../routes/LMS/PrivateCourse/api';
import { Link } from "react-router";

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
  tutor: {
    name: string;
    email: string;
  };
}

const CourseSelectionPrivatePage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showComparison, setShowComparison] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const apiCourses = await getPrivateCourses();
                const transformedCourses = apiCourses.map(course => ({
                    id: course._id,
                    name: course.playlistName,
                    description: course.description,
                    price: course.price,
                    rating: 4.5, // Default rating
                    image: course.thumbnail,
                    features: getCourseFeatures(course),
                    tutor: course.tutor
                }));
                setCourses(transformedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = (course: Course) => {
        setSelectedCourses(prev => 
            prev.find(c => c.id === course.id) 
                ? prev.filter(c => c.id !== course.id)
                : [...prev, course]
        );
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.name.localeCompare(b.name);
    });

    const CourseCard = ({ course }: { course: Course }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${viewMode === "grid" ? "w-full" : "flex"} hover:shadow-xl transition-shadow`}
        >
            <div className={`relative ${viewMode === "grid" ? "h-48" : "w-1/3 h-full"}`}>
                <Link to={course.id}>
                <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                </Link>
                <div className="absolute top-2 right-2">
                    <button
                        onClick={() => handleCourseSelect(course)}
                        className={`p-2 rounded-full transition-colors ${
                            selectedCourses.find(c => c.id === course.id) 
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        ✓
                    </button>
                </div>
            </div>
            <Link to={course.id}>
            <div className={`p-4 ${viewMode === "grid" ? "" : "w-2/3"}`}>
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-600">Instructor: {course.tutor.name}</span>
                </div>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}
                        />
                    ))}
                    <span className="ml-2 text-gray-600">{course.rating}</span>
                </div>
                <p className="text-blue-600 font-bold text-xl mb-2">${course.price}</p>
                <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
            </Link>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50 rounded-2xl m-4">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="relative flex-1 max-w-xl">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courses by name, description, or instructor..."
                            className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Select onValueChange={(value) => setSortBy(value as "name" | "price" | "rating")}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort Options</SelectLabel>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="price">Price</SelectItem>
                                    <SelectItem value="rating">Rating</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <button
                            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            {viewMode === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid-cols-1 gap-4"}`}>
                        {sortedCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}

                {selectedCourses.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                    {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected
                                </span>
                                <button
                                    onClick={() => setShowComparison(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-4"
                                >
                                    Compare Courses
                                </button>
                            </div>
                            <button
                                onClick={() => setSelectedCourses([])}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {showComparison && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
                                <div className="p-4 border-b">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">Course Comparison</h2>
                                        <button
                                            onClick={() => setShowComparison(false)}
                                            className="text-gray-500 hover:text-gray-700 text-2xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {selectedCourses.map(course => (
                                            <div key={course.id} className="border rounded-lg p-4">
                                                <img
                                                    src={course.image}
                                                    alt={course.name}
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                />
                                                <h3 className="font-semibold mb-2">{course.name}</h3>
                                                <p className="text-gray-600 mb-2">{course.description}</p>
                                                <p className="text-blue-600 font-bold">${course.price}</p>
                                                <div className="mt-4">
                                                    <h4 className="font-semibold mb-2">Features:</h4>
                                                    <ul className="space-y-1">
                                                        {course.features.map((feature, index) => (
                                                            <li 
                                                                key={index}
                                                                className="flex items-center gap-2 text-sm text-gray-600"
                                                            >
                                                                <span className="text-green-500">✓</span>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default CourseSelectionPrivatePage;