import { useState } from "react";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Database, 
  RefreshCw, 
  Plus, 
  Trash2,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock admin data
const systemStats = {
  totalScans: 15847,
  phishingDetected: 3291,
  accuracy: 94.7,
  activeUsers: 1256,
  blockedThreats: 3291,
  falsePositives: 187
};

const mockBlacklist = [
  { id: 1, domain: "phishing-site.com", addedBy: "admin", date: "2024-01-15" },
  { id: 2, domain: "fake-bank.net", addedBy: "admin", date: "2024-01-14" },
  { id: 3, domain: "suspicious-login.org", addedBy: "system", date: "2024-01-13" }
];

const mockWhitelist = [
  { id: 1, domain: "github.com", addedBy: "admin", date: "2024-01-10" },
  { id: 2, domain: "stackoverflow.com", addedBy: "admin", date: "2024-01-10" },
  { id: 3, domain: "company-domain.com", addedBy: "admin", date: "2024-01-09" }
];

const recentActivity = [
  { id: 1, action: "Model retrained", user: "system", timestamp: "2024-01-15 15:30:00" },
  { id: 2, action: "Blacklist updated", user: "admin", timestamp: "2024-01-15 14:45:00" },
  { id: 3, action: "False positive reported", user: "user_123", timestamp: "2024-01-15 14:20:00" },
  { id: 4, action: "Threat blocked", user: "system", timestamp: "2024-01-15 14:15:00" }
];

const AdminDashboard = () => {
  const [isRetraining, setIsRetraining] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleRetrain = async () => {
    setIsRetraining(true);
    // Simulate retraining
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRetraining(false);
  };

  const handleAddToList = (listType: "blacklist" | "whitelist") => {
    if (newDomain.trim()) {
      // In real app, this would call API
      console.log(`Adding ${newDomain} to ${listType}`);
      setNewDomain("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="gradient-primary p-3 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">System monitoring and management</p>
          </div>
        </div>
        
        <Button
          onClick={handleRetrain}
          disabled={isRetraining}
          className="gradient-blockchain"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRetraining ? 'animate-spin' : ''}`} />
          {isRetraining ? 'Retraining Model...' : 'Retrain Model'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-3 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Total Scans (Beta)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="gradient-danger p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">31</p>
                <p className="text-sm text-muted-foreground">Threats Detected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-muted p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-bold text-muted-foreground">Training...</p>
                <p className="text-sm text-muted-foreground">Model in Development</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-muted p-3 rounded-lg">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">12</p>
                <p className="text-sm text-muted-foreground">Beta Testers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="gradient-warning p-3 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">31</p>
                <p className="text-sm text-muted-foreground">Blocked Threats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-muted p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-bold text-muted-foreground">Tracking...</p>
                <p className="text-sm text-muted-foreground">False Positive Analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Accuracy</span>
              <span>{systemStats.accuracy}%</span>
            </div>
            <Progress value={systemStats.accuracy} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Precision</span>
              <span>92.3%</span>
            </div>
            <Progress value={92.3} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Recall</span>
              <span>89.7%</span>
            </div>
            <Progress value={89.7} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="blacklist">Blacklist Management</TabsTrigger>
          <TabsTrigger value="whitelist">Whitelist Management</TabsTrigger>
          <TabsTrigger value="models" disabled>AI Models (Coming Soon)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">by {activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blacklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blacklist Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Enter domain to blacklist..."
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
                <Button onClick={() => handleAddToList("blacklist")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBlacklist.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono">{item.domain}</TableCell>
                      <TableCell>{item.addedBy}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="text-danger">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="whitelist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Whitelist Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Enter domain to whitelist..."
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
                <Button onClick={() => handleAddToList("whitelist")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWhitelist.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono">{item.domain}</TableCell>
                      <TableCell>{item.addedBy}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="text-danger">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;