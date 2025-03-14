import React from 'react';
import WorkItem from './WorkItem';
// WorkItem above might need to change to just Work
const data = [
  {
    year: 'Oct 2024 - Present',
    company: 'Hack for LA',
    title: 'Software Engineer / Front-end',
    details:
      'Maintain and enhance the Hack for LA website using JavaScript, React, SCSS, and Docker to optimize performance, review pull requests, create and track issues, provide on-call code review coverage, and contribute to technical decisions and project alignment during weekly Agile meetings and standups.',
  },
  {
    year: 'Dec 2024 - Present',
    company: 'Ducati Austin',
    title: 'Software Engineer / E-commerce',
    details:
      "Developed and maintained Ducati Austin's Shopify e-commerce platform for parts/accessories, implementing responsive design that boosted mobile conversions 25%. Enhanced user experience through premium theme customization and automated inventory tracking to minimize customer support needs.",
  },
  {
    year: 'Apr 2024 - Present',
    company: 'HSNBA',
    title: 'Software Engineer',
    details:
      'Develop Python scripts for SQL database automation, maintain shelter management website, implement data validation protocols, and collaborate on foster dog care and rehabilitation.',
  },
  {
    year: 'Jan 2023 - Present',
    company: '100 Devs',
    title: 'Software Engineer',
    details:
      'Collaborate with developers and designers to create responsive, scalable web applications with clean architecture, improving deployment times by 30% through agile methodologies, and develop key features for open-source education projects, enhancing access to technical knowledge for over 10,000 aspiring developers.',
  },
  {
    year: 'Apr 2021 - Present',
    company: 'Texas Malibu',
    title: 'Sales Lead',
    details:
      'Digitalized inventory management across three stores to boost efficiency, analyzed market trends and customer behavior to drive decisions contributing to a 10.1% market share increase in central Texas, and mentored four junior associates to enhance performance and ensure seamless team integration.',
  },
  {
    year: 'Nov 2019 - Apr 2021',
    company: 'Motovation USA',
    title: 'E-commerce Solutions Architect',
    details:
      'Implemented dropshipping strategies to expand product offerings without added overhead, automated order processing and stock monitoring with Python scripts to boost efficiency and accuracy, and crafted targeted social media and newsletter content, driving 125%+ organic follower growth and enhancing customer satisfaction.',
  },
];

const Work = () => {
  return (
    <div id="work" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">Work</h1>
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
  );
};

export default Work;
