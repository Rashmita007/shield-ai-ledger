import { useParams, Link } from "react-router-dom";
import { Shield, AlertTriangle, CheckCircle, ArrowLeft, ExternalLink, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data - in real app, this would come from API
const mockResults = {
  "1": {
    url: "https://suspicious-bank-login.com",
    riskScore: 85,
    status: "phishing",
    indicators: [
      "Suspicious domain pattern",
      "Unusual keywords detected",
      "No valid SSL certificate",
      "Domain registered recently"
    ],
    actionTaken: "Blocked",
    timestamp: "2024-01-15 14:30:25",
    aiModel: "PhishNet-V2.1"
  },
  "2": {
    url: "https://github.com/user/repo",
    riskScore: 15,
    status: "safe",
    indicators: [
      "Legitimate domain",
      "Valid SSL certificate",
      "Known safe patterns"
    ],
    actionTaken: "Allowed",
    timestamp: "2024-01-15 14:25:10",
    aiModel: "PhishNet-V2.1"
  }
};

const DetectionResult = () => {
  const { id } = useParams<{ id: string }>();
  const result = mockResults[id as keyof typeof mockResults];

  if (!result) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Result Not Found</h2>
        <p className="text-muted-foreground mb-4">The detection result you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  const isPhishing = result.status === "phishing";
  const StatusIcon = isPhishing ? AlertTriangle : CheckCircle;
  const statusColor = isPhishing ? "danger" : "safe";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scanner
          </Link>
        </Button>
        
        <div className="flex items-center space-x-2">
          <StatusIcon className={`h-5 w-5 text-${statusColor}`} />
          <Badge variant={isPhishing ? "destructive" : "default"} className={isPhishing ? "gradient-danger" : "gradient-safe"}>
            {result.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Main Result Card */}
      <Card className="border-2" style={{ borderColor: isPhishing ? "hsl(var(--danger))" : "hsl(var(--safe))" }}>
        <CardHeader className={isPhishing ? "gradient-danger" : "gradient-safe"}>
          <div className="flex items-center justify-between text-white">
            <div>
              <CardTitle className="text-xl">Detection Result</CardTitle>
              <p className="text-sm opacity-90">AI/ML Analysis Complete</p>
            </div>
            <Shield className="h-8 w-8" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* URL */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Analyzed URL:</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-mono mt-1 break-all">{result.url}</p>
          </div>

          {/* Risk Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Risk Score</span>
              <span className={`text-2xl font-bold text-${statusColor}`}>{result.riskScore}/100</span>
            </div>
            <Progress value={result.riskScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {result.riskScore >= 70 ? "High Risk - Likely Phishing" : 
               result.riskScore >= 40 ? "Medium Risk - Suspicious" : 
               "Low Risk - Appears Safe"}
            </p>
          </div>

          {/* Indicators */}
          <div className="space-y-3">
            <h3 className="font-semibold">Detection Indicators</h3>
            <div className="space-y-2">
              {result.indicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full bg-${statusColor}`} />
                  <span className="text-sm">{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Taken */}
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Action Taken</span>
              <Badge variant={result.actionTaken === "Blocked" ? "destructive" : "default"}>
                {result.actionTaken}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {result.actionTaken === "Blocked" 
                ? "Access has been blocked to protect you from potential threats"
                : "URL appears safe and access is allowed"
              }
            </p>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <span className="text-sm font-medium">AI Model:</span>
              <p className="text-sm text-muted-foreground">{result.aiModel}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Analyzed:</span>
              <p className="text-sm text-muted-foreground">{result.timestamp}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild className="flex-1">
          <Link to="/blockchain">
            <Database className="h-4 w-4 mr-2" />
            View Blockchain Log
          </Link>
        </Button>
        <Button variant="outline" className="flex-1">
          Report False Positive
        </Button>
      </div>
    </div>
  );
};

export default DetectionResult;