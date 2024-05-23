import { Link  } from "react-router-dom"


export const Topbar = () => {
    return <div className="max-w-screen-lg w-full bg-black min-h-56 align-center px-5 pb-5 pt-8">
            {/* <img src="/logo.png" alt="logo"  className="max-w-56"/> */}
            <div className="text-8xl text-white">
                UpEducative
            </div>
            <Navbar/>
        </div>
}

const topbarItems = [
    {
        title: "About",
        route: "/about"
    },
    {
       title: "Activity",
       route: "/activity"
    },
    {
        title: "Problems",
        route: "/problems"
    }, 
    {
        title: "Leaderboard",
        route: "/leaderboard"
    }
]
function Navbar(){
    return <div className="flex mt-4">
        {topbarItems.map(item => <NavbarItem route = {item.route } title = {item.title} />)}
    </div>
}


function NavbarItem({title, route}: {
    title: string;
    route: string;
}){
    return <Link to={title}> <div className="mr-10 text-slate-500 text-lg cursor-pointer hover:text-white text-base font-light">
            {title}  

        </div>
    </Link>
}