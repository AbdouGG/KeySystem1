import React from 'react';
import { Lock, CheckCircle, ExternalLink } from 'lucide-react';

interface CheckpointProps {
  id: number;
  name: string;
  type: string;
  currentStep: number;
  completed: boolean;
  onComplete: () => void;
}

export function Checkpoint({ id, name, currentStep, completed, onComplete }: CheckpointProps) {
  return (
    <div
      className={`p-4 rounded-lg ${
        completed ? 'bg-green-900' : currentStep >= id ? 'bg-gray-700' : 'bg-gray-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle className="text-green-500" />
          ) : currentStep === id ? (
            <div className="w-6 h-6 rounded-full border-2 border-yellow-500" />
          ) : (
            <Lock className="text-gray-500" />
          )}
          <span className={completed ? 'text-green-300' : currentStep >= id ? 'text-white' : 'text-gray-500'}>
            {name}
          </span>
        </div>
        {currentStep === id && !completed && (
          <button
            onClick={onComplete}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            Continue
            <ExternalLink size={16} />
          </button>
        )}
      </div>
    </div>
  );
}