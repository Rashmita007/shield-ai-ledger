import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons
const busIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iNCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzIyNjNlYiIvPgo8Y2lyY2xlIGN4PSI3IiBjeT0iMTciIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz4KPGM1jaWNsZSBjeD0iMTciIGN5PSIxNyIgcj0iMiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4=',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const metroIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNCIgeT0iNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzEwYjk4MSIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTciIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZiIvPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjE3IiByPSIxLjUiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface TransportMapProps {
  startPoint: [number, number] | null;
  endPoint: [number, number] | null;
  selectedRoute: any;
}

export function TransportMap({ startPoint, endPoint, selectedRoute }: TransportMapProps) {
  const [buses, setBuses] = useState<Array<{ id: string; position: [number, number]; route: string }>>([]);
  const [metroStations] = useState([
    { name: "Majestic", position: [12.9766, 77.5993] as [number, number] },
    { name: "Chickpet", position: [12.9698, 77.5925] as [number, number] },
    { name: "KR Market", position: [12.9597, 77.5847] as [number, number] },
    { name: "MG Road", position: [12.9759, 77.6068] as [number, number] },
    { name: "Cubbon Park", position: [12.9698, 77.5925] as [number, number] },
    { name: "Indiranagar", position: [12.9784, 77.6408] as [number, number] }
  ]);

  // Bengaluru center coordinates
  const center: [number, number] = [12.9716, 77.5946];

  // Simulate live bus positions
  useEffect(() => {
    const updateBuses = () => {
      setBuses([
        {
          id: "BUS001",
          position: [12.9716 + (Math.random() - 0.5) * 0.1, 77.5946 + (Math.random() - 0.5) * 0.1],
          route: "Route 356E"
        },
        {
          id: "BUS002", 
          position: [12.9800 + (Math.random() - 0.5) * 0.1, 77.6000 + (Math.random() - 0.5) * 0.1],
          route: "Route 201"
        },
        {
          id: "BUS003",
          position: [12.9650 + (Math.random() - 0.5) * 0.1, 77.5900 + (Math.random() - 0.5) * 0.1],
          route: "Route 500DA"
        }
      ]);
    };

    updateBuses();
    const interval = setInterval(updateBuses, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Live Buses */}
        {buses.map((bus) => (
          <Marker key={bus.id} position={bus.position} icon={busIcon}>
            <Popup>
              <div>
                <strong>{bus.route}</strong><br />
                Bus ID: {bus.id}<br />
                Status: Active
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Metro Stations */}
        {metroStations.map((station) => (
          <Marker key={station.name} position={station.position} icon={metroIcon}>
            <Popup>
              <div>
                <strong>{station.name} Metro</strong><br />
                Purple Line<br />
                Next train: 3 min
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Start and End markers */}
        {startPoint && (
          <Marker position={startPoint}>
            <Popup>Start Location</Popup>
          </Marker>
        )}
        
        {endPoint && (
          <Marker position={endPoint}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Route line */}
        {selectedRoute && selectedRoute.coordinates && (
          <Polyline 
            positions={selectedRoute.coordinates}
            color={selectedRoute.type === 'metro' ? '#10b981' : '#2563eb'}
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </div>
  );
}