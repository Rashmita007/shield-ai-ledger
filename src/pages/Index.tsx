import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Scan, 
  Mail, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  Database,
  Zap,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    riskScore: number;
    status: "safe" | "phishing";
    message: string;
  } | null>(null);

  const handleUrlScan = async () => {
    if (!url.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate AI scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on URL content
    const isSuspicious = url.includes("suspicious") || url.includes("phishing") || url.includes("fake");
    const riskScore = isSuspicious ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 5;
    
    setScanResult({
      riskScore,
      status: riskScore > 50 ? "phishing" : "safe",
      message: riskScore > 50 
        ? "⚠️ PHISHING DETECTED - This URL appears to be malicious"
        : "✅ SAFE - This URL appears to be legitimate"
    });
    
    setIsScanning(false);
  };

  const handleEmailScan = async () => {
    if (!email.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate AI scanning process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock result based on email content
    const isSuspicious = email.toLowerCase().includes("urgent") || 
                        email.toLowerCase().includes("verify") || 
                        email.toLowerCase().includes("click here");
    const riskScore = isSuspicious ? Math.floor(Math.random() * 25) + 75 : Math.floor(Math.random() * 35) + 10;
    
    setScanResult({
      riskScore,
      status: riskScore > 50 ? "phishing" : "safe",
      message: riskScore > 50 
        ? "⚠️ PHISHING DETECTED - This email contains suspicious patterns"
        : "✅ SAFE - This email appears to be legitimate"
    });
    
    setIsScanning(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="gradient-primary p-6 rounded-2xl mx-auto w-fit">
          <Shield className="h-16 w-16 text-white mx-auto mb-4" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Real-Time AI/ML-Based
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Phishing Detection & Prevention
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered cybersecurity platform with blockchain-secured logging 
            for transparent and immutable threat detection records.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
            <div className="gradient-blockchain p-2 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold">AI/ML Detection</p>
              <p className="text-sm text-muted-foreground">Advanced neural networks</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
            <div className="gradient-blockchain p-2 rounded-lg">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Blockchain Secured</p>
              <p className="text-sm text-muted-foreground">Immutable audit logs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
            <div className="gradient-blockchain p-2 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Real-Time</p>
              <p className="text-sm text-muted-foreground">Instant threat analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scanning Interface */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <Scan className="h-6 w-6 mr-2" />
            Security Scanner
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="url" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Scan URL
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Scan Email
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter URL to scan:</label>
                  <Input
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg p-6"
                  />
                </div>
                
                <Button 
                  onClick={handleUrlScan}
                  disabled={!url.trim() || isScanning}
                  size="lg"
                  className="w-full gradient-primary"
                >
                  {isScanning ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing with AI...
                    </div>
                  ) : (
                    <>
                      <Scan className="h-5 w-5 mr-2" />
                      Scan URL for Threats
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paste email content:</label>
                  <Textarea
                    placeholder="Paste the email content here for analysis..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>
                
                <Button 
                  onClick={handleEmailScan}
                  disabled={!email.trim() || isScanning}
                  size="lg"
                  className="w-full gradient-primary"
                >
                  {isScanning ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing with AI...
                    </div>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      Scan Email for Threats
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results */}
          {scanResult && (
            <Card className={`mt-6 border-2 ${scanResult.status === 'phishing' ? 'border-danger' : 'border-safe'}`}>
              <CardContent className="p-6">
                <div className={`text-center space-y-4`}>
                  <div className={`${scanResult.status === 'phishing' ? 'gradient-danger' : 'gradient-safe'} p-4 rounded-lg inline-flex items-center`}>
                    {scanResult.status === 'phishing' ? (
                      <AlertTriangle className="h-8 w-8 text-white mr-3" />
                    ) : (
                      <CheckCircle className="h-8 w-8 text-white mr-3" />
                    )}
                    <div className="text-white text-left">
                      <p className="text-2xl font-bold">{scanResult.riskScore}/100</p>
                      <p className="text-sm">Risk Score</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-lg font-semibold">{scanResult.message}</p>
                    
                    <Badge 
                      variant={scanResult.status === 'phishing' ? 'destructive' : 'default'}
                      className={`text-sm px-4 py-2 ${scanResult.status === 'phishing' ? 'gradient-danger' : 'gradient-safe'}`}
                    >
                      {scanResult.status === 'phishing' ? 'PHISHING DETECTED' : 'VERIFIED SAFE'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-center space-x-3 pt-4">
                    <Button asChild variant="outline">
                      <Link to="/result/1">
                        View Detailed Analysis
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline">
                      <Link to="/blockchain">
                        <Database className="h-4 w-4 mr-2" />
                        View Blockchain Log
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats - Development Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">247</div>
            <div className="text-sm text-muted-foreground">URLs Scanned (Beta)</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-danger">31</div>
            <div className="text-sm text-muted-foreground">Threats Blocked</div>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">--.--%</div>
            <div className="text-sm text-muted-foreground">Accuracy (In Training)</div>
          </CardContent>
        </Card>
        
        <Card className="border-dashed border-2">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">12</div>
            <div className="text-sm text-muted-foreground">Beta Users</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Explore Features</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/history">View Scan History</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blockchain">Blockchain Logs</Link>
          </Button>
          <Button asChild variant="outline" disabled className="opacity-50">
            <span>Real-time Monitoring (Coming Soon)</span>
          </Button>
          <Button asChild variant="outline" disabled className="opacity-50">
            <span>Browser Extension (In Development)</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;