import React from "react";


const ProjectItem = ({img, title}) =>{
    return (
        <div className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl group hover:bg-gradient-to-r from-gray-200 to-[#26acff]">
            <img src={img} alt="" className="rounded-xl transition-opacity duration-300 opacity-100 group-hover:opacity-20" />
            <div className="hidden group-hover:block absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <h3 className="font-bold text-[#001b5e] text-xl tracking-wider text-center mb-5">
                    {title}
                </h3>
                {/* Might use this to identify what the project is. Displays 'React JS under the Card title. Might delete if not used */}
                {/* <p className="pb-4 pt-2 text-white text-center">React JS</p>  */}
                <a href="/">
                    <p className="text-center p-3 rounded-md bg-white text-gray-600 font-bold cursor-pointer text-lg">More Info</p>
                </a>
            </div>
        </div>
    )
    
}

export default ProjectItem