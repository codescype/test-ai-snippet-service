import { useEffect, useState } from 'react';
import { Form, useActionData, useNavigation } from '@remix-run/react';
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

export default function CreateSnippet() {
  const result = useActionData<Result>();
  const navigation = useNavigation();
  const isProcessing = navigation.state === 'submitting';

  // State to manage input Text
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  // Reset localInputText after a successful submission
  useEffect(() => {
    if (navigation.state === 'idle' && result?.status === 'success') {
      setInputText('');
    }
  }, [navigation.state, result]);

  // Show Error Toast if result has an error
  useEffect(() => {
    if (
      (navigation.state === 'idle' && result?.status === 'error') ||
      (navigation.state === 'idle' && result?.status === 'success')
    ) {
      toast({
        title: result.status,
        description: result.message,
        variant: result.status === 'success' ? 'default' : 'destructive',
      });
    }
  }, [navigation.state, result, toast]);

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
    if (result?.snippet?.summary) {
      try {
        await navigator.clipboard.writeText(result.snippet.summary);
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

          {result && result.status === 'error' && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />

                <div className="flex-1">
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    {result.message}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {result && result.status === 'success' && (
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />

                <div className="flex-1">
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    {result.snippet?.text}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {result &&
            result.status === 'success' &&
            result.snippet?.summary && (
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Generated Summary
                      </label>
                      <p className="text-foreground bg-background/70 dark:bg-background/50 p-4 rounded-lg border border-border">
                        {result.snippet?.summary}
                      </p>
                    </div>
                    <Button
                      onClick={handleCopySummary}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Summary to Clipboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
