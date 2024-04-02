import React from 'react'
import WorkItem from './WorkItem'
// WorkItem above might need to change to just Work
const data =[
    {
        year: "2023 - present",
        company: '100 Devs',
        title: 'Software Engineer',
        details: 'Collaborated with a dynamic team to design and implement modern, responsive web applications, ensuring adherence to industry standards and best practices. Leveraging my expertise in full-stack development, I focused on optimal code organization and maintainability for long-term scalability, while actively contributing to agile methodologies such as SCRUM for efficient project management and delivery.'
    },
    {
        year: "2023 - present",
        company: "Ducati Austin",
        title: 'Freelancer',
        details: 'Pioneered the ongoing transition to a more dynamic and responsive website platform utilizing Shopify. Played a pivotal role in designing and constructing innovative website mock-ups, setting the stage for a comprehensive website overhaul aimed at enhancing user experience and optimizing operational efficiency.',
    },
    {
        year: "2021 - present",
        company: "Texas Malibu",
        title: 'Sales Associate',
        details: 'Facilitated seamless boat purchases for clients, managed custom orders for timely delivery, and cultivated a strong brand culture, leading to increased customer satisfaction, loyalty, and 10% growth in new client acquisition. Additionally, collaborated with management to optimize the company website, improving inventory management and user engagement.',
    },
    {
        year: "2019 - 2021",
        company: "Motovation USA",
        title: 'Content & Fulfillment specialist',
        details: "Led digital marketing initiatives, including social media campaigns and order fulfillment, to enhance customer experience and drive sales growth. Implemented dropshipping strategies for efficient inventory management, expanded product offerings, and optimized social media content to boost engagement and sales. Additionally, strategically maintained the company's website and inventory for seamless operations, while capturing high-quality product photography to increase website traffic and improve conversion rates.",
    },
]

const Work = () =>{
    return (
        <div id='work' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
            <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Work</h1>
            {data.map((item, idx) =>(
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