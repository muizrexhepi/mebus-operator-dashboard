import {
  Home,
  Package,
  Box,
  Truck,
  QrCode,
  BookOpen,
  Users2,
  Globe,
  BarChart2Icon,
} from "lucide-react";

export const NAV_LINKS = [
  {
    title: "Lines",
    icon: Package,
    description: "Manage bus lines, routes, and ticketing.",
    items: [
      {
        title: "Create Line",
        href: "/lines/create",
        description: "Set up a new bus line and define its route.",
      },
      {
        title: "Edit Lines",
        href: "/lines/edit",
        description: "Modify existing bus lines and update their routes.",
      },
      {
        title: "Create Tickets",
        href: "/lines/tickets/create",
        description: "Generate tickets for specific lines and trips.",
      },
    ],
  },
  {
    title: "Documents",
    icon: BookOpen,
    description: "Manage and review necessary documents.",
    items: [
      {
        title: "Driver Documents",
        href: "/documents/driver",
        description: "View and upload documents required for drivers.",
      },
      {
        title: "Bus Documents",
        href: "/documents/bus",
        description: "Manage documents related to buses, such as licenses.",
      },
      {
        title: "Expired Documents",
        href: "/documents/expired",
        description: "Review and renew expired or expiring documents.",
      },
    ],
  },
  {
    title: "Employees",
    icon: Users2,
    description: "Manage your staff and their roles.",
    items: [
      {
        title: "Manage Employees",
        href: "/employees/manage",
        description: "View and manage employee information and roles.",
      },
      {
        title: "Add Employee",
        href: "/employees/add",
        description: "Add new employees to your organization.",
      },
    ],
  },
  {
    title: "Reports",
    icon: BarChart2Icon,
    description: "Analyze bookings and sales performance.",
    items: [
      {
        title: "Booking Reports",
        href: "/reports/bookings",
        description: "View detailed reports on bookings made.",
      },
      {
        title: "Sales Reports",
        href: "/reports/sales",
        description: "Analyze sales data to track revenue and trends.",
      },
      {
        title: "Online Services",
        href: "/online",
        description: "Access and manage online services related to your operations.",
      },
    ],
  },

];
