'use client'
import React from 'react'
import '../App.css'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { AlignJustify, X } from 'lucide-react'
import Toggle from './toggle'
import logo from '../assets/logo.png'


export default function Navbar () {

    const [isOpen, setIsOpen] = React.useState(false)
    const icon = isOpen ? <X /> : <AlignJustify />

    const handleDrawer = (opened: boolean) => () => {
        setIsOpen(opened)
    }
    
    return (
        <nav>
            <div className=' w-full sticky top-0 z-50 p-4 md:px-10'>
                <div className=' flex justify-between'>
                    <div className='w-[70px] h-auto'><img src={logo} className='w-full h-[50px]' /></div>

                    <div className='hidden md:flex items-center'>
                        <div className="flex gap-6">
                            <a href="/" className="hover:text-gray-400 text-[13.4px] font-medium">Login</a>
                            <a href="/ToDoList" className="hover:text-gray-400 text-[13.4px] font-medium">Add List</a>
                        </div>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Others</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[200px]">
                                        <li>
                                            <NavigationMenuLink> Menu 1 </NavigationMenuLink>
                                            <NavigationMenuLink> Menu 2 </NavigationMenuLink>
                                            <NavigationMenuLink> Menu 3 </NavigationMenuLink>
                                        </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className='flex items-center gap-2 md:gap-4'> 
                        <Toggle />
                        <div className='md:hidden flex'>
                            <Drawer open={isOpen} onClose={handleDrawer(false)}>
                                <DrawerTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={handleDrawer(true)}>
                                        {/* <AlignJustify /> */} {icon}
                                    </Button>
                                </DrawerTrigger>

                                <DrawerContent className="fixed inset-y-0 left-0 w-full bg-white shadow-lg dark:bg-gray-800">
                                    <DrawerHeader>
                                        <DrawerTitle>Navigation Menu</DrawerTitle>
                                    </DrawerHeader>
                                    <DrawerDescription>
                                        <ul className='flex flex-col gap-4 p-4'>
                                            <li><a href="Login" className="darkText hover:text-gray-400 text-[13.4px] font-medium">Login</a></li>
                                            <li><a href="Add List" className="darkText hover:text-gray-400 text-[13.4px] font-medium">Add List</a></li>
                                            <li>
                                                <a href="Others" className="darkText hover:text-gray-400 text-[13.4px] font-medium">Others</a>
                                                <ul className="pl-4 mt-2 flex flex-col gap-2">
                                                    <li><a href="Nest 1" className="darkText hover:text-gray-400 text-[13.4px] font-medium">Nested Menu 1</a></li>
                                                    <li><a href="Nest 2" className="darkText hover:text-gray-400 text-[13.4px] font-medium">Nested Menu 2</a></li>
                                                </ul>
                                            </li>
                                        </ul>

                                    </DrawerDescription>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}