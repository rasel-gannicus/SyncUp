
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
    <TooltipProvider delayDuration={50}>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <NavLink
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            prefetch={true}
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black "
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="/finance-tracker"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black"
                prefetch={true}
              >
                <FaSackDollar className="h-5 w-5" />
                <span className="sr-only">Finance Tracker</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Finance Tracker</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="/notepad"
                className="flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black"
                prefetch={true}
              >
                <Notebook className="h-5 w-5" />
                <span className="sr-only">Add Note</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Add Note</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="/todoList"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black "
                prefetch={true}
              >
                <LucideListTodo className="h-5 w-5" />
                <span className="sr-only">Todo List</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Todo List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="/habit-tracker"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black "
                prefetch={true}
              >
                <AlarmClockCheck className="h-5 w-5" />
                <span className="sr-only">Habit Tracker</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Habit Tracker</TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip> */}

        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8  [&.active]:bg-blue-100  [&.active]:text-black"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
