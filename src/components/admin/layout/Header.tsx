"use client"

import Link from 'next/link';
import Navigation from './Navigation'
import { Tag, Receipt, PuzzlePiece } from "@phosphor-icons/react";
import { Button } from '../../ui/button';
import { authClient } from "@/lib/auth-client"
import { useRouter } from 'next/navigation';


export default function Header() {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const isAllowed = session?.user?.role === 'admin';

    const navigation = [{ title: 'Categories', href: '/admin/categories', icon: <Tag size={28} /> },
    { title: 'Components', href: '/admin/components', icon: <PuzzlePiece size={28} /> },
    { title: 'Candles', href: '/admin/candles', icon: <Receipt size={28} /> }];
    return (
        <>
            <div className="w-full sticky top-0 z-50 px-4 border-b">
                <div className="flex w-full items-center justify-between bg-white py-[8px] md:gap-x-[24px] gap-x-[16px]">
                    <Link className="flex flex-shrink-0 items-center" href="/">
                        <span className="text-xl font-bold text-gray-800">Arglow.candles</span>
                    </Link>
                    {isAllowed &&
                        <div className="md:flex w-full hidden">
                            <Navigation
                                links={navigation} mobile={false}
                            />
                        </div>
                    }
                    {isAllowed &&
                        <Button variant="default" className='max-w-[100px]' onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/login"); // redirect to login page
                                },
                            },
                        })}>
                            Logout
                        </Button>
                    }
                </div>

            </div >


            {isAllowed && (
                <div className="md:hidden flex w-full">
                    <Navigation links={navigation} mobile={true} />
                </div>
            )
            }
        </>
    )
}
