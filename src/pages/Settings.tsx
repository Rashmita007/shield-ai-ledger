import { useState } from "react";
import { Settings as SettingsIcon, User, Shield, Bell, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data
const userData = {
  id: "user_12345",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "user",
  joinDate: "2024-01-10",
  totalScans: 47,
  sensitivity: "medium"
};

const Settings = () => {
  const [profile, setProfile] = useState(userData);
  const [sensitivity, setSensitivity] = useState(userData.sensitivity);
  const [notifications, setNotifications] = useState({
    phishingAlerts: true,
    systemUpdates: false,
    weeklyReports: true
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleSensitivityChange = (value: string) => {
    setSensitivity(value);
    // In real app, this would update the user's model sensitivity
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="gradient-primary p-3 rounded-lg">
          <SettingsIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Account Statistics</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Member since: {profile.joinDate}</span>
                    <span>Total scans: {profile.totalScans}</span>
                    <Badge variant="outline">{profile.role}</Badge>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="gradient-safe"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Model Sensitivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Detection Sensitivity Level</Label>
                <Select value={sensitivity} onValueChange={handleSensitivityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sensitivity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex flex-col">
                        <span>Low Sensitivity</span>
                        <span className="text-xs text-muted-foreground">Fewer false positives, may miss some threats</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex flex-col">
                        <span>Medium Sensitivity (Recommended)</span>
                        <span className="text-xs text-muted-foreground">Balanced detection and false positive rate</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex flex-col">
                        <span>High Sensitivity</span>
                        <span className="text-xs text-muted-foreground">Maximum protection, more false positives</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This setting controls how aggressively the AI model flags potentially suspicious content.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">API Access</p>
                    <p className="text-sm text-muted-foreground">Generate API keys for integrations</p>
                  </div>
                  <Button variant="outline">Manage Keys</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Phishing Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when threats are detected</p>
                  </div>
                  <Switch
                    checked={notifications.phishingAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, phishingAlerts: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Model updates and system maintenance</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, systemUpdates: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Summary of your scan activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, weeklyReports: checked})
                    }
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="gradient-safe">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-blockchain" />
                    <span className="font-medium">Blockchain-Based Logging</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All scan results are logged to an immutable blockchain for transparency and audit purposes. 
                    This ensures data integrity and prevents tampering with security logs.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Data Collection</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• URLs and email content are analyzed for phishing detection</li>
                    <li>• Scan results and risk scores are stored for model improvement</li>
                    <li>• User feedback helps train our AI models</li>
                    <li>• All data is encrypted and stored securely</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Your Rights</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Download My Data
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete My Account
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button variant="link" className="p-0 h-auto text-sm">
                    View Privacy Policy
                  </Button>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    View Terms of Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;