// sidebar-menu-items.ts
import { Home, BookOpen, User, Settings, Users, FileText, BarChart2, Calendar, PlusCircle } from "lucide-react";

export const studentMenu = [
  {
    title: "Overview",
    icon: Home,
    path: "/dashboard/student",
  },
  {
    title: "Notes",
    icon: BookOpen,
    path: "/student/notes",
    children: [
      { title: "Create Notes", path: "/dashboard/student/notes/create" },
      // { title: "My Notes", path: "/dashboard/student/notes/" }, 
      { title: "Shared Notes", path: "/dashboard/student/notes/shared" },
      { title: "All Notes", path: "/dashboard/student/notes/all" },
    ],
  },
  {
    title: "Quizzes",
    icon: FileText,
    path: "/student/quizzes",
    children: [
      { title: "My Quizzes", path: "/student/quizzes/my" },
      { title: "Attempt Quiz", path: "/student/quizzes/attempt" },
    ],
  },
  {
    title: "Profile",
    icon: User,
    path: "/student/profile",
  },
];

export const teacherMenu = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/teacher/dashboard",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/teacher/courses",
    children: [
      { title: "My Courses", path: "/teacher/courses/my-courses" },
      { title: "Add Course", path: "/teacher/courses/add" },
      { title: "All Courses", path: "/teacher/courses/all" },
    ],
  },
  {
    title: "Students",
    icon: Users,
    path: "/teacher/students",
    children: [
      { title: "Student List", path: "/teacher/students/list" },
      { title: "Add Student", path: "/teacher/students/add" },
    ],
  },
  {
    title: "Notes",
    icon: FileText,
    path: "/teacher/notes",
    children: [
      { title: "All Notes", path: "/teacher/notes/all" },
      { title: "Create Note", path: "/teacher/notes/create" },
    ],
  },
  {
    title: "Profile",
    icon: User,
    path: "/teacher/profile",
  },
];

export const adminMenu = [
  {
    title: "Overview",
    icon: Home,
    path: "/admin/overview",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
    children: [
      { title: "All Students", path: "/admin/users/students" },
      { title: "All Teachers", path: "/admin/users/teachers" },
      { title: "Create User", path: "/admin/users/create" },
    ],
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/admin/courses",
    children: [
      { title: "All Courses", path: "/admin/courses/all" },
      { title: "Create Course", path: "/admin/courses/create" },
    ],
  },
  {
    title: "Notes",
    icon: FileText,
    path: "/admin/notes",
    children: [
      { title: "All Notes", path: "/admin/notes/all" },
      { title: "Create Note", path: "/admin/notes/create" },
    ],
  },
  {
    title: "Questions",
    icon: FileText,
    path: "/admin/questions",
    children: [
      { title: "All Questions", path: "/admin/questions/all" },
      { title: "Create Question", path: "/admin/questions/create" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart2,
    path: "/admin/reports",
    children: [
      { title: "User Reports", path: "/admin/reports/users" },
      { title: "Course Reports", path: "/admin/reports/courses" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];
