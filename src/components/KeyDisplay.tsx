import React from 'react';

interface KeyDisplayProps {
  generatedKey: string | null;
}

export function KeyDisplay({ generatedKey }: KeyDisplayProps) {
  if (!generatedKey) return null;

  return (
    <div className="mt-8 p-4 bg-green-900 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Your Key:</h3>
      <code className="block p-2 bg-green-800 rounded">{generatedKey}</code>
    </div>
  );
}