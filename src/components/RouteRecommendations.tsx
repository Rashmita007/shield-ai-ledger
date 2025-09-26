import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bus, Train, Clock, IndianRupee, MapPin, TrendingUp } from 'lucide-react';

interface RouteRecommendationsProps {
  routes: any[];
  onRouteSelect: (route: any) => void;
  selectedRoute: any;
}

export function RouteRecommendations({ routes, onRouteSelect, selectedRoute }: RouteRecommendationsProps) {
  if (routes.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8 text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter start and destination to see route recommendations</p>
        </CardContent>
      </Card>
    );
  }

  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'metro': return <Train className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      default: return <div className="flex"><Train className="h-4 w-4" /><Bus className="h-4 w-4" /></div>;
    }
  };

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'metro': return 'text-green-600 bg-green-50 border-green-200';
      case 'bus': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-purple-600 bg-purple-50 border-purple-200';
    }
  };

  const fastestRoute = routes[0];

  return (
    <div className="space-y-4">
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 text-lg">🚀 Fastest Option Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-green-700">
            <strong>{fastestRoute.name}</strong> is <strong>{routes[1] ? routes[1].duration - fastestRoute.duration : 5} minutes faster</strong> than alternatives
          </div>
        </CardContent>
      </Card>

      {routes.map((route, index) => (
        <Card 
          key={route.id} 
          className={`cursor-pointer transition-all duration-200 ${
            selectedRoute?.id === route.id ? 'ring-2 ring-primary border-primary' : 'hover:shadow-lg'
          } ${index === 0 ? 'border-green-300' : ''}`}
          onClick={() => onRouteSelect(route)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getRouteColor(route.type)}`}>
                  {getRouteIcon(route.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{route.name}</h3>
                    {index === 0 && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Fastest
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{route.details}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{route.duration} min total</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="h-4 w-4" />
                      <span>₹{route.cost}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{route.reliability}% reliable</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <span>Walk: {route.walkTime} min</span>
                    <span>Wait: {route.waitTime} min</span>
                    <span>Travel: {route.duration - route.walkTime - route.waitTime} min</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant={selectedRoute?.id === route.id ? "default" : "outline"}
                size="sm"
              >
                {selectedRoute?.id === route.id ? "Selected" : "Select"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}