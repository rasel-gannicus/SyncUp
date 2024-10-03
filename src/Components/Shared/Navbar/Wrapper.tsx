import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Topbar />
        <main className="grid ">
          {children}
        </main>
      </div>
    </div>
  );
}
