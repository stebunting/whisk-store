import { useState, useCallback, useRef } from 'react';

function useAutoComplete() {
  const ref = useRef(null);
  const [newAddress, setNewAddress] = useState({});

  const autocompleteRef = useCallback((node) => {
    let autocomplete;
    let autocompleteListener;

    // Callback on keydown event
    const keydownListener = (event) => {
      const pacContainers = Array.from(document.getElementsByClassName('pac-container'));
      const pacContainerVisible = pacContainers.reduce((visible, pacContainer) => (
        window.getComputedStyle(pacContainer).display !== 'none' || visible
      ), false);
      if ((event.which === 13) && pacContainerVisible) {
        event.preventDefault();
        return false;
      }
      return true;
    };

    // Setup when reference is a DOM element
    if (node) {
      // Set up Autocomplete
      autocomplete = new window.google.maps.places.Autocomplete(
        node, {
          types: ['address'],
          componentRestrictions: { country: ['se'] },
          bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(59.276402, 17.829733),
            new window.google.maps.LatLng(59.410845, 18.257856)
          )
        }
      );

      // Add autocomplete listener when place changed
      autocompleteListener = window.google.maps.event.addListener(
        autocomplete, 'place_changed', () => {
          const googleLocation = autocomplete.getPlace();
          setNewAddress(googleLocation);
        }
      );
      node.addEventListener('keydown', keydownListener);
    }

    // Cleanup when node is null
    if (ref.current) {
      window.google.maps.event.removeListener(autocompleteListener);
      ref.current.removeEventListener('keydown', keydownListener);
    }

    ref.current = node;
  }, []);

  return [newAddress, autocompleteRef];
}

export default useAutoComplete;
