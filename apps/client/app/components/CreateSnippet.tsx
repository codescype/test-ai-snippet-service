import { useEffect, useState } from 'react';
import { Form, useNavigation } from '@remix-run/react';
import { Clipboard, Trash2, Loader2, CheckCircle, Copy } from 'lucide-react';

import { useToast } from '~/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Alert, AlertDescription } from '~/components/ui/alert';

import { Snippet } from '@ai-snippet-service/shared';
import { countWords } from '~/utils/wordCount';

interface Result {
  status: 'success' | 'error';
  message: string | null;
  snippet: Snippet | null;
}

// Accept actionData as a prop
interface CreateSnippetProps {
  actionData?: Result;
}
export default function CreateSnippet({ actionData }: CreateSnippetProps) {
  const navigation = useNavigation();
  const isProcessing = navigation.state === 'submitting';

  // State to manage input Text
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  // Reset localInputText after a successful submission
  useEffect(() => {
    if (navigation.state === 'idle' && actionData?.status === 'success') {
      setInputText('');
    }
  }, [navigation.state, actionData]);

  // Show Error Toast if actionData has an error
  useEffect(() => {
    if (
      (navigation.state === 'idle' && actionData?.status === 'error') ||
      actionData?.status === 'success'
    ) {
      toast({
        title: actionData.status,
        description: actionData.message,
        variant: actionData.status === 'success' ? 'default' : 'destructive',
      });
    }
  }, [navigation.state, actionData, toast]);

  const wordCount = countWords(inputText);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      toast({
        title: 'Text pasted successfully',
        description: 'Content has been pasted from clipboard',
      });
    } catch (error) {
      toast({
        title: 'Failed to paste',
        description: 'Unable to access clipboard. Please paste manually.',
        variant: 'destructive',
      });

      console.error('Failed to read clipboard contents:', error);
    }
  };

  const handleClearText = () => {
    setInputText('');
  };

  const handleCopySummary = async () => {
    if (actionData?.snippet?.summary) {
      try {
        await navigator.clipboard.writeText(actionData.snippet.summary);
        toast({
          title: 'Copied to clipboard',
          description: 'Summary has been copied successfully',
        });
      } catch (error) {
        console.error(error);

        toast({
          title: 'Failed to copy',
          description: 'Unable to copy to clipboard',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Create New Snippet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form method="post">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="input-text"
                    className="text-sm font-medium text-foreground"
                  >
                    Enter your text (minimum 30 words)
                  </label>
                  <span
                    className={`text-sm ${
                      wordCount >= 30
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {wordCount} words
                  </span>
                </div>
                <Textarea
                  id="input-text"
                  name="text"
                  placeholder="Paste or type your long text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  variant="outline"
                  className="flex-1"
                >
                  <Clipboard className="w-4 h-4 mr-2" />
                  Paste from Clipboard
                </Button>
                <Button
                  type="button"
                  onClick={handleClearText}
                  variant="outline"
                  className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing || wordCount < 30}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Summarizing...
                </>
              ) : (
                'Summarize Text'
              )}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
