import { useState } from "react";
import { Database, Lock, CheckCircle, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock blockchain log data
const mockBlockchainLogs = [
  {
    id: "0x7a8f...",
    hash: "0x7a8f9b2c4d5e6f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    timestamp: "2024-01-15 14:30:25",
    userId: "user_12345",
    action: "PHISHING_DETECTED",
    data: {
      url: "https://suspicious-bank-login.com",
      riskScore: 85,
      status: "blocked"
    },
    status: "verified",
    blockNumber: 145892,
    gasUsed: "21000"
  },
  {
    id: "0x6b7e...",
    hash: "0x6b7e8a1c3d4e5f0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    timestamp: "2024-01-15 14:25:10",
    userId: "user_12345",
    action: "URL_VERIFIED_SAFE",
    data: {
      url: "https://github.com/user/repo",
      riskScore: 15,
      status: "allowed"
    },
    status: "verified",
    blockNumber: 145891,
    gasUsed: "21000"
  },
  {
    id: "0x5a6d...",
    hash: "0x5a6d7c0b2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g",
    timestamp: "2024-01-15 14:20:45",
    userId: "user_67890",
    action: "EMAIL_SCANNED",
    data: {
      subject: "Urgent: Account Verification Required",
      riskScore: 92,
      status: "blocked"
    },
    status: "pending",
    blockNumber: 145890,
    gasUsed: "21000"
  }
];

const BlockchainLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<typeof mockBlockchainLogs[0] | null>(null);

  const filteredLogs = mockBlockchainLogs.filter(log => 
    log.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="gradient-blockchain p-3 rounded-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Blockchain Log Viewer</h1>
            <p className="text-muted-foreground">Immutable security event records</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by hash, user ID, or action..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-safe" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Verified Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-blockchain" />
              <div>
                <p className="text-2xl font-bold">145,892</p>
                <p className="text-sm text-muted-foreground">Latest Block</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Entries</h2>
          
          {filteredLogs.map((log) => (
            <Card 
              key={log.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedLog?.id === log.id ? 'ring-2 ring-blockchain' : ''
              }`}
              onClick={() => setSelectedLog(log)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant={log.status === 'verified' ? 'default' : 'secondary'}
                    className={log.status === 'verified' ? 'gradient-safe' : ''}
                  >
                    {log.status === 'verified' ? 'Verified' : 'Pending'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Block #{log.blockNumber}</span>
                </div>
                
                <p className="font-mono text-sm text-muted-foreground mb-2">
                  {log.hash.substring(0, 20)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{log.action.replace(/_/g, ' ')}</span>
                  <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Log Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Entry Details</h2>
          
          {selectedLog ? (
            <Card>
              <CardHeader className="gradient-blockchain">
                <CardTitle className="text-white flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Blockchain Entry
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Transaction Hash:</span>
                    <p className="font-mono text-xs bg-muted p-2 rounded mt-1 break-all">
                      {selectedLog.hash}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Block Number:</span>
                      <p className="text-sm text-muted-foreground">#{selectedLog.blockNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Gas Used:</span>
                      <p className="text-sm text-muted-foreground">{selectedLog.gasUsed}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">User ID:</span>
                    <p className="text-sm text-muted-foreground">{selectedLog.userId}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Action:</span>
                    <p className="text-sm text-muted-foreground">{selectedLog.action.replace(/_/g, ' ')}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Data:</span>
                    <div className="bg-muted p-3 rounded mt-1 text-xs">
                      <pre>{JSON.stringify(selectedLog.data, null, 2)}</pre>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Badge 
                      variant={selectedLog.status === 'verified' ? 'default' : 'secondary'}
                      className={selectedLog.status === 'verified' ? 'gradient-safe' : ''}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {selectedLog.status === 'verified' ? 'Verified' : 'Pending'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{selectedLog.timestamp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select an entry to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainLog;