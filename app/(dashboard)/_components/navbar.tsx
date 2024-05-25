import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () =>{
    return (
        <div className="flex p-3 border-b h-full items-center bg-white shadow-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    )
}   