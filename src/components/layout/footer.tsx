import { Phone } from "lucide-react"

const MpesaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#F5F5DC"/>
        <path d="M128 28.4444C73.7778 28.4444 28.4444 73.7778 28.4444 128C28.4444 182.222 73.7778 227.556 128 227.556C182.222 227.556 227.556 182.222 227.556 128C227.556 73.7778 182.222 28.4444 128 28.4444Z" fill="#ED1C24"/>
        <path d="M112.293 172.933L79.1111 128L112.293 83.0667H143.707L176.889 128L143.707 172.933H112.293Z" fill="white"/>
    </svg>
)

const AirtelMoneyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#F5F5DC"/>
        <path d="M128 28.4444C73.7778 28.4444 28.4444 73.7778 28.4444 128C28.4444 182.222 73.7778 227.556 128 227.556C182.222 227.556 227.556 182.222 227.556 128C227.556 73.7778 182.222 28.4444 128 28.4444Z" fill="#E40000"/>
        <path d="M106.667 112.293H149.333L128 152.556L106.667 112.293Z" fill="white"/>
        <path d="M79.1111 103.889H176.889L128 172.933L79.1111 103.889Z" fill="white"/>
    </svg>
)

const HaloPesaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect width="256" height="256" fill="#F5F5DC"/>
        <path d="M128 28.4444C73.7778 28.4444 28.4444 73.7778 28.4444 128C28.4444 182.222 73.7778 227.556 128 227.556C182.222 227.556 227.556 182.222 227.556 128C227.556 73.7778 182.222 28.4444 128 28.4444Z" fill="#FBB416"/>
        <path d="M128 83.0667C101.9 83.0667 80.5333 104.433 80.5333 130.533C80.5333 156.633 101.9 178 128 178C154.1 178 175.467 156.633 175.467 130.533C175.467 104.433 154.1 83.0667 128 83.0667Z" fill="#E31E24"/>
    </svg>
)

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-secondary/50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-muted-foreground">
                            &copy; {year} Mbuli&apos;s Feast Farm. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="text-sm font-medium">Pay with:</span>
                        <MpesaIcon className="h-8 w-8" />
                        <AirtelMoneyIcon className="h-8 w-8" />
                        <HaloPesaIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <a href="https://wa.me/255712345678" // Placeholder number
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact us on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
