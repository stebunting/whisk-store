let whiskLocation: google.maps.LatLng;
let homeLocation: google.maps.LatLng;
let zone1Boundary: google.maps.Polygon;
let zone2Boundary: google.maps.Polygon;

const walkableDistance = 150; // metres

// Get distance from Whisk to co-ordinate
function whiskTo(location: google.maps.LatLng): number {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    whiskLocation,
    location
  );
}

// Get distance from home to co-ordinate
function homeTo(location: google.maps.LatLng): number {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    homeLocation,
    location
  );
}

// Check if a co-ordinate is within a particular zone
function inZone(zone: number, location: google.maps.LatLng): boolean {
  switch (zone) {
    case 0:
      return whiskTo(location) < walkableDistance || homeTo(location) < walkableDistance;

    case 1:
      return window.google.maps.geometry.poly.containsLocation(location, zone1Boundary);

    case 2:
      return window.google.maps.geometry.poly.containsLocation(location, zone2Boundary);

    default:
      return false;
  }
}

// Return zone that a particular co-ordinate is in
export function getZone(location: google.maps.LatLng): number {
  if (location === null) return -1;
  for (let i = 0; i <= 2; i += 1) {
    if (inZone(i, location)) {
      return i;
    }
  }
  return 3;
}

// Read XML
function parseXML(data: string) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');

  const placemarks = xml.getElementsByTagName('Placemark');
  for (let i = 0; i < placemarks.length; i += 1) {
    const placemark = placemarks[i];

    const nameTags = placemark.getElementsByTagName('name');
    if (nameTags.length > 0) {
      const name = nameTags[0].textContent;
      const boundaries = { paths: [] as Array<google.maps.LatLng> };

      const coordinateTags = placemark.getElementsByTagName('coordinates');
      if (coordinateTags.length > 0) {
        const coordinates = (coordinateTags[0].textContent || '').split(/\r?\n/);
        coordinates.forEach((line) => {
          const lineArray = line.split(',').map((x) => parseFloat(x.replace(' ', '')));
          if (lineArray.length === 3 && !Number.isNaN(lineArray[0]) && !Number.isNaN(lineArray[1])) {
            boundaries.paths.push(
              new window.google.maps.LatLng(lineArray[1], lineArray[0])
            );
          }
        });

        switch (name) {
          case 'Whisk':
            ([whiskLocation] = boundaries.paths);
            break;

          case 'Home':
            ([homeLocation] = boundaries.paths);
            break;

          case 'Zone 2':
            zone2Boundary = new window.google.maps.Polygon(boundaries);
            break;

          case 'Zone 1':
            zone1Boundary = new window.google.maps.Polygon(boundaries);
            break;

          default:
            break;
        }
      }
    }
  }
}

export function initialiseBoundaries(): Promise<{ status: string }> {
  return new Promise((resolve, reject) => {
    fetch('/data/boundaries.xml')
      .then((response) => response.text())
      .then((data) => {
        parseXML(data);
        resolve({ status: 'ok' });
      }).catch((error) => reject(error));
  });
}
