import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import LMSAdminTemplete from "~/components/template/LMS/Dashboard/admin"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Dashboard" }, // No href means this is the current page
];

export default function ERPAdminDashboard() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Dashboard">
        <LMSAdminTemplete role="User"/>
    </SideNavBar>
  )
}
