import { supabase } from './supabase';
import { generateHWID } from './hwid';

export async function generateKey(): Promise<string> {
  const newKey = Math.random().toString(36).substring(2, 15);
  const hwid = await generateHWID();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Set expiration to 24 hours from now
  
  const { error } = await supabase
    .from('keys')
    .insert([{ 
      key: newKey, 
      hwid: hwid,
      expires_at: expiresAt.toISOString(),
      used: false 
    }]);

  if (error) throw error;
  
  return newKey;
}

export async function verifyKey(key: string): Promise<boolean> {
  const hwid = await generateHWID();
  
  // Check if key exists and is valid
  const { data, error } = await supabase
    .from('keys')
    .select('*')
    .eq('key', key)
    .single();
    
  if (error || !data) return false;
  
  // Check if key is expired
  if (new Date(data.expires_at) < new Date()) return false;
  
  // Check if key is already used
  if (data.used) {
    // If used, verify it's the same HWID
    if (data.hwid !== hwid) return false;
  } else {
    // If not used, mark it as used and save the HWID
    const { error: updateError } = await supabase
      .from('keys')
      .update({ used: true, hwid: hwid })
      .eq('key', key);
      
    if (updateError) return false;
  }
  
  return true;
}