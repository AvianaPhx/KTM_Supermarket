import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";



function MenuItems(){

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams()

    function handleNavigate(getCurrentMenuItem){
        sessionStorage.removeItem('filters')
        const currentFilter = 
            getCurrentMenuItem.id !== 'home' && 
            getCurrentMenuItem.id !== 'products' && 
            getCurrentMenuItem.id !== 'about-us' && 
            getCurrentMenuItem.id !== 'search'
        ? {
            category : [getCurrentMenuItem.id]
        } : null

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));

        location.pathname.includes('listing') && currentFilter !== null ?
        setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) :
        navigate(getCurrentMenuItem.path)
    }

    
return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-8 lg:flex-row">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <button
                    onClick={() => handleNavigate(menuItem)}
                    className={`text-sm font-medium cursor-pointer px-4 py-2 transition-all duration-300 ease-in-out 
                        ${location.pathname === menuItem.path ? "text-white font-semibold" : "text-black-300 hover:text-white"}`}
                        
                    key={menuItem.id}
                    aria-label={menuItem.label}
                >
                    {menuItem.label}
                </button>
            ))}
        </nav>
    );
}

function HeaderRightContent(){
    const { user } = useSelector(state=>state.auth)
    const {cartItems} = useSelector(state=> state.shopCart)
    const [openCartSheet, setOpenCartSheet] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logoutUser());
    }

    useEffect(()=> {
        dispatch(fetchCartItems(user?.id))
    },[dispatch])

    console.log("cartItems:", cartItems);
    console.log("cartItems.items:", cartItems.items);

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
                <VisuallyHidden>
                    <DialogTitle>Cart</DialogTitle>
                    <DialogDescription>this is a sidebar for cart</DialogDescription>
                </VisuallyHidden>
            <Button onClick={()=>setOpenCartSheet(true)} varient="outline" size="icon" className="relative"> 
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
                {cartItems?.items?.length || 0}
                </span>
                <span className="sr-only">User cart</span>
            </Button>
            <UserCartWrapper 
                setOpenCartSheet={setOpenCartSheet}
                cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
            }/>
        </Sheet>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                    <AvatarFallback className="bg-black text-white font-extrabold">
                        {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=> navigate('/shop/account')}>
                    <UserCog className="mr-2 h-4 w-4" />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
}

function ShoppingHeader() {

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background bg-red-400">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6" />
                    <span className="font-bold">KTM Supermarket</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs" >
                        <DialogTitle className="hidden">Header Menu</DialogTitle>
                        <DialogDescription className="hidden">This is the navigation menu for the header.</DialogDescription>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                <MenuItems />
                </div>
        
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;