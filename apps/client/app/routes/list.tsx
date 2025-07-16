import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Sun, Moon, Home, Link } from 'lucide-react';
import SnippetsList from '@/components/SnippetsList';
import { useTheme } from '@/hooks/use-theme';

const Snippets = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Link className="text-white w-4 h-4 sm:w-5 sm:h-5" />
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

            {/* Navigation */}
            <div className="flex items-center space-x-2">
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
              <Button asChild variant="ghost">
                <RouterLink to="/">
                  <Home className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </RouterLink>
              </Button>
              <Button
                asChild
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RouterLink to="/">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Create Snippet</span>
                </RouterLink>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <SnippetsList />
      </main>
    </div>
  );
};

export default function List() {
  const actionData = useActionData<Result>();

  return <CreateSnippet actionData={actionData} />;
}
