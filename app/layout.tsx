import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import ConditionalLayout from '@/components/common/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KhetTech | खेतटेक',
  description: 'किसानों का डिजिटल साथी — फसल सुझाव, मौसम पूर्वानुमान, रोग पहचान और मंडी भाव',
};

// Inline script: apply dark class BEFORE first paint to prevent flash
const themeScript = `
(function(){
  try {
    var t=localStorage.getItem('sf-theme');
    if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){
      document.documentElement.classList.add('dark');
    }
  }catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}