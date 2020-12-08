// Requirements
import { useState, useEffect } from 'react';

function useScript(src: string, callback: () => void): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);

    const onLoad = () => {
      if (!loaded) callback();
      setLoaded(!loaded);
    };
    script.addEventListener('load', onLoad);

    return () => script.removeEventListener('load', onLoad);
  }, [src]);

  return loaded;
}

export default useScript;
