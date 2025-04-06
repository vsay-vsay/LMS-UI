import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Login/login.tsx"),
    route("select-org", "routes/Login/select-org.tsx"),
    // //ERP routes
    // route("erp/admin-dashboard", "routes/ERP/Dashboard/admin-dashboard.tsx"),
    // route("erp/student-dashboard", "routes/ERP/Dashboard/student-dashboard.tsx"),
    // route("erp/teacher-dashboard", "routes/ERP/Dashboard/teacher-dashboard.tsx"),
    // route("erp/accountant-dashboard", "routes/ERP/Dashboard/accuntant-dashboard.tsx"),
    // route("erp/user-management", "routes/ERP/UserManagement/usermanagement.tsx"),
    // // route("erp/user-management/:id", "routes/ERP/UserManagement/userdetailspage.tsx"),
    // route("erp/events", "routes/ERP/Events/events.tsx"),
    // // route("erp/timetable", "routes/ERP/Timetable/timetable.tsx"),
    // route("erp/class-management", "routes/ERP/ClassManagement/classmanagement.tsx"),
    // route("erp/class-management/:id", "routes/ERP/ClassManagement/classDetails.tsx"),

    // LMS Routes
    route("lms/admin-dashboard", "routes/LMS/Dashboard/admin-dashboard.tsx"),
    route("lms/user-dashboard", "routes/LMS/Dashboard/user-dashboard.tsx"),
    route("lms/tutor-dashboard", "routes/LMS/Dashboard/tutor-dashboard.tsx"),
    route("lms/user-management", "routes/LMS/UserManagement/usermanagement.tsx"),
    route("lms/private-course", "routes/LMS/PrivateCourse/private.tsx"),
    route("lms/public-course", "routes/LMS/PublicCourse/public.tsx"),
    route("lms/private-course/:id", "routes/LMS/PrivateCourse/coursedetailsprivatepage.tsx"),
    route("lms/public-course/:id", "routes/LMS/PublicCourse/coursedetailspublicpage.tsx"),
    route("lms/course-management", "routes/LMS/CourseManagement/courcemanagement.tsx"),
    route("lms/course-management/:id", "routes/LMS/CourseManagement/courseDetailspage.tsx"),
] satisfies RouteConfig;
