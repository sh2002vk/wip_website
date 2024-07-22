import SideBar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/3">
                <SideBar />
            </div>
            <div className="flex-grow md:w-2/3 md:overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
