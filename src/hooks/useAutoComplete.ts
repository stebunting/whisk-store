// Requirements
import { useState, useCallback, useRef, RefObject, KeyboardEvent } from 'react';

function useAutoComplete(): [google.maps.places.PlaceResult, RefObject<HTMLInputElement>] {
  const ref = useRef<HTMLInputElement>(null);
  const [newAddress, setNewAddress] = useState({} as google.maps.places.PlaceResult);

  const autocompleteRef = useCallback((node) => {
    let autocomplete: google.maps.places.Autocomplete;
    let autocompleteListener: google.maps.MapsEventListener;

    // Callback on keydown event
    const keydownListener = (event: KeyboardEvent<HTMLInputElement>) => {
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
