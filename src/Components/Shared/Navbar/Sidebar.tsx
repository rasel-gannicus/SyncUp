import {
  AlarmClockCheck,
  Coins,
  Home,
  LineChart,
  LucideListTodo,
  Notebook,
  Package,
  Package2,
  Settings,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaSackDollar } from "react-icons/fa6";
import { NavLink } from "@/utils/Navlink/NavLink";

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex  ">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5 ">
        {/* <NavLink
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          prefetch={true}
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </NavLink> */}

        <NavLink
          href="/"
          className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
        >
          <Home className="h-5 w-5" />
          <span className=" text-center text-xs font-medium">Home</span>
        </NavLink>

        <NavLink
          href="/finance-tracker"
          className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
          prefetch={true}
        >
          <FaSackDollar className="h-5 w-5" />
          <span className=" text-center text-xs font-medium">Finance Tracker</span>
        </NavLink>

        <NavLink
          href="/notepad"
          className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
          prefetch={true}
        >
          <Notebook className="h-5 w-5" />
          <span className=" text-center text-xs font-medium">Notepad</span>
        </NavLink>

        <NavLink
          href="/todoList"
          className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
          prefetch={true}
        >
          <LucideListTodo className="h-5 w-5" />
          <span className=" text-center text-xs font-medium">Todo List</span>
        </NavLink>

        <NavLink
          href="/habit-tracker"
          className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
          prefetch={true}
        >
          <AlarmClockCheck className="h-5 w-5" />
          <span className=" text-center text-xs font-medium">Habit Tracker</span>
        </NavLink>

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavLink
          href="#"
          className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only ">Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
