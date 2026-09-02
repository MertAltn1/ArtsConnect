import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)

        return () => clearTimeout(timer)  /* yeni harf gelince eskisini iptal et */
    }, [value, delay])

    return debounced
}

export default useDebounce
