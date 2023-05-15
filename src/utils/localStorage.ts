export function setLocalStorage<T>(key: string, value: T): void {
    try {
        const valueType = typeof value === 'string'
        const serializedValue = valueType ? value : JSON.stringify(value)
        localStorage.setItem(key, serializedValue)
    } catch (error) {
        console.error(`Error setting localStorage key "${key}": `, error);
    }
}

export function getLocalStorage<T>(key: string, defaultValue?: T): T | undefined {
    try {
        const serializedValue = localStorage.getItem(key)
        if (serializedValue == null) {
            return defaultValue
        } else {
            return JSON.parse(serializedValue) as T
        }
    } catch (error) {
        console.error(`Error getting localStorage key "${key}": `, error);
        return defaultValue;
    }
}

export function removeLocalStorage(key: string) {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error(`Error removing localStorage key "${key}": `, error);
    }
}

export function removeAllLocalStorage() : void {
    try {
        localStorage.clear()
    } catch (error) {
        console.error(`Error removing localStorage All": `, error);
    }
}