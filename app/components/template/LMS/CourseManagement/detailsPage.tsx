// import React, { useState, useEffect } from "react";
// import { FiClock, FiBook, FiAward, FiUser, FiStar } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Button } from "~/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "~/components/ui/accordion"
// import { CourseAddSectionForm } from "~/components/molecule/LMS/CourseManagement/CourseDetails/courseAddSection";
// import AddSectionContent from "~/components/molecule/LMS/CourseManagement/CourseDetails/addsectionContent";

// const LMSUpdateCourseDetailstemplate = () => {
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [mounted, setMounted] = useState(false);
//   const [data, setData] = useState([]);
//       const [loading, setLoading] = useState(true);
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: true
//   });

//   useEffect(() => {
//           const fetchCourses = async () => {
//               try {
//                   setLoading(true);
//                   const response = await fetchAllCourses();
//                   setData(response.courses);
//               } catch (error) {
//                   console.error("Failed to fetch courses:", error);
//               } finally {
//                   setLoading(false);
//               }
//           };
  
//           fetchCourses();
//       }, [refreshKey]);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   const courseData = {
//     title: "Advanced Web Development Masterclass",
//     price: 99.99,
//     discountedPrice: 79.99,
//     thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
//     description: "Master modern web development with this comprehensive course covering React, Node.js, and advanced JavaScript concepts.",
//     level: "Intermediate",
//     duration: "20 hours",
//     lectures: 150,
//     instructor: {
//       name: "Dr. Sarah Johnson",
//       photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//       bio: "Senior Software Engineer with 10+ years of teaching experience",
//       experience: "12 years"
//     },
//     modules: [
//       { title: "Introduction to Modern Web Development", duration: "2 hours" },
//       { title: "Advanced JavaScript Concepts", duration: "4 hours" },
//       { title: "React Fundamentals & Hooks", duration: "6 hours" },
//       { title: "Backend Development with Node.js", duration: "8 hours" }
//     ]
//   };

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="relative h-[60vh] w-full overflow-hidden">
//         <img
//           src={courseData.thumbnail}
//           alt={courseData.title}
//           className="w-full h-full object-cover"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-white max-w-3xl"
//             >
//               <h1 className="text-4xl md:text-6xl font-bold mb-4">{courseData.title}</h1>
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="text-3xl font-bold">${courseData.discountedPrice}</span>
//                 <span className="text-xl line-through text-gray-400">${courseData.price}</span>
//                 <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">20% OFF</span>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0 }}
//         animate={inView ? { opacity: 1 } : {}}
//         className="container mx-auto px-4 py-12"
//       >
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
//             <p className="text-gray-600 mb-8">{courseData.description}</p>
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               <div className="flex items-center gap-2">
//                 <FiClock className="text-blue-600" />
//                 <span>{courseData.duration}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiBook className="text-blue-600" />
//                 <span>{courseData.lectures} lectures</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiAward className="text-blue-600" />
//                 <span>{courseData.level}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiUser className="text-blue-600" />
//                 <span>Certificate</span>
//               </div>
//             </div>
//             <div className="flex justify-between items-center">
//             <h3 className="text-2xl font-bold mb-4">Course Curriculum</h3>
//               <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
//                 + Add Section
//               </Button>
//               {isSheetOpen && (
//                 <CourseAddSectionForm
//                   open={isSheetOpen}
//                   onOpenChange={setIsSheetOpen}
//                   onSuccess={() => setRefreshKey(prev => prev + 1)}
//                 />
//               )}
//             </div>
//             <div className="py-4">
//               <Accordion type="single" collapsible className="w-full space-y-4">
//                 <AccordionItem value="item-1" className="border rounded-lg px-4 hover:shadow-md transition-shadow">
//                   <AccordionTrigger>Is it accessible?</AccordionTrigger>
//                   <AccordionContent>
//                     <AddSectionContent />
//                   </AccordionContent>
//                 </AccordionItem>
//                 <AccordionItem value="item-2" className="border rounded-lg px-4 hover:shadow-md transition-shadow">
//                   <AccordionTrigger>Is it accessible?</AccordionTrigger>
//                   <AccordionContent>
//                     Yes. It adheres to the WAI-ARIA design pattern.
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             </div>
//           </div>
//           <div className="md:col-span-1">
//             <div className="sticky top-4">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-center gap-4 mb-6">
//                   <img
//                     src={courseData.instructor.photo}
//                     alt={courseData.instructor.name}
//                     className="w-16 h-16 rounded-full object-cover"
//                     loading="lazy"
//                   />
//                   <div>
//                     <h4 className="font-bold">{courseData.instructor.name}</h4>
//                     <p className="text-gray-600 text-sm">{courseData.instructor.bio}</p>
//                   </div>
//                 </div>
//                 <div className="border-t pt-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FiStar className="text-yellow-400" />
//                     <span>4.9 Course Rating</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FiUser className="text-blue-600" />
//                     <span>{courseData.instructor.experience} Teaching Experience</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LMSUpdateCourseDetailstemplate;

import React, { useState, useEffect } from "react";
import { FiClock, FiBook, FiAward, FiUser, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router";
import { fetchCourseById } from "../../../../routes/LMS/PrivateCourse/api";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { CourseAddSectionForm } from "~/components/molecule/LMS/CourseManagement/CourseDetails/courseAddSection";
import AddSectionContent from "~/components/molecule/LMS/CourseManagement/CourseDetails/addsectionContent";

interface CourseData {
  _id: string;
  playlistName: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  time: string;
  lectures: string;
  tutor?: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
  };
  sections?: Array<{
    _id: string;
    title: string;
    time: string;
  }>;
}

const LMSCourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const data = await fetchCourseById(id!);
        setCourseData(data);
      } catch (err) {
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadCourseData();
  }, [id]);

//   useEffect(() => {
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/1200x600.png?text=Course+Thumbnail';
    target.className = 'w-full h-full object-contain bg-gray-100 p-4';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading course details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!courseData) return null;

  const mappedData = {
    title: courseData.playlistName,
    price: courseData.price,
    thumbnail: courseData.thumbnail,
    description: courseData.description,
    level: courseData.level,
    duration: courseData.time,
    lectures: courseData.lectures,
    instructor: {
      name: courseData.tutor?.name || "Unknown Instructor",
      photo: courseData.tutor?.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: courseData.tutor?.email || "No bio available",
    },
    modules: courseData.sections?.map(section => ({
      title: section.title,
      duration: section.time
    })) || []
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Improved Image Handling */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        <img
          src={mappedData.thumbnail}
          alt={mappedData.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
        )}

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {mappedData.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">
                  ₹{mappedData.price}
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Lifetime Access
                </span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
                Enroll Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="container mx-auto px-4 py-12"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {mappedData.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <FiClock className="text-blue-600 text-xl" />
                <span>{mappedData.duration} Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <FiBook className="text-blue-600 text-xl" />
                <span>{mappedData.lectures} Lectures</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <FiAward className="text-blue-600 text-xl" />
                <span>{mappedData.level}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <FiUser className="text-blue-600 text-xl" />
                <span>Certificate</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold mb-4">Course Curriculum</h3>
              <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
                + Add Section
              </Button>
              {isSheetOpen && (
                <CourseAddSectionForm
                  open={isSheetOpen}
                  onOpenChange={setIsSheetOpen}
                  onSuccess={() => setRefreshKey(prev => prev + 1)}
                />
              )}
            </div>
            <div className="py-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-4 hover:shadow-md transition-shadow">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    <AddSectionContent />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border rounded-lg px-4 hover:shadow-md transition-shadow">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {/* <div className="space-y-4">
              {mappedData.modules.map((module, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">{module.title}</h4>
                    <span className="text-gray-500 text-sm">{module.duration}</span>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Instructor Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={mappedData.instructor.photo}
                    alt={mappedData.instructor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    onError={handleImageError}
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {mappedData.instructor.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {mappedData.instructor.bio}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiStar className="text-yellow-400" />
                    <span className="text-gray-600">4.9 Course Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-blue-600" />
                    <span className="text-gray-600">10+ Years Experience</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <h4 className="font-bold text-lg mb-2">Course Includes</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ Lifetime Access</li>
                  <li>✓ Certificate of Completion</li>
                  <li>✓ 30-Day Money Back Guarantee</li>
                  <li>✓ Q&A Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LMSCourseDetails;