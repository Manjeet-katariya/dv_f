import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/app/context/AuthContext';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'DVL Architects - Refined Architecture & Interiors',
  description: 'Creating beautiful spaces that inspire and endure.',
  icons: {
    icon: '/logo-dvl.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} ${playfair.variable} ${montserrat.variable} overflow-x-hidden bg-[#FAF9F5] text-[#1C1917] font-sans antialiased selection:bg-[#1C1917] selection:text-white`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}