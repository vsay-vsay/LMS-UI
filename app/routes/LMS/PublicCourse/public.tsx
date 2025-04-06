import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import LMSPublicCourseTemplete from "~/components/template/LMS/PublicCourse/public";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Public Course" }, // No href means this is the current page
];

export default function LMSPublicCourse() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Public Course">
        <LMSPublicCourseTemplete />
    </SideNavBar>
  )
}
