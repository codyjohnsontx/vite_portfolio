import React from 'react'
import WorkItem from './WorkItem'
// WorkItem above might need to change to just Work
const data = [
    {
        year: "Jul 2024 - Present",
        company: "Diaz Martial Arts",
        title: 'Software Engineer/Brazilian Jiu-Jitsu Instructor',
        details: "Developed instructional and management skills by leading classes and managing administrative tasks, while building a SPA for Crazy8's Grappling Club using React/Vite, which increased attendance by 14% in 3 months. Currently prototyping and wireframing an educational VOD app to deliver content for affiliate schools."
    },
    {
        year: "Aug 2023 - Present",
        company: "Ducati Austin",
        title: 'Software Engineer',
        details: 'Pioneered the ongoing transition to a more dynamic and responsive website platform utilizing Shopify and later a custom built React site. Played a pivotal role in designing and constructing innovative website mock-ups, setting the stage for a comprehensive website overhaul aimed at enhancing user experience and optimizing operational efficiency.',
    },
    {
        year: "Jan 2023 - Present",
        company: '100 Devs',
        title: 'Software Engineer',
        details: 'Collaborated with developers and designers to build modern, responsive web applications, applying industry best practices and agile methodologies. Leveraged full-stack expertise to design scalable, maintainable solutions and contributed to educational open-source projects that make technical knowledge accessible to aspiring developers.'
    },
    {
        year: "Apr 2021 - Present",
        company: "Texas Malibu",
        title: 'Content & Fulfillment specialist',
        details: "Implemented digital inventory management processes across three stores, boosting efficiency and customer retention while expanding Malibu boat's market share in central Texas from 30% to 40.1%. Trained junior sales associates during onboarding, providing guidance on procedures, product knowledge, and sales techniques for seamless integration and success.",
    },

    {
        year: "Nov 2019 - Apr 2021",
        company: "Motovation USA",
        title: 'Sales Associate/CMS',
        details: "Led digital marketing initiatives, including social media campaigns and order fulfillment, to enhance customer experience and drive sales growth. Implemented dropshipping strategies for efficient inventory management, expanded product offerings, and optimized social media content to boost engagement and sales. Additionally, strategically maintained the company's website and inventory for seamless operations, while capturing high-quality product photography to increase website traffic and improve conversion rates.",
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