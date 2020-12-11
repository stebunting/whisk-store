// Requirements
import { useState, useEffect } from 'react';

// Custom hook to load a script and run callback when loaded
function useScript(src: string, callback: () => void): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      callback();
      setLoaded(true);
    };

    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);

    script.addEventListener('load', onLoad);

    return () => script.removeEventListener('load', onLoad);
  }, [callback, src]);

  return loaded;
}

export default useScript;
