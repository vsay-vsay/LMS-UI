import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import LMSUpdateCourseDetailstemplate from "~/components/template/LMS/CourseManagement/detailsPage";
import { ToastProvider } from "~/components/ui/toast-container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Course Management", href: "/lms/course-management" },
  { label:  "Details Pages"}, // No href means this is the current page
];

export default function LMSCourseDetailsPage() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Course Management">
      <ToastProvider>
        <LMSUpdateCourseDetailstemplate />
      </ToastProvider>
    </SideNavBar>
  )
}
