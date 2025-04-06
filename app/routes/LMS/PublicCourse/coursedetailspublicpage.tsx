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
  { label: "Public Course", href: "/lms/public-course" },
  { label:  "Details Pages"}, // No href means this is the current page
];

export default function LMSPublicCourseDetailsPage() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Public Course">
        <LMSCourseDetails />
    </SideNavBar>
  )
}
