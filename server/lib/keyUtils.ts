import { supabase } from './supabase';
import { generateHWID } from './hwid';

export async function verifyKey(key: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('keys')
      .select('*')
      .eq('key', key)
      .single();
      
    if (error || !data) return false;
    
    // Check if key is expired
    if (new Date(data.expires_at) < new Date()) return false;
    
    return true;
  } catch (error) {
    console.error('Error verifying key:', error);
    return false;
  }
}