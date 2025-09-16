import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/chatbot';
import { CartProvider } from '@/hooks/use-cart';
import { DatabaseInitializer } from '@/components/database-initializer';

export const metadata: Metadata = {
  title: "Mbuli's Feast Farm",
  description: 'Fresh chicken products from the heart of Tanzania.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased flex flex-col', 'min-h-screen')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DatabaseInitializer />
          <CartProvider>
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Chatbot />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}