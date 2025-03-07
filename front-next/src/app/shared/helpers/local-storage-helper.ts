/**
 * Samples usage:
 * localStorageUtil.set(storageKeys.user, { name: "José" });
 * const user = localStorageUtil.get<typeof storageKeys.user>(storageKeys.user);
 * console.log(user);
 */

export const storageKeysHelpers = {
  theme: '@app:theme',
  user: '@app:user',
  language: '@app:language',
  authToken: '@app:authToken',
} as const

type StorageKey = string

export const localStorageHelpers = {
  set<T>(key: StorageKey, value: T): void {
    try {
      const storedValue =
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      localStorage.setItem(key, storedValue)
    } catch (error) {
      console.error('Error saving to localStorage', error)
    }
  },

  get<T>(key: StorageKey): T | null {
    const jsonValue = localStorage.getItem(key)
    try {
      return jsonValue ? (JSON.parse(jsonValue) as T) : null
    } catch {
      return jsonValue as unknown as T
    }
  },

  remove(key: StorageKey): void {
    localStorage.removeItem(key)
  },

  setSession<T>(key: StorageKey, value: T): void {
    try {
      const storedValue =
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      sessionStorage.setItem(key, storedValue)
    } catch (error) {
      console.error('Error saving to sessionStorage', error)
    }
  },

  getSession<T>(key: StorageKey): T | null {
    const jsonValue = sessionStorage.getItem(key)
    try {
      return jsonValue ? (JSON.parse(jsonValue) as T) : null
    } catch {
      return jsonValue as unknown as T
    }
  },

  removeSession(key: StorageKey): void {
    sessionStorage.removeItem(key)
  },
}
