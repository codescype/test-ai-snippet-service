import { Link, useLocation } from '@remix-run/react';
import {
  PlusCircle,
  List,
  Sun,
  Moon,
  Menu,
  Link as LinkIcon,
} from 'lucide-react';

import { useTheme } from '~/hooks/use-theme';

import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { cn } from '~/utils/shadcn/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  end?: boolean; // For exact path matching 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow other props like className, style, etc
}
export function NavLink({ to, children, end = false, ...props }: NavLinkProps) {
  const location = useLocation();

  // Determine if the link is active
  const isActive = end
    ? location.pathname === to
    : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link to={to} {...props}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'justify-start h-12',
          isActive ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
        )}
      >
        {children}
      </Button>
    </Link>
  );
}

export function NavLinks() {
  return (
    <>
      <NavLink to="/" end key="home-page">
        <PlusCircle className="w-4 h-4 mr-2" />
        Create
      </NavLink>
      <NavLink to="/snippets" end key="snippets-page">
        <List className="w-4 h-4 mr-2" />
        View Snippets
      </NavLink>
    </>
  );
}

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <LinkIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">
                SnippetAI
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Smart Text Summarization
              </p>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <NavLinks />
          </div>

          {/* Mobile Navigation Items */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-8 h-8"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3 mt-6">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
