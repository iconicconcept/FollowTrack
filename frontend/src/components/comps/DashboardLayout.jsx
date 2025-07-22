import React, { useContext} from "react";
import { UserContext } from "@/context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, activeMenu })=>{
    const { user } = useContext(UserContext);
    return(
        <div className="">
            <Navbar activeMenu={activeMenu} />

            <div className="mt-16 mx-auto max-w-[1300px] min-h-screen bg-background"> {/* This wrapper pushes the entire content area down */}
                {user && (
                    <div className="flex">
                        <div className="max-[1000px]:hidden">
                            <Sidebar activeMenu={activeMenu}/>
                        </div>
 
                        <div className="grow mx-5 max-w-[1000px]">{children}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardLayout