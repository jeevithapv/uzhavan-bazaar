import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

export const metadata: Metadata = {
  title: 'Uzhavan Bazaar | Farmer Dashboard',
  description: 'Smart India Hackathon project tailored for local farmers to grade produce, list inventory, and track earnings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50 flex flex-col">
        <AppProvider>
          <main className="flex-grow">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
