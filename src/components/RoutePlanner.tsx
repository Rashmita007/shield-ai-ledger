import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Route, Clock, Zap } from 'lucide-react';

interface RoutePlannerProps {
  onRouteCalculated: (routes: any[]) => void;
  onLocationSelect: (start: [number, number] | null, end: [number, number] | null) => void;
}

export function RoutePlanner({ onRouteCalculated, onLocationSelect }: RoutePlannerProps) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateRoutes = async () => {
    if (!startLocation.trim() || !endLocation.trim()) return;
    
    setIsCalculating(true);
    
    // Simulate route calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock coordinates for demo
    const startCoords: [number, number] = [12.9716 + (Math.random() - 0.5) * 0.05, 77.5946 + (Math.random() - 0.5) * 0.05];
    const endCoords: [number, number] = [12.9716 + (Math.random() - 0.5) * 0.05, 77.5946 + (Math.random() - 0.5) * 0.05];
    
    onLocationSelect(startCoords, endCoords);
    
    // Mock route options with real-time data
    const routes = [
      {
        id: 'bus',
        type: 'bus',
        name: 'BMTC Bus Route',
        duration: Math.floor(Math.random() * 20) + 25,
        walkTime: Math.floor(Math.random() * 5) + 3,
        waitTime: Math.floor(Math.random() * 8) + 2,
        cost: 15,
        coordinates: [startCoords, [startCoords[0] + 0.01, startCoords[1] + 0.01], endCoords],
        details: 'Route 356E → Route 201',
        reliability: Math.floor(Math.random() * 20) + 75
      },
      {
        id: 'metro',
        type: 'metro',
        name: 'Namma Metro',
        duration: Math.floor(Math.random() * 15) + 18,
        walkTime: Math.floor(Math.random() * 8) + 5,
        waitTime: Math.floor(Math.random() * 4) + 2,
        cost: 25,
        coordinates: [startCoords, [startCoords[0] + 0.005, startCoords[1] + 0.005], endCoords],
        details: 'Purple Line',
        reliability: 95
      },
      {
        id: 'mixed',
        type: 'mixed',
        name: 'Metro + Bus',
        duration: Math.floor(Math.random() * 18) + 22,
        walkTime: Math.floor(Math.random() * 6) + 4,
        waitTime: Math.floor(Math.random() * 6) + 3,
        cost: 30,
        coordinates: [startCoords, [startCoords[0] + 0.008, startCoords[1] + 0.008], endCoords],
        details: 'Metro to MG Road → Bus 201',
        reliability: Math.floor(Math.random() * 15) + 80
      }
    ];
    
    // Sort by duration (fastest first)
    routes.sort((a, b) => a.duration - b.duration);
    
    onRouteCalculated(routes);
    setIsCalculating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Route className="h-5 w-5 mr-2" />
          Plan Your Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            From
          </label>
          <Input
            placeholder="Enter starting location (e.g., Majestic)"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-destructive" />
            To
          </label>
          <Input
            placeholder="Enter destination (e.g., Indiranagar)"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={calculateRoutes}
          disabled={!startLocation.trim() || !endLocation.trim() || isCalculating}
          className="w-full"
        >
          {isCalculating ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Calculating Best Routes...
            </div>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Find Best Route
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}