import React from "react";

const Contact = () => {
    return (
        <div id="contact" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
    <h1 className="mt-10 py-4 text-4xl font-bold text-center text-[#001b5e]">Contact</h1>
    <form action="https://getform.io/f/ebpdjqyb" method="POST" encType="multipart/form-data" className="flex flex-col">
        <div className="grid md:grid-cols-2 gap-4 w-full py-2">
            <div className="flex flex-col">
                <label className="uppercase text-sm py-2 text-gray-600">Name</label>
                <input className="border-2 rounded-lg p-3 flex border-gray-300" type="text" name="name" />
            </div>
            <div className="flex flex-col">
                <label className="uppercase text-sm py-2 text-gray-600">Phone</label>
                <input className="border-2 rounded-lg p-3 flex border-gray-300" type="text" name="phone" />
            </div>
            <div className="flex flex-col py-2">
                <label className="uppercase text-sm py-2 text-gray-600">Email</label>
                <input className="border-2 rounded-lg p-3 flex border-gray-300" type="email" name="email" />
            </div>
            <div className="flex flex-col py-2">
                <label className="uppercase text-sm py-2 text-gray-600">Subject</label>
                <input className="border-2 rounded-lg p-3 flex border-gray-300" type="text" name="subject" />
            </div>
            <div className="flex flex-col py-2 md:col-span-2">
                <label className="uppercase text-sm py-2 text-gray-600">Message</label>
                <textarea className="border-2 rounded-lg p-3 border-gray-300 w-full" rows='10' name="message"></textarea>
            </div>
        </div>
        <div className="flex justify-center"> {/* Center the button */}
            <button className="bg-[#001b5e] text-white font-bold mt-4 p-4 rounded-lg w-30 h-[50px]">
                Send Message 😃
            </button>
        </div>
    </form>
</div>

    )
}

export default Contact