import { supabase } from './supabase';

export async function verifyCheckpoint(checkpointId: number): Promise<boolean> {
  // Get checkpoint completion from localStorage
  const completedCheckpoints = JSON.parse(localStorage.getItem('completedCheckpoints') || '[]');
  
  // Verify this checkpoint hasn't been completed
  if (completedCheckpoints.includes(checkpointId)) {
    return false;
  }

  // Add to completed checkpoints
  completedCheckpoints.push(checkpointId);
  localStorage.setItem('completedCheckpoints', JSON.stringify(completedCheckpoints));
  
  return true;
}

export function getCompletedCheckpoints(): number[] {
  return JSON.parse(localStorage.getItem('completedCheckpoints') || '[]');
}

export function isCheckpointCompleted(checkpointId: number): boolean {
  const completedCheckpoints = getCompletedCheckpoints();
  return completedCheckpoints.includes(checkpointId);
}

export function resetCheckpoints(): void {
  localStorage.removeItem('completedCheckpoints');
}