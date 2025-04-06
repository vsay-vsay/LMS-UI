import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import LMSCourseDetails from "~/components/template/LMS/PrivateCourse/detailsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Private Course", href: "/lms/private-course" },
  { label:  "Details Pages"}, // No href means this is the current page
];

export default function LMSPrivateCourseDetailsPage() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Private Course">
        <LMSCourseDetails />
    </SideNavBar>
  )
}
