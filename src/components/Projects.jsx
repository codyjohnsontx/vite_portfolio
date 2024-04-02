import React from "react";
import ProjectItem from './ProjectItem'
import AMD_graph from '../assets/AMD_graph.png'
import Currency_converter from '../assets/Currency_converter.png'
import QR_generator from '../assets/QR_generator.png'
import Ron_swanson from '../assets/Ron_swanson.png'


const Projects = () => {
    return (
            <div id="projects" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
                <h1 className="text-4xl font-bold text-center text-[#001b5e]">Projects</h1>
                <p className="text-center p-10 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel consequatur illum sed suscipit nesciunt ea explicabo corrupti libero, hic, maiores repudiandae voluptate enim nobis totam incidunt dolores quae quisquam atque?
                </p>
                <section className="grid sm:grid-cols-2 gap-12" >
                    <ProjectItem img={Currency_converter} title='Currency Converter' />
                    <ProjectItem img={QR_generator} title='QR Generator' />
                    <ProjectItem img={Ron_swanson} title='Ron Swanson Generator' />
                    <ProjectItem img={AMD_graph} title='Insider-Outsider Project' />

                </section>
            </div>
    )
}

export default Projects