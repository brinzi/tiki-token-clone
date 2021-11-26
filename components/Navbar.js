import React from 'react';
import { useState } from 'react';
import { BsMoon } from 'react-icons/bs';
import { BiSun } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';


export default function Navbar({ setmodep, setsidebarp, address, dispatch }) {
    const [sideBar, setsideBar] = useState(false);

    const loadDividends = (e) => {
        e.preventDefault();

        localStorage.setItem('address', e.target.value.trim());
        dispatch({
            type: 'UPDATE_ADDRESS',
            payload: e.target.value.trim()
        });
    };


    setsidebarp(sideBar);
    // console.log(sideBar)
    const [mode, setmode] = useState(true);
    setmodep(mode);
    // console.log(setmodep)
    function Mode() {
        if (mode === false) {
            return <BsMoon onClick={() => { setmode(!mode); }} className="text-xl cursor-pointer focus:outline-none" />;
        } else {
            return <BiSun onClick={() => { setmode(!mode); }} className="text-xl cursor-pointer dark:text-white focus:outline-none" />;
        }
    }
    return (
        <>
            <nav className="bg-transparent">
                <div className="flex flex-row justify-between  mx-auto items-center py-2  px-5 max-w-screen-lg ">

                    <a className="flex  text-lg font-bold" href="https://babymetadoge.com">
                        <img width="300" src="/logo.png" />
                    </a>

                    <div className="rounded-full relative md:w-5/12 md:mr-6 ">

                        <input type="text" className=" py-2 text-center block w-full  focus:outline-none  form-input leading-5 bg-transparent  p-4  rounded-full  border-2 border-orange "
                            placeholder="Paste your address here"
                            defaultValue={address}
                            onChange={(e) => { loadDividends(e); }}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
};