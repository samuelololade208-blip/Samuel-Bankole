/**
 * Utility to detect if the current session is running in Google AI Studio Developer Environment
 * or with developer access enabled.
 * 
 * When published to end-users (e.g. on ais-pre-*, custom domains, or production builds),
 * developer controls like "Add Project" and "Delete Project" are hidden by default.
 */

export function isDeveloperModeActive(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const hostname = window.location.hostname;
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // 1. Google AI Studio Development App URL (ais-dev-*)
    const isAiStudioDevUrl = hostname.includes('ais-dev-');

    // 2. Local development environment
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');

    // 3. Vite development build flag
    const isViteDev = Boolean((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV);

    // 4. Developer query parameter override (e.g. ?admin=true or ?dev=true)
    const hasDevQuery = 
      searchParams.get('admin') === 'true' || 
      searchParams.get('dev') === 'true' || 
      searchParams.get('studio') === 'true';

    // 5. URL hash override (e.g. #developer or #admin)
    const hasDevHash = hash === '#admin' || hash === '#dev' || hash === '#developer';

    // 6. Explicit developer session stored in localStorage
    const isStoredDev = localStorage.getItem('samuel_portfolio_developer_mode') === 'true';

    // If query parameter is provided with ?admin=false or ?dev=false, explicitly disable
    if (searchParams.get('admin') === 'false' || searchParams.get('dev') === 'false') {
      return false;
    }

    return isAiStudioDevUrl || isLocalhost || isViteDev || hasDevQuery || hasDevHash || isStoredDev;
  } catch (err) {
    return false;
  }
}

export function setDeveloperModeOverride(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (enabled) {
      localStorage.setItem('samuel_portfolio_developer_mode', 'true');
    } else {
      localStorage.removeItem('samuel_portfolio_developer_mode');
    }
  } catch (err) {
    console.error('Failed to set developer mode:', err);
  }
}
