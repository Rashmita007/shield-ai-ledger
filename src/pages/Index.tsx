import { useState } from "react";
import { Bus, MapPin, Clock, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransportMap } from "@/components/TransportMap";
import { RoutePlanner } from "@/components/RoutePlanner";
import { RouteRecommendations } from "@/components/RouteRecommendations";

const Index = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);

  const handleRouteCalculated = (calculatedRoutes: any[]) => {
    setRoutes(calculatedRoutes);
    setSelectedRoute(calculatedRoutes[0]); // Auto-select fastest route
  };

  const handleLocationSelect = (start: [number, number] | null, end: [number, number] | null) => {
    setStartPoint(start);
    setEndPoint(end);
  };

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="gradient-primary p-6 rounded-2xl mx-auto w-fit">
          <Bus className="h-16 w-16 text-white mx-auto" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Real-Time Bengaluru
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Public Transport Optimizer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart route recommendations combining live BMTC buses, Namma Metro schedules, 
            and real-time traffic data to find your fastest journey.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Live Buses</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">42</div>
              <div className="text-sm text-muted-foreground">Metro Stations</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">8.2k</div>
              <div className="text-sm text-muted-foreground">Daily Routes</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Route Planner and Recommendations */}
        <div className="space-y-6">
          <RoutePlanner 
            onRouteCalculated={handleRouteCalculated}
            onLocationSelect={handleLocationSelect}
          />
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Smart Recommendations
            </h3>
            <RouteRecommendations 
              routes={routes}
              onRouteSelect={handleRouteSelect}
              selectedRoute={selectedRoute}
            />
          </div>
        </div>

        {/* Right Column - Interactive Map */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Live Transport Map
          </h3>
          <TransportMap 
            startPoint={startPoint}
            endPoint={endPoint}
            selectedRoute={selectedRoute}
          />
          
          {/* Legend */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Map Legend</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>BMTC Buses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Metro Stations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-2 bg-red-500"></div>
                  <span>Heavy Traffic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-2 bg-green-500"></div>
                  <span>Clear Roads</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Real-time Updates */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">🔄 Live Updates Active</h3>
              <p className="text-sm text-blue-700">Bus positions and traffic data refreshing every 30 seconds</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <Clock className="h-4 w-4" />
              <span>Last updated: Now</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;