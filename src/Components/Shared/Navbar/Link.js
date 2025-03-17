import aiImg from "@/assets/Logo/artificial-intelligence.png";
import {
  AlarmClockCheck,
  Home,
  LucideListTodo,
  Notebook
} from "lucide-react";
import Image from "next/image";
import { FaSackDollar } from 'react-icons/fa6'; 
  
  export const LinkArray = [
    {
      hrefLink: "/",
      iconForSidebarMenu: () => <Home className="h-5 w-5" />,
      linkTitle: 'Home',
    },
    {
      hrefLink: "/text-processing",
      iconForSidebarMenu: () => (
        <div className="h-5 w-5 relative">
          <Image 
            src={aiImg} 
            alt="ai" 
            fill 
            className="object-contain"
          />
        </div>
      ),
      linkTitle: 'Text Processor',
    },
    {
      hrefLink: "/finance-tracker",
      iconForSidebarMenu: () => <FaSackDollar className="h-5 w-5" />,
      linkTitle: 'Finance Tracker',
    },
    {
      hrefLink: "/habit-tracker",
      iconForSidebarMenu: () => <AlarmClockCheck className="h-5 w-5" />,
      linkTitle: 'Habit Tracker',
    },
    {
      hrefLink: "/notepad",
      iconForSidebarMenu: () => <Notebook className="h-5 w-5" />,
      linkTitle: 'Notepad',
    },
    {
      hrefLink: "/todoList",
      iconForSidebarMenu: () => <LucideListTodo className="h-5 w-5" />,
      linkTitle: 'Todo List',
    },
  ];