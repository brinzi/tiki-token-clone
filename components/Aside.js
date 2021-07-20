import { FaHome } from 'react-icons/fa'
import { RiDeviceRecoverLine } from 'react-icons/ri'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function Aside({ setsidebarp }) {
    const [sideBari, setsideBari] = useState(false)
    setsidebarp(sideBari)
    const [light, setlight] = useState(true)
    const { asPath, pathname } = useRouter();
    useEffect(() => {

        if (pathname === "/") {
            setlight(true)
        } else {
            setlight(false)
        }
    }, [pathname])
    useEffect(() => {
        setsidebarp(sideBari)
    
    }, [sideBari])

    return (
        <>
            <aside className="z-30  bg-white dark:bg-gray-800 ">
                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <a className="flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="">
                        <img className="mr-2 w-10 h-10" src="logo2.png" />
                        <span className="self-center">Magma BNB Rewards</span>
                    </a>
                </div>
            </aside>
        </>
    )
}