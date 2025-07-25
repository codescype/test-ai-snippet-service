import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { MetaFunction, LinksFunction } from '@remix-run/node';

import '~/styles/tailwind.css';

import NavBar from '~/components/NavBar';
import HeroSection from '~/components/HeroSection';
import { ThemeProvider } from '~/hooks/use-theme';
import { TooltipProvider } from '~/components/ui/tooltip';

export const meta: MetaFunction = () => [
  {
    title: 'AI Snippet Service',
  },
];

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          defaultTheme="system"
          storageKey="ai-snippet-service-ui-theme"
        >
          <TooltipProvider>
            <NavBar />
            <HeroSection />

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
              {children}
            </main>
          </TooltipProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
