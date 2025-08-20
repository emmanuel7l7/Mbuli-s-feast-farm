
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { LanguageToggle } from "../language-toggle";
import ChickenIcon from "../icons/chicken-icon";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, User } from "lucide-react";

const navLinks = [
    { href: "/products", label: "Our Products" },
    { href: "/stores", label: "Find Us" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <ChickenIcon className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block font-headline">
                            Mbuli&apos;s Feast Farm
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                                <ChickenIcon className="h-6 w-6 text-primary" />
                                <span className="font-bold font-headline">
                                    Mbuli&apos;s Feast Farm
                                </span>
                            </Link>
                            <nav className="flex flex-col space-y-4">
                                {navLinks.map(link => (
                                    <Link key={link.href} href={link.href} className="transition-colors hover:text-primary text-lg">
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                     <Link href="/" className="flex items-center space-x-2 md:hidden">
                        <ChickenIcon className="h-6 w-6 text-primary" />
                         <span className="font-bold font-headline text-sm">
                            Mbuli&apos;s
                        </span>
                    </Link>
                </div>


                <div className="flex flex-1 items-center justify-end space-x-2">
                    <LanguageToggle />
                    <ThemeToggle />
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/login">
                            <User />
                            <span className="sr-only">Login</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
