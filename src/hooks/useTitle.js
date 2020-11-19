import { useEffect } from 'react';

function useTitle(title) {
  useEffect(() => {
    document.getElementById('pageTitle').textContent = title;
  });
}

export default useTitle;
