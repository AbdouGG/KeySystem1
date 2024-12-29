import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Checkpoint } from './Checkpoint';
import { KeyDisplay } from './KeyDisplay';
import { CHECKPOINTS } from '../lib/constants';
import { generateKey } from '../lib/keyUtils';
import { verifyCheckpoint, getCompletedCheckpoints, isCheckpointCompleted } from '../lib/checkpointUtils';

export function KeySystem() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if we're on a checkpoint verification route
    const match = location.pathname.match(/\/checkpoint\/(\d+)/);
    if (match) {
      const checkpointId = parseInt(match[1], 10);
      handleCheckpointVerification(checkpointId);
    }
  }, [location]);

  useEffect(() => {
    // Set initial step based on completed checkpoints
    const completed = getCompletedCheckpoints();
    if (completed.length > 0) {
      setCurrentStep(Math.min(completed[completed.length - 1] + 1, CHECKPOINTS.length));
    }
  }, []);

  const handleCheckpointVerification = async (checkpointId: number) => {
    try {
      const verified = await verifyCheckpoint(checkpointId);
      if (verified) {
        if (checkpointId === CHECKPOINTS.length) {
          // Final checkpoint completed
          const newKey = await generateKey();
          setKey(newKey);
          toast.success('All checkpoints completed! Here\'s your key.');
        } else {
          // Move to next checkpoint
          setCurrentStep(checkpointId + 1);
          toast.success(`Checkpoint ${checkpointId} completed!`);
        }
      }
      // Redirect back to main page
      navigate('/');
    } catch (error) {
      toast.error('Error verifying checkpoint');
      navigate('/');
    }
  };

  const handleCheckpointStart = (checkpoint: typeof CHECKPOINTS[0]) => {
    if (isCheckpointCompleted(checkpoint.id)) {
      toast.error('Checkpoint already completed');
      return;
    }
    
    // Open Linkvertise URL
    window.open(checkpoint.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-500">Key System</h1>
        
        <div className="space-y-6">
          {CHECKPOINTS.map((checkpoint) => (
            <Checkpoint
              key={checkpoint.id}
              {...checkpoint}
              currentStep={currentStep}
              completed={isCheckpointCompleted(checkpoint.id)}
              onComplete={() => handleCheckpointStart(checkpoint)}
            />
          ))}
        </div>

        <KeyDisplay generatedKey={key} />

        <div className="mt-6 text-center text-sm text-gray-400">
          Checkpoint: {currentStep} / {CHECKPOINTS.length}
        </div>
      </div>
    </div>
  );
}