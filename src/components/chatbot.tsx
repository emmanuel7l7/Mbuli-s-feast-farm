"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import ChickenIcon from "./icons/chicken-icon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const predefinedResponses: Record<string, string> = {
  "hello": "Hello! Welcome to Mbuli's Feast Farm. How can I help you today?",
  "hi": "Hi there! I'm here to help you with any questions about our farm and products.",
  "products": "We offer fresh, farm-raised chicken products including whole chickens, thighs, wings, breasts, drumsticks, and ground chicken. All our chickens are raised naturally without antibiotics or hormones.",
  "prices": "Our prices range from 9,000 TZS for ground chicken (500g) to 20,000 TZS for chicken breast (1kg). All prices are in Tanzanian Shillings.",
  "delivery": "We offer delivery throughout Dar es Salaam with a standard delivery fee of 5,000 TZS. You can pay cash or mobile money upon delivery.",
  "farm": "Mbuli's Feast Farm was founded by Mama Mbuli with a mission to provide the highest quality chicken to our community in Tanzania. We use sustainable farming practices and care deeply about animal welfare.",
  "quality": "Our chickens are raised in open spaces, fed a natural diet, and cared for with the highest standards. We never use antibiotics or hormones.",
  "contact": "You can contact us through WhatsApp or place an order directly through our website. We're always happy to help!",
  "hours": "We're available for orders 24/7 through our website. Delivery times vary by location in Dar es Salaam.",
  "payment": "We accept cash and mobile money payments (M-Pesa, Airtel Money, HaloPesa) upon delivery."
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for exact matches first
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Default response
  return "Thank you for your question! For specific inquiries about our products, pricing, or delivery, please contact us on WhatsApp. We're here to help you get the freshest chicken from our farm to your table!";
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const response = getResponse(input);
    const assistantMessage: Message = { role: "assistant", content: response };
    
    setInput("");
    
    // Add a small delay to make it feel more natural
    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">Chat with our AI Assistant</SheetTitle>
          <SheetDescription>
            Ask about our farm, products, or delivery information.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow my-4 pr-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="flex items-start gap-3 justify-start">
                <div className="bg-primary rounded-full p-1.5 flex items-center justify-center h-8 w-8">
                  <ChickenIcon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="rounded-lg p-3 bg-muted max-w-xs md:max-w-md text-sm">
                  <p>Hello! I'm here to help you learn about Mbuli's Feast Farm. Ask me about our products, prices, delivery, or anything else!</p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="bg-primary rounded-full p-1.5 flex items-center justify-center h-8 w-8">
                    <ChickenIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-xs md:max-w-md text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <div className="bg-gray-500 rounded-full p-1.5 flex items-center justify-center h-8 w-8">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <SheetFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <Button type="submit" disabled={!input.trim()} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}