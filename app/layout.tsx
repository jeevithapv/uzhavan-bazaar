import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';
import AIVoiceAssistant from '@/components/voice/AIVoiceAssistant';

export const metadata: Metadata = {
  title: 'Uzhavan Bazar | Farmer Dashboard',
  description: 'Smart India Hackathon project tailored for local farmers. From Our Fields to Your Home.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden">
        {/* Global Watermark Background */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-5 bg-[url('/logo.png')] bg-no-repeat bg-center bg-fixed bg-[length:400px_400px] md:bg-[length:600px_600px]" />
        
        <AppProvider>
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <AIVoiceAssistant />
        </AppProvider>
      </body>
    </html>
  );
}
