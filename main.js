const origin = [-12.91795, -38.37235];
const destiny = [-12.938519, -38.386332];

const map = L.map('map').setView(origin, 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker(origin).addTo(map).bindPopup('Mussurunga').openPopup();
L.marker(destiny).addTo(map).bindPopup('SENAI CIMATEC');

const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destiny[1]},${destiny[0]}?overview=full&geometries=geojson`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const route = data.routes[0].geometry;
    L.geoJSON(route, {
      style: { color: 'blue', weight: 5 }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Erro ao carregar rota:', error);
  });
