import { 
  Home, Inbox, Calendar, Search, Settings, FileText, User, Briefcase, Pen, FilePenLine 
} from "lucide-react";

// Sidebar item type
export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
  children?: SidebarItem[];
}

// ---------------- Admin Menu ----------------
export const adminMenu: SidebarItem[] = [
  { title: "Home", url: "/dashboard/admin", icon: Home },
  { title: "Users", url: "/dashboard/admin/users", icon: User },
  {
    title: "Jobs",
    url: "/dashboard/admin/jobs",
    icon: Briefcase,
    children: [
      { title: "Pending Jobs", url: "/dashboard/admin/jobs/pending", icon: FileText },
      { title: "Completed Jobs", url: "/dashboard/admin/jobs/completed", icon: FileText },
    ],
  },
  { title: "Reports", url: "/dashboard/admin/reports", icon: FileText },
  { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
];

// ---------------- User Menu ----------------
export const userMenu: SidebarItem[] = [
  { title: "Home", url: "/dashboard/user", icon: Home },
  { title: "My Jobs", url: "/dashboard/user/jobs", icon: Inbox },
  { title: "Search Jobs", url: "/dashboard/user/search", icon: Search },
  { title: "Profile", url: "/dashboard/user/profile", icon: Settings },
];

// ---------------- Provider Menu ----------------
// Accepts optional dynamic jobId for the Update Job link
export const getProviderMenu = (jobId?: string): SidebarItem[] => [
  { title: "Home", url: "/dashboard/provider", icon: Home },
  {
    title: "Jobs",
    url: "/dashboard/provider/job",
    icon: Briefcase,
    children: [
      { title: "Create Job", url: "/dashboard/provider/job/create", icon: Pen },
      {
        title: "Update Job",
        url: jobId ? `/dashboard/provider/job/${jobId}` : "/dashboard/provider/job",
        icon: FilePenLine,
      },
    ],
  },
  { title: "Assigned Jobs", url: "/dashboard/provider/jobs", icon: Inbox },
  { title: "Available Jobs", url: "/dashboard/provider/search", icon: Search },
  { title: "Profile", url: "/dashboard/provider/profile", icon: Settings },
];

// ---------------- Export ----------------
// Unified access for all roles
export const menuItems: Record<
  string,
  SidebarItem[] | ((jobId?: string) => SidebarItem[])
> = {
  admin: adminMenu,
  user: userMenu,
  provider: getProviderMenu,
};
