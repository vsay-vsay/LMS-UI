import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import LMSCourseManagementTemplete from "~/components/template/LMS/CourseManagement/usermanagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Course Management" }, // No href means this is the current page
];

export default function LMSCourseManagement() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Course Management">
        <LMSCourseManagementTemplete />
    </SideNavBar>
  )
}
