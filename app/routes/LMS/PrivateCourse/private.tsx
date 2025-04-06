import LMSPrivateCourseTemplete from "~/components/template/LMS/PrivateCourse/private";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Private Course" }, // No href means this is the current page
];

export default function LMSPrivateCourse() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Private Course">
        <LMSPrivateCourseTemplete />
    </SideNavBar>
  )
}
