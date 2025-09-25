import { useState } from "react";
import { Link } from "react-router-dom";
import { History as HistoryIcon, Shield, AlertTriangle, CheckCircle, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock history data
const mockHistory = [
  {
    id: "1",
    type: "url",
    content: "https://suspicious-bank-login.com",
    riskScore: 85,
    status: "phishing",
    timestamp: "2024-01-15 14:30:25",
    feedback: null
  },
  {
    id: "2",
    type: "url",
    content: "https://github.com/user/repo",
    riskScore: 15,
    status: "safe",
    timestamp: "2024-01-15 14:25:10",
    feedback: "correct"
  },
  {
    id: "3",
    type: "email",
    content: "Urgent: Account Verification Required - Please click here to verify...",
    riskScore: 92,
    status: "phishing",
    timestamp: "2024-01-15 14:20:45",
    feedback: "correct"
  },
  {
    id: "4",
    type: "url",
    content: "https://legitimate-service.com/dashboard",
    riskScore: 5,
    status: "safe",
    timestamp: "2024-01-15 14:15:30",
    feedback: null
  },
  {
    id: "5",
    type: "email",
    content: "Welcome to our newsletter! Here are the latest updates...",
    riskScore: 88,
    status: "phishing",
    timestamp: "2024-01-15 14:10:15",
    feedback: "incorrect"
  }
];

const History = () => {
  const [filter, setFilter] = useState("all");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<string | null>(null);

  const filteredHistory = mockHistory.filter(item => {
    if (filter === "all") return true;
    if (filter === "phishing") return item.status === "phishing";
    if (filter === "safe") return item.status === "safe";
    if (filter === "needs-feedback") return item.feedback === null;
    return true;
  });

  const handleFeedback = async (id: string, feedbackType: "correct" | "incorrect") => {
    setFeedbackSubmitting(id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the item in mock data (in real app, this would update the server)
    const item = mockHistory.find(h => h.id === id);
    if (item) {
      item.feedback = feedbackType;
    }
    
    setFeedbackSubmitting(null);
  };

  const getStatusIcon = (status: string) => {
    return status === "phishing" ? AlertTriangle : CheckCircle;
  };

  const getStatusColor = (status: string) => {
    return status === "phishing" ? "danger" : "safe";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="gradient-primary p-3 rounded-lg">
            <HistoryIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Scan History</h1>
            <p className="text-muted-foreground">Review your previous scans and provide feedback</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockHistory.length}</p>
                <p className="text-sm text-muted-foreground">Total Scans</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-danger" />
              <div>
                <p className="text-2xl font-bold">{mockHistory.filter(h => h.status === "phishing").length}</p>
                <p className="text-sm text-muted-foreground">Threats Blocked</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-safe" />
              <div>
                <p className="text-2xl font-bold">{mockHistory.filter(h => h.status === "safe").length}</p>
                <p className="text-sm text-muted-foreground">Safe Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-blockchain" />
              <div>
                <p className="text-2xl font-bold">{mockHistory.filter(h => h.feedback === "correct").length}</p>
                <p className="text-sm text-muted-foreground">Accurate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Filter:</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scans</SelectItem>
            <SelectItem value="phishing">Phishing Detected</SelectItem>
            <SelectItem value="safe">Safe Items</SelectItem>
            <SelectItem value="needs-feedback">Needs Feedback</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                const statusColor = getStatusColor(item.status);
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-xs">
                      <div className="flex items-center space-x-2">
                        {item.type === "url" ? <ExternalLink className="h-4 w-4 flex-shrink-0" /> : <div className="h-4 w-4 flex-shrink-0" />}
                        <span className="truncate text-sm">{item.content}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-${statusColor}`}>{item.riskScore}</span>
                        <span className="text-muted-foreground">/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-4 w-4 text-${statusColor}`} />
                        <Badge variant={item.status === "phishing" ? "destructive" : "default"}>
                          {item.status === "phishing" ? "Phishing" : "Safe"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.timestamp}
                    </TableCell>
                     <TableCell>
                       {item.feedback === null ? (
                         <Badge variant="outline" className="text-xs">
                           Coming Soon
                         </Badge>
                       ) : (
                         <Badge variant={item.feedback === "correct" ? "default" : "secondary"}>
                           {item.feedback === "correct" ? "Correct" : "Incorrect"}
                         </Badge>
                       )}
                     </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/result/${item.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;