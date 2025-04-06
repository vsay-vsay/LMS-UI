import * as React from "react"
import { AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, SquareTerminal } from "lucide-react"
import { NavMain } from "~/components/molecule/nav-main"
import { NavProjects } from "~/components/molecule/nav-projects"
import { NavUser } from "~/components/molecule/nav-user"
import { TeamSwitcher } from "~/components/molecule/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "~/components/ui/sidebar"

// Function to get role-based data
const getRoleBasedData = () => {
  if (typeof window === "undefined") return { navMain: [], projects: [], teams: [], user: {} }
  const role = localStorage.getItem("role") || "Admin" // Default to Admin if role is not found

  let data = {
    user: {
      name: "kaal1",
      email: "kaaldvn@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "VSAY LMS.", logo: AudioWaveform, plan: "Startup" },
      { name: "VSAY ERP", logo: GalleryVerticalEnd, plan: "Enterprise" },
      { name: "VSAY LMS.", logo: AudioWaveform, plan: "Startup" },
      { name: "VSAY Inventory", logo: Command, plan: "Free" },
    ],
    navMain: [],
    projects: [],
  }

  switch (role) {
    case "Admin":
      data.navMain = [
        { title: "Dashboard", url: "/lms/admin-dashboard", icon: SquareTerminal, isActive: true },
        { title: "My Learning", url: "/lms/mylearning", icon: Bot },
        { title: "Public Course", url: "/lms/public-course", icon: Bot },
        { title: "Private Course", url: "/lms/private-course", icon: Bot },
        { title: "Course Management", url: "/lms/course-management", icon: Bot },
      ]
      data.projects = [
        { name: "User Management", url: "/lms/user-management", icon: Frame },
        { name: "Security", url: "/lms/security", icon: Map },
        { name: "Settings", url: "/lms/settings", icon: Map },
        { name: "Licence", url: "/lms/licence", icon: Map },
      ]
      break

    case "Tutor":
      data.navMain = [
        { title: "Dashboard", url: "/lms/tutor-dashboard", icon: SquareTerminal, isActive: true },
        { title: "My Learning", url: "/lms/mylearning", icon: Bot },
        { title: "Public Course", url: "/lms/public-course", icon: Bot },
        { title: "Private Course", url: "/lms/private-course", icon: Bot },
        { title: "Course Management", url: "/lms/course-management", icon: Bot },
        { title: "Settings", url: "/lms/settings", icon: Map },
      ]
      break

    case "Student":
      data.navMain = [
        { title: "Dashboard", url: "/lms/tutor-dashboard", icon: SquareTerminal, isActive: true },
        { title: "My Learning", url: "/lms/mylearning", icon: Bot },
        { title: "Public Course", url: "/lms/public-course", icon: Bot },
        { title: "Private Course", url: "/lms/private-course", icon: Bot },
        { name: "Settings", url: "/lms/settings", icon: Map },
      ]
      break

    case "Accountant":
      data.navMain = [
        { title: "Dashboard", url: "/lms/tutor-dashboard", icon: SquareTerminal, isActive: true },
        { title: "My Learning", url: "/lms/mylearning", icon: Bot },
        { title: "Public Course", url: "/lms/public-course", icon: Bot },
        { title: "Private Course", url: "/lms/private-course", icon: Bot },
        { name: "Settings", url: "/lms/settings", icon: Map },
      ]
      break

    default:
      break
  }

  return data
}

export function AppSidebar({ enableSidebar="Dashboard",...props }: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = React.useState(getRoleBasedData())

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setData(getRoleBasedData()); // Fetch data only in the browser
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} enableSidebar={enableSidebar}/>
        {data.projects.length > 0 && <NavProjects projects={data.projects} enableSidebar={enableSidebar}/>}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


