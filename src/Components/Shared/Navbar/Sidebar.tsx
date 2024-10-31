import { NavLink } from "@/utils/Navlink/NavLink";
import { LinkArray } from "./Link";

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex  ">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5overflow-y-auto overflow-x-hidden">
        <div className=""></div>
    
        {LinkArray.map((link) => (
          <NavLink
            key={link.hrefLink}
            href={link.hrefLink}
            className="flex h-16 w-16  items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground  md:h-16 md:w-16 flex-col gap-y-1 [&.active]:bg-blue-100   [&.active]:text-black"
            prefetch={true}
          >
            {link.iconForSidebarMenu()}
            {/* <Image src={link.iconForSidebarMenu} alt="ai" className="h-5 w-5" width={20} height={20} /> */}
            <span className=" text-center text-xs font-medium">
              {link.linkTitle}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
