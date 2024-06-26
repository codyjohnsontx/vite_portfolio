import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Main = () => {
    return (
        <div id='main'>
            <img className='w-full h-screen object-cover' src="/images/waves.jpg" alt="" />
            <div className='w-full h-screen absolute top-0 left-0 bg-white/50'>
                <div className='max-w-[700px] m-auto h-full w-full flex flex-col justify-center lg:items-start items-center'>
                    <h1 className='sm:text-5xl text-4xl font-bold text-gray-800'>Hi, I'm Cody </h1>
                    <h2 className='flex sm:text-3xl text-2xl pt-4 text-gray-800'>I'm a
                        <TypeAnimation
                            sequence={[
                                'Software Engineer',
                                2000,
                                'Problem Solver',
                                2000,
                                'Tech Nerd 🤓',
                                3000,
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '1em', paddingLeft: '5px', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                    </h2>
                    <div className='flex justify-evenly pt-6 max-w-[200px] w-full'>
                        <a href="https://www.linkedin.com/in/cody-johnson-92460b124/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='cursor-pointer' size={22} />
                        </a>
                        <a href="https://github.com/codyjohnsontx" target="_blank" rel="noopener noreferrer">
                            <FaGithub className='cursor-pointer' size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
