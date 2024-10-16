import React from "react";
import ProjectItem from './ProjectItem'
// import AMD_graph from '../assets/AMD_graph.png'
import QR_generator from '../assets/QR_generator.png'
import pipBoy from '../assets/pipBoy.png'
import crazy8 from '../assets/crazy8logo.jpeg'
import pythonPortfolio from '../assets/pythonportfolio.jpg'


const Projects = () => {
    return (
        <div id="projects" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
            <h1 className="text-4xl font-bold text-center text-[#001b5e]">Projects</h1>
            <p className="text-center p-10 text-gray-500">
                {/*Caption space below Projects heading goes here */}
            </p>
            <section className="grid sm:grid-cols-2 gap-12">
                <ProjectItem img={pythonPortfolio} title='Humane Society Data Engineering and SQL development' url="https://github.com/codyjohnsontx/jpeg_unnamed" />
                <ProjectItem img={pipBoy} title='Pip Boy Terminal' url="https://stupendous-babka-93ba5a.netlify.app/" />
                <ProjectItem img={QR_generator} title='QR Generator' url="https://qrcodegenerator-jonhnson.netlify.app/" />
                <ProjectItem img={crazy8} title='Crazy8s Grappling Club' url="https://github.com/codyjohnsontx/crazy8site" />
            </section>
        </div>
    );
};

export default Projects;
