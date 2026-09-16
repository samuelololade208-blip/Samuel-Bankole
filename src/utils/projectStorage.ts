import { Project } from '../types';

const DB_NAME = 'bankole_portfolio_db';
const STORE_NAME = 'projects_store';
const DB_VERSION = 1;
const LOCAL_STORAGE_KEY = 'samuel_portfolio_projects';

/**
 * Open or initialize IndexedDB instance
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save projects list to IndexedDB and attempt localStorage as backup
 */
export async function saveProjectsToStorage(projects: Project[]): Promise<void> {
  // 1. Always persist to IndexedDB (virtually unlimited quota for large images)
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Clear existing and rewrite
    await new Promise<void>((resolve, reject) => {
      const clearReq = store.clear();
      clearReq.onsuccess = () => resolve();
      clearReq.onerror = () => reject(clearReq.error);
    });

    for (const project of projects) {
      store.put(project);
    }

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (idbErr) {
    console.warn('IndexedDB write warning:', idbErr);
  }

  // 2. Safely attempt localStorage write with compression/fallback without throwing
  try {
    const serialized = JSON.stringify(projects);
    localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
  } catch (lsErr: any) {
    // If quota exceeded in localStorage, we create a lightweight index version
    console.warn('LocalStorage quota limit reached, saving metadata index only (IndexedDB handles full data):', lsErr);
    try {
      // Strip large base64 image strings from localStorage payload to keep it well under quota limit
      const lightweight = projects.map((p) => {
        if (p.image && p.image.startsWith('data:')) {
          return { ...p, image: '' }; // Full image remains safe in IndexedDB
        }
        return p;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lightweight));
    } catch {
      // Ignore if localStorage completely full, IndexedDB has the true state
    }
  }
}

/**
 * Load projects from IndexedDB, falling back to LocalStorage
 */
export async function loadProjectsFromStorage(defaultProjects: Project[]): Promise<Project[]> {
  // 1. Try IndexedDB first
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const items = await new Promise<Project[]>((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });

    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (idbErr) {
    console.warn('Could not read from IndexedDB, falling back to localStorage:', idbErr);
  }

  // 2. Fallback to LocalStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse localStorage projects:', err);
    }
  }

  return defaultProjects;
}

/**
 * Clear all custom projects and reset back to defaults
 */
export async function clearProjectsStorage(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
    console.warn('Failed to clear IndexedDB:', err);
  }

  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear localStorage:', err);
  }
}
