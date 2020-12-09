// Requirements
import { useCallback, useRef, RefObject, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';

// Redux Actions
import { updateDelivery } from '../redux/actions/deliveryActions';

// Functions
import { getZone } from '../functions/boundaries';

function useAutoComplete(): RefObject<HTMLInputElement> {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement | null>(null);

  const autocompleteRef = useCallback((node: HTMLInputElement) => {
    let autocomplete: google.maps.places.Autocomplete;
    let autocompleteListener: google.maps.MapsEventListener;

    // Callback on keydown event
    const keypressListener = (event: KeyboardEvent) => {
      const pacContainers = Array.from(document.getElementsByClassName('pac-container'));
      const pacContainerVisible = pacContainers.reduce((visible, pacContainer) => (
        window.getComputedStyle(pacContainer).display !== 'none' || visible
      ), false);
      if ((event.key === 'Enter') && pacContainerVisible) {
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
          // Update Redux store with autocompleted address and zone
          const googleLocation = autocomplete.getPlace();
          const latlon = googleLocation.geometry && Object.keys(googleLocation).length > 0
            ? googleLocation.geometry.location
            : null;
          const zone = getZone(latlon);
          dispatch(updateDelivery(googleLocation.formatted_address || '', zone));
        }
      );
      node.addEventListener('keypress', keypressListener);
    }

    // Cleanup when node is null
    if (ref.current) {
      if (autocompleteListener) {
        window.google.maps.event.removeListener(autocompleteListener);
      }
      ref.current.removeEventListener('keypress', keypressListener);
    }

    ref.current = node;
  }, []);

  return autocompleteRef;
}

export default useAutoComplete;
