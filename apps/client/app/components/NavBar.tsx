import { useState } from 'react';
import { PlusCircle, List, Sun, Moon, Menu } from 'lucide-react';

import { useTheme } from "~/hooks/use-theme";

import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';

export default function NavBar() {
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Desktop Navigation */}
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
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('create')}
          className={
            activeTab === 'create' ? 'bg-blue-600 hover:bg-blue-700' : ''
          }
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create
        </Button>
        <Button
          variant={activeTab === 'view' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('view')}
          className={
            activeTab === 'view' ? 'bg-blue-600 hover:bg-blue-700' : ''
          }
        >
          <List className="w-4 h-4 mr-2" />
          View Snippets
        </Button>
      </div>

      {/* Mobile Navigation */}
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
              <Button
                variant={activeTab === 'create' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('create')}
                className={`justify-start h-12 ${
                  activeTab === 'create' ? 'bg-blue-600 hover:bg-blue-700' : ''
                }`}
              >
                <PlusCircle className="w-4 h-4 mr-3" />
                Create Snippet
              </Button>
              <Button
                variant={activeTab === 'view' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('view')}
                className={`justify-start h-12 ${
                  activeTab === 'view' ? 'bg-blue-600 hover:bg-blue-700' : ''
                }`}
              >
                <List className="w-4 h-4 mr-3" />
                View Snippets
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
