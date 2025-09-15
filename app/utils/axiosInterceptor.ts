// Temporary shim to keep backward compatibility after refactor
// Re-export the current HTTP client so any stale imports keep working
export { default } from './apiClient';
export * from './apiClient';

