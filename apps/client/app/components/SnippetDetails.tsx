import { useNavigate } from '@remix-run/react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'; // Adjusted path if needed
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { ArrowLeft, Copy } from 'lucide-react';
import { useToast } from '~/hooks/use-toast';
import { Snippet } from '@ai-snippet-service/shared/snippets/snippet.model';

interface Result {
  status: 'success' | 'error';
  message: string | null;
  snippet: Snippet | null;
}

interface SnippetDetailsProps {
  result: Result;
}

const SnippetDetails = ({ result }: SnippetDetailsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const snippet = result.snippet;

  const handleCopySummary = async () => {
    if (
      snippet?.summary &&
      typeof window !== 'undefined' &&
      navigator.clipboard
    ) {
      try {
        await navigator.clipboard.writeText(snippet.summary);
        toast({
          title: 'Copied to clipboard',
          description: 'Summary has been copied successfully',
        });
      } catch (error) {
        toast({
          title: 'Failed to copy',
          description: 'Unable to copy to clipboard',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Copy Failed',
        description: 'Clipboard API not available or snippet missing.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyOriginal = async () => {
    if (snippet?.text && typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(snippet.text);
        toast({
          title: 'Copied to clipboard',
          description: 'Original text has been copied successfully',
        });
      } catch (error) {
        console.error(error);

        toast({
          title: 'Failed to copy',
          description: 'Unable to copy to clipboard',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Copy Failed',
        description: 'Clipboard API not available or snippet missing.',
        variant: 'destructive',
      });
    }
  };

  // Handle error or not found state based on the 'result' prop
  if (result.status === 'error' || !snippet) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Card className="shadow-lg border bg-card">
            <CardContent className="py-12 text-center">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {result.status === 'error'
                  ? 'Error loading snippet'
                  : 'Snippet not found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {result.message ||
                  "The snippet you're looking for doesn't exist or an error occurred."}
              </p>
              <Button onClick={() => navigate('/')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/snippets')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Snippets
          </Button>

          <div className="flex items-center space-x-2 mb-2">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground"
            >
              Snippet Details
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-card-foreground">
                  Original Text
                </CardTitle>
                <Button
                  onClick={handleCopyOriginal}
                  variant="outline"
                  size="sm"
                  className="border-border hover:border-muted-foreground"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Original
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg border border-border">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {snippet.text}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card className="shadow-lg border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-card-foreground">
                  AI Summary
                </CardTitle>
                <Button
                  onClick={handleCopySummary}
                  variant="outline"
                  size="sm"
                  className="border-blue-200 hover:border-blue-400 hover:text-blue-600"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Summary
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-card-foreground font-medium leading-relaxed">
                  {snippet.summary}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetails;
