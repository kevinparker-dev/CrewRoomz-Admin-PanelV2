
import { Blocks } from 'lucide-react';
import { User } from 'lucide-react';
import { Car } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import { File } from 'lucide-react';
import { Bell } from 'lucide-react';
import { MessageSquareWarning } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { House } from 'lucide-react';



export const sidebarData = [
  {
    title: "Dashboard",
    icon:  <House />,
    link: "/app/dashboard",
  },
  {
    title: "User Management",
    icon:  <User />,
    link: "/app/users",
  },
  {
    title: "Booking Management",
    icon: <Calendar />,
    link: "/app/bookings",
  },
    {
    title: "Reported Issues",
    icon: <MessageSquareWarning />,
    link: "/app/reported-issues",
  },

 {
    title: "Push Notifications",
    icon: <Bell />,
    link: "/app/notifications",
  },

  {
    title: "Transaction Overview",
    icon: <Bell />,
    link: "/app/transactions",
  },

  // {
  //   title: "Push Notifications",
  //   icon: <Bell />,
  //   link: "/app/notifications",
  // },
];
