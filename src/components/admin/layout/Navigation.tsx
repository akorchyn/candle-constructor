"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ links, mobile }: { links: Url[], mobile: boolean }) {
    const page = usePathname();

    return (
        <>
            {mobile ? (
                <nav className="flex bg-white h-[70px]  border-t-[1px] w-full fixed bottom-0 z-10 items-center justify-around px-3">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`flex flex-col items-center px-2 ${page === link.href ? "text-black" : "text-gray-500"
                                }`}
                            href={link.href}
                        >
                            {link.icon}
                            <small className="text-xs">{link.title}</small>
                        </Link>
                    ))}
                </nav>
            ) : (
                <nav className="flex w-full gap-4 items-center justify-center">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className={`rounded-full p-2 px-5 ${page === link.href
                                ? "bg-[#2f302d] text-white"
                                : "hover:bg-[#2f302d] hover:text-white"
                                }`}
                            href={link.href}
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
};
