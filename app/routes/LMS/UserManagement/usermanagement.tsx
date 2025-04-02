import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import LMSUserManagementTemplete from "~/components/template/LMS/UserManagement/usermanagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "User Management" }, // No href means this is the current page
];

export default function LMSUserManagement() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="User Management">
        <LMSUserManagementTemplete />
    </SideNavBar>
  )
}
