import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react"; // optional icons for visual appeal

const dummyRequests = {
  incoming: [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=3",
      skillOffered: "Docker",
      skillWanted: "Node.js",
      mutualMatch: false,
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
      skillOffered: "React",
      skillWanted: "Angular",
      mutualMatch: true,
      status: "Accepted",
    },
  ],
  sent: [
    {
      id: 3,
      name: "Ali Khan",
      avatar: "https://i.pravatar.cc/150?img=6",
      skillOffered: "Node.js",
      skillWanted: "Docker",
      mutualMatch: true,
      status: "Pending",
    },
  ],
};

export default function TradeSkillRequest() {
  const [requests, setRequests] = useState(dummyRequests);

  const handleApprove = (id) =>
    setRequests((prev) => ({
      ...prev,
      incoming: prev.incoming.map((r) =>
        r.id === id ? { ...r, status: "Accepted" } : r
      ),
    }));

  const handleReject = (id) =>
    setRequests((prev) => ({
      ...prev,
      incoming: prev.incoming.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      ),
    }));

  const handleCancel = (id) =>
    setRequests((prev) => ({
      ...prev,
      sent: prev.sent.filter((r) => r.id !== id),
    }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trade Requests</h1>
      <Tabs defaultValue="incoming" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>

        {/* Incoming */}
        <TabsContent value="incoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.incoming.map((req) => (
              <Card
                key={req.id}
                className="shadow-lg hover:shadow-xl transition duration-200"
              >
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{req.name}</CardTitle>
                      {req.mutualMatch && (
                        <div className="flex items-center space-x-1 text-green-600 font-semibold text-sm">
                          <CheckCircle size={16} /> Mutual Match
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={
                      req.status === "Pending"
                        ? "secondary"
                        : req.status === "Accepted"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {req.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Skill Offered:</strong> {req.skillOffered}
                  </p>
                  <p>
                    <strong>Skill Wanted:</strong> {req.skillWanted}
                  </p>
                  {req.status === "Pending" && (
                    <div className="mt-4 flex space-x-3">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(req.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(req.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sent */}
        <TabsContent value="sent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.sent.map((req) => (
              <Card
                key={req.id}
                className="shadow-lg hover:shadow-xl transition duration-200"
              >
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{req.name}</CardTitle>
                      {req.mutualMatch && (
                        <div className="flex items-center space-x-1 text-green-600 font-semibold text-sm">
                          <CheckCircle size={16} /> Mutual Match
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={
                      req.status === "Pending"
                        ? "secondary"
                        : req.status === "Accepted"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {req.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Skill Offered:</strong> {req.skillOffered}
                  </p>
                  <p>
                    <strong>Skill Wanted:</strong> {req.skillWanted}
                  </p>
                  {req.status === "Pending" && (
                    <div className="mt-4 flex space-x-3">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(req.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
