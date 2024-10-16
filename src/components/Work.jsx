import React from 'react'
import WorkItem from './WorkItem'
// WorkItem above might need to change to just Work
const data = [
    {
        year: "Apr 2024 - Present",
        company: "Diaz Martial Arts",
        title: 'Software Engineer/Brazilian Jiu-Jitsu Instructor',
        details: "Optimized Brazilian Jiu-Jitsu program operations by enhancing instruction and managing schedules, developed a SPA for Crazy 8s Grappling Club with React/Vite, and designed a VOD app to improve content delivery and engagement for affiliate schools."
    },
    {
        year: "Apr 2024 - Present",
        company: "HSNBA",
        title: 'Data Engineer/SQL Developer',
        details: 'Automated data management for shelter records with Python, streamlining SQL database updates and reducing data entry time by 40%, while collaborating on foster dog socialization, adoption readiness, and high-risk rehabilitation.',
    },
    {
        year: "Jan 2023 - Present",
        company: '100 Devs',
        title: 'Software Engineer',
        details: 'Built modern, responsive web applications with developers and designers, using scalable architecture and agile practices to reduce deployment times by 30%, and enhanced open-source education projects, benefiting 10,000+ aspiring developers.'
    },
    {
        year: "Apr 2021 - Present",
        company: "Texas Malibu",
        title: 'Sales Associate',
        details: "Digitized inventory management for three stores, grew Malibu Boats' market share in central Texas from 30% to 40.1%, and mentored junior associates to ensure seamless team integration and improved performance.",
    },

    {
        year: "Nov 2019 - Apr 2021",
        company: "Motovation USA",
        title: 'E-commerce Solutions Specialist',
        details: "Expanded product offerings with dropshipping, automated order processing and stock monitoring using Python, and optimized content for social media, driving 125%+ organic growth and improved operational efficiency.",
    },
]

const Work = () => {
    return (
        <div id='work' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
            <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Work</h1>
            {data.map((item, idx) => (
                <WorkItem
                    key={idx}
                    year={item.year}
                    company={item.company}
                    title={item.title}
                    details={item.details}
                />
            ))}
        </div>
    )
}

export default Work