// Generate a unique hardware ID based on browser fingerprinting
export async function generateHWID(): Promise<string> {
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  
  // Create a unique string combining various browser characteristics
  const fingerprint = `${userAgent}-${language}-${platform}-${screenResolution}`;
  
  // Hash the fingerprint using SHA-256
  const msgBuffer = new TextEncoder().encode(fingerprint);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}