import React, { useState, useMemo, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FcEmptyTrash } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Table from "~/components/ui/table";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { LMSCreateCourseForm } from "./coursecreationform";
import { CourseEditDrawer } from "./CourseEdit";
import { AlertDelete } from "./AlertDelete";
import { fetchAllCourses } from "~/routes/LMS/CourseManagement/api";

const LMSCourseManagementMolecule = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef({});
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetchAllCourses();
    //             setData(response.courses);
    //         } catch (error) {
    //             console.error("Failed to fetch courses:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchCourses();
    // }, [refreshKey]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetchAllCourses();
                // Ensure we always set an array, even if response.courses is undefined
                setData(response?.courses ?? []);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setData([]); // Reset to empty array on error
            } finally {
                setLoading(false);
            }
        };
    
        fetchCourses();
    }, [refreshKey]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isAlertDialogClick = event.target.closest('[role="alertdialog"]');
            
            if (activeDropdown !== null &&
                dropdownRefs.current[activeDropdown] &&
                !dropdownRefs.current[activeDropdown].contains(event.target) &&
                !isAlertDialogClick) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeDropdown]);

    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setIsEditOpen(true);
        setActiveDropdown(null);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = useMemo(() => {
        return data.filter(course =>
            course.playlistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.subject?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const columns = useMemo(() => [
        {
            Header: "Playlist Name",
            accessor: "playlistName",
            Cell: ({ row }) => (
                <Link to={`/lms/course-management/${row.original._id}`}>
                    {row.original.playlistName}
                </Link>
            )
        },
        {
            Header: "Visibility",
            accessor: "visibility",
            Cell: ({ value }) => (
                <span className="capitalize">{value}</span>
            )
        },
        {
            Header: "Lectures",
            accessor: "lectures",
            Cell: ({ value }) => value || 'N/A'
        },
        {
            Header: "Level",
            accessor: "level",
            Cell: ({ value }) => value || 'N/A'
        },
        {
            Header: "Price",
            accessor: "price",
            Cell: ({ value }) => `₹${value}`
        },
        {
            Header: "Actions",
            Cell: ({ row }) => (
                <td className="px-6 py-0 whitespace-nowrap text-sm text-gray-500">
                    <div className="absolute" ref={(el) => (dropdownRefs.current[row.index] = el)}>
                        <button
                            onClick={() => handleDropdownToggle(row.index)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <FiMoreVertical className="h-5 w-5" />
                        </button>
                        {activeDropdown === row.index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                <div className="py-1">
                                    <button
                                        onClick={() => handleEditClick(row.original)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                    >
                                        <FiEdit2 className="mr-2" /> Edit Course
                                    </button>
                                    <button
                                        onClick={() => navigate(`/lms/course-management/${row.original._id}`)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                    >
                                        <FiEye className="mr-2" /> View Details
                                    </button>
                                    <AlertDelete 
                                        id={row.original._id} 
                                        onSuccess={() => setRefreshKey(prev => prev + 1)}
                                    >
                                        <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                                            <FiTrash2 className="mr-2" /> Delete
                                        </button>
                                    </AlertDelete>
                                </div>
                            </div>
                        )}
                    </div>
                </td>
            )
        }
    ], [activeDropdown, navigate]);

    if (loading) {
        return <div className="p-4">Loading courses...</div>;
    }

    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 border rounded-lg"
        >
            <div className="flex items-center justify-center">
                <FcEmptyTrash size={60} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 pt-5">No Courses Available</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
        </motion.div>
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg border ml-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-4">
                <div className="sm:mt-0 flex inline-flex items-center gap-2">
                    <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
                        + Add Course
                    </Button>
                    {isSheetOpen && (
                        <LMSCreateCourseForm
                            open={isSheetOpen}
                            onOpenChange={setIsSheetOpen}
                            onSuccess={() => setRefreshKey(prev => prev + 1)}
                        />
                    )}
                    <Button 
                        variant="outline"
                        onClick={() => setRefreshKey(prev => prev + 1)}
                    >
                        <TbReload />Reload
                    </Button>
                </div>
                <div className="mt-4 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-2 py-1 border border-gray-200 rounded-md"
                    />
                </div>
            </div>

            {filteredData.length === 0 ? (
                <EmptyState />
            ) : (
                <Table
                    columns={columns}
                    data={filteredData}
                    onViewClick={(id) => navigate(`/lms/course-management/${id}`)}
                />
            )}

            {isEditOpen && (
                <CourseEditDrawer
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    courseData={selectedCourse}
                    onSuccess={() => setRefreshKey(prev => prev + 1)} 
                />
                )} 
        </div>
    );
};

export default LMSCourseManagementMolecule;