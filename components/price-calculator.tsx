import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { Button } from './ui/button';
import { useState } from 'react';

export const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
          <span>{isOpen ? '▼' : '▶'}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border-t">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
};