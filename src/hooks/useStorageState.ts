import { useEffect, useState } from 'react'

export function useStorageState<T>(
  key: string
): [T | null, (value: T | null) => void] {
  const [value, setValue] = useState<T | null>(() => {
    const stored = localStorage.getItem(key)
    try {
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setValue(event.newValue ? JSON.parse(event.newValue) : null)
        } catch {
          setValue(null)
        }
      }
    }

    const handleCustomStorage = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setValue(event.detail.value)
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(
      'local-storage-change',
      handleCustomStorage as EventListener
    )

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(
        'local-storage-change',
        handleCustomStorage as EventListener
      )
    }
  }, [key])

  const updateValue = (newValue: T | null) => {
    if (newValue === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
    setValue(newValue)

    window.dispatchEvent(
      new CustomEvent('local-storage-change', {
        detail: {
          key,
          value: newValue,
        },
      })
    )
  }

  return [value, updateValue]
}
