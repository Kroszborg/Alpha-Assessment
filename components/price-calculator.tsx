import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { Button } from './ui/button';
import { useState } from 'react';

export const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-1"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="w-full justify-between text-left font-normal"
        >
          {question}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 rounded-md border p-3">
        <div className="space-y-1">
          <p>{answer}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

