let whiskLocation;
let homeLocation;
let zone1Boundary;
let zone2Boundary;

const walkableDistance = 150; // metres

function whiskTo(location) {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    whiskLocation,
    location
  );
}

function homeTo(location) {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    homeLocation,
    location
  );
}

function inZone(zone, location) {
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

export function getZone(location) {
  for (let i = 0; i <= 2; i += 1) {
    if (inZone(i, location)) {
      return i;
    }
  }
  return 3;
}

function parseXML(data) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const placemarks = xml.getElementsByTagName('Placemark');
  for (let i = 0; i < placemarks.length; i += 1) {
    const placemark = placemarks[i];

    const name = placemark.getElementsByTagName('name')[0].textContent;
    const boundaries = { paths: [] };

    const coordinates = placemark.getElementsByTagName('coordinates')[0].textContent.split(/\r?\n/);
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

export function initialiseBoundaries() {
  return new Promise((resolve, reject) => {
    fetch('/data/boundaries.xml')
      .then((response) => response.text())
      .then((data) => {
        parseXML(data);
        resolve({ status: 'ok' });
      }).catch((error) => reject(error));
  });
}
