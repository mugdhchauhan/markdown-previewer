import { useState, useEffect } from "react";

function useLocalStorage(key, startupText) {
      
    const [code, setCode] = useState(JSON.parse(localStorage.getItem(key)) || startupText)
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(code))

    }, [key, code])

    return [code, setCode]
}

export default useLocalStorage;
