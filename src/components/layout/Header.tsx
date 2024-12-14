"use client"

import Link from 'next/link';
import Navigation from './Navigation'
import { Tag, Receipt, PuzzlePiece } from "@phosphor-icons/react";
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();

    const navigation = [{ title: 'Categories', href: '/categories', icon: <Tag size={28} /> },
    { title: 'Components', href: '/components', icon: <PuzzlePiece size={28} /> },
    { title: 'Candles', href: '/candles', icon: <Receipt size={28} /> }];
    return (
        <>
            <div className="w-full sticky top-0 z-50 px-4 border-b">
                <div className="flex w-full items-center justify-between bg-white py-[8px] md:gap-x-[24px] gap-x-[16px]">
                    <Link className="md:w-1/4  flex flex-shrink-0 items-center" href="/">
                        <span className="text-xl font-bold text-gray-800">Candle Maker</span>
                    </Link>
                    {session &&
                        <div className="md:flex hidden w-1/2">
                            <Navigation
                                links={navigation} mobile={false}
                            />
                        </div>
                    }
                    {session &&
                        <Button variant="default" className='w-1/4 max-w-[100px]' onClick={() => signOut()}>
                            Logout
                        </Button>
                    }
                </div>

            </div>


            {session && (
                <div className="md:hidden flex w-full">
                    <Navigation links={navigation} mobile={true} />
                </div>
            )}
        </>
    )
}
