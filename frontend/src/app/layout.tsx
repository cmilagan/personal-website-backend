import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/layout/CustomCursor';
import SocialLinks from '@/components/layout/SocialLinks';

export const metadata: Metadata = {
  title: 'Christian Ilagan | SRE',
  description: 'Personal portfolio of Christian Ilagan, a Site Reliability Engineer.',
  icons: {
    icon: '/favicon.ico',
    // You can add more sizes if needed
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased bg-background">
        <CustomCursor />
        <SocialLinks />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
