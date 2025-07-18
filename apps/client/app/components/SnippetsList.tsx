import { useState, useEffect } from 'react';
import { useNavigate } from '@remix-run/react'; // Already here, good!

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { Copy, Search, Eye, Calendar, FileText } from 'lucide-react';
import { useToast } from '~/hooks/use-toast';
import { Snippet } from '@ai-snippet-service/shared/snippets/snippet.model';

interface Result {
  status: 'success' | 'error';
  message: string | null;
  snippets: Snippet[] | null;
}

interface SnippetsListProps {
  result: Result;
}

const SnippetsList = ({ result }: SnippetsListProps) => {
  const [snippets] = useState<Snippet[]>(result.snippets ?? []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSnippets(snippets);
    } else {
      const filtered = snippets.filter(
        (snippet) =>
          snippet.text
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          snippet.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSnippets(filtered);
    }
  }, [searchTerm, snippets]);

  const handleViewDetails = (snippetId: string) => {
    navigate(`/snippet/${snippetId}`);
  };

  const handleCopySummary = async (summary: string) => {
    try {
      // Check for window existence before using navigator.clipboard
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
        toast({
          title: 'Copied to clipboard',
          description: 'Summary has been copied successfully',
        });
      } else {
        // Fallback for environments without clipboard API or SSR
        toast({
          title: 'Copy Failed',
          description: 'Clipboard API not available.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to copy text: ', error);
      toast({
        title: 'Failed to copy',
        description: 'Unable to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const truncateText = (text: string, maxWords = 20): string => {
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Your Snippets
          </CardTitle>
          <p className="text-muted-foreground">
            View and manage all your summarized texts
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search your snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-input focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {filteredSnippets.length === 0 ? (
        <Card className="shadow-lg border bg-card">
          <CardContent className="py-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {snippets.length === 0
                ? 'No snippets yet'
                : 'No matching snippets'}
            </h3>
            <p className="text-muted-foreground">
              {snippets.length === 0
                ? 'Create your first snippet by summarizing some text'
                : 'Try adjusting your search terms'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredSnippets.map((snippet) => (
            <Card
              key={snippet.id}
              className="shadow-lg border bg-card hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-muted text-muted-foreground"
                      >
                        Original Text
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {truncateText(snippet.text)}
                    </p>
                  </div>

                  <div>
                    <Badge
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700 mb-3"
                    >
                      Summary
                    </Badge>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-card-foreground font-medium leading-relaxed">
                        {snippet.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => handleCopySummary(snippet.summary)}
                      variant="outline"
                      size="sm"
                      className="border-blue-200 hover:border-blue-400 hover:text-blue-600"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Summary
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-muted-foreground"
                      onClick={() => handleViewDetails(snippet.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetsList;
