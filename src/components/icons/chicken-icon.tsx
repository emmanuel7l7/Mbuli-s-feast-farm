import { cn } from "@/lib/utils";

const ChickenIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <path d="M18.5 7.4a2.5 2.5 0 0 1-3.5 3.5" />
    <path d="M15 10.9C15 9.4 16.4 8 18 8c.6 0 1.1.2 1.5.4" />
    <path d="M12 11.4C12 9.5 14.2 8 16.5 8c1.3 0 2.5.5 3.2 1.2" />
    <path d="M11 15.3a2.5 2.5 0 0 0-3.5-3.5" />
    <path d="M8 11.8c0 1.5-1.4 2.7-3 2.7-.6 0-1.1-.2-1.5-.4" />
    <path d="M5.3 12.1c-.7.7-1.2 1.9-1.2 3.4 0 1.9 2.2 3.5 4.5 3.5h.4" />
    <path d="M11 18.8c.2.2.4.4.7.4H13c2.8 0 5-2.2 5-5a5 5 0 0 0-5-5c-2.8 0-5 2.2-5 5" />
    <path d="M5.9 20.9c0-2.1 1.7-3.8 3.8-3.8" />
    <path d="M11.6 20.9c0-2.1 1.7-3.8 3.8-3.8" />
    <path d="M2 17.8c0-2 1.8-3.6 4-3.6" />
    <path d="m18 11-1 1" />
  </svg>
);

export default ChickenIcon;
