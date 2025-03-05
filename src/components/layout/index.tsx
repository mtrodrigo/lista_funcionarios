import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router-dom"

export function Layout(){
    return(
        <div className="h-screen w-screen flex flex-col">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}