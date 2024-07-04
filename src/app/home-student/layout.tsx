import SideBar from "@/app/ui-student/home/sidebar";

export default function Layout({children}:  {children: React.ReactNode}) {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="w-full flex-none md:w-64">
                <SideBar />
            </div>
            <div className="flex-grow md:overflow-y-auto">{children}</div>
        </div>
    );
}