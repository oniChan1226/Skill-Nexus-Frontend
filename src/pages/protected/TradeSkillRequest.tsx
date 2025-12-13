import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import {
  useGetSentTradeRequestsQuery,
  useGetReceivedTradeRequestsQuery,
  useUpdateTradeStatusMutation,
} from "@/services/tradeRequest.service";
import type { TradeRequest } from "@/types/tradeRequest.types";
import { toast } from "react-toastify";

export default function TradeSkillRequest() {
  const { data: sentData, isLoading: isSentLoading, error: sentError } =
    useGetSentTradeRequestsQuery();
  const { data: receivedData, isLoading: isReceivedLoading, error: receivedError } =
    useGetReceivedTradeRequestsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateTradeStatusMutation();

  const sentRequests = sentData?.trades || [];
  const receivedRequests = receivedData?.trades || [];

  const handleApprove = async (tradeId: string) => {
    try {
      await updateStatus({ tradeId, status: "accepted" }).unwrap();
      toast.success("Trade request accepted!");
    } catch (error) {
      toast.error("Failed to accept trade request");
      console.error(error);
    }
  };

  const handleReject = async (tradeId: string) => {
    try {
      await updateStatus({ tradeId, status: "rejected" }).unwrap();
      toast.success("Trade request rejected");
    } catch (error) {
      toast.error("Failed to reject trade request");
      console.error(error);
    }
  };

  const handleComplete = async (tradeId: string) => {
    try {
      await updateStatus({ tradeId, status: "completed" }).unwrap();
      toast.success("Trade marked as completed!");
    } catch (error) {
      toast.error("Failed to complete trade");
      console.error(error);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "destructive";
      case "completed":
        return "default";
      default:
        return "secondary";
    }
  };

  if (isReceivedLoading || isSentLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
        <p className="text-neutral-600 dark:text-neutral-300">Loading trade requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white">Trade Requests</h1>

      <Tabs defaultValue="incoming" className="space-y-4 md:space-y-6">
        <TabsList className="mb-4 bg-neutral-100 dark:bg-neutral-900 rounded-md p-1 w-full grid grid-cols-2 gap-1">
          <TabsTrigger
            value="incoming"
            className="text-sm md:text-base text-neutral-700 dark:text-neutral-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md truncate"
          >
            <span className="hidden sm:inline">Incoming Requests </span>
            <span className="sm:hidden">Incoming </span>
            ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="text-sm md:text-base text-neutral-700 dark:text-neutral-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md truncate"
          >
            <span className="hidden sm:inline">Sent Requests </span>
            <span className="sm:hidden">Sent </span>
            ({sentRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* Incoming Requests */}
        <TabsContent value="incoming">
          {receivedError && (
            <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
              <CardContent className="py-6 flex items-center gap-3">
                <AlertCircle className="text-red-500" />
                <p className="text-red-600 dark:text-red-300">Failed to load incoming requests</p>
              </CardContent>
            </Card>
          )}

          {receivedRequests.length === 0 && !receivedError ? (
            <Card className="bg-neutral-50 dark:bg-neutral-900/50">
              <CardContent className="py-12 text-center text-neutral-500 dark:text-neutral-400">
                No incoming trade requests
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {receivedRequests.map((req: TradeRequest) => (
               <Card
  key={req._id}
  className="flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg overflow-hidden"
>
  {/* Card Header */}
  <CardHeader className="flex items-start justify-between gap-3 pb-2 md:pb-3">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <img
        src={req.sender.profileImage}
        alt={req.sender.name}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
      />
      <div className="min-w-0">
        <CardTitle className="text-sm md:text-lg font-semibold dark:text-white truncate">
          {req.sender.name}
        </CardTitle>
        {req.message && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5 italic">
            "{req.message}"
          </p>
        )}
      </div>
    </div>
    <Badge
      variant={getStatusBadgeVariant(req.status)}
      className="flex-shrink-0 text-xs md:text-sm"
    >
      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
    </Badge>
  </CardHeader>

  {/* Card Body */}
  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-neutral-700 dark:text-neutral-300 pt-0">
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
        They offer:
      </span>
      <span className="text-sm md:text-base font-medium truncate">
        {req.senderOfferedSkill.name}
      </span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
        They want:
      </span>
      <span className="text-sm md:text-base font-medium truncate">
        {req.receiverOfferedSkill.name}
      </span>
    </div>
  </CardContent>

  {/* Actions */}
  {req.status === "pending" && (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 px-4 pb-4">
      <Button
        variant="default"
        size="sm"
        onClick={() => handleApprove(req._id)}
        disabled={isUpdating}
        className="w-full sm:w-auto flex-1"
      >
        Accept
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleReject(req._id)}
        disabled={isUpdating}
        className="w-full sm:w-auto flex-1"
      >
        Reject
      </Button>
    </div>
  )}

  {req.status === "accepted" && (
    <div className="mt-4 px-4 pb-4">
      <Button
        variant="default"
        size="sm"
        onClick={() => handleComplete(req._id)}
        disabled={isUpdating}
        className="w-full flex items-center justify-center"
      >
        <CheckCircle size={16} className="mr-2" />
        Mark as Completed
      </Button>
    </div>
  )}
</Card>

              ))}
            </div>
          )}
        </TabsContent>

        {/* Sent Requests */}
        <TabsContent value="sent">
          {sentError && (
            <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
              <CardContent className="py-6 flex items-center gap-3">
                <AlertCircle className="text-red-500" />
                <p className="text-red-600 dark:text-red-300">Failed to load sent requests</p>
              </CardContent>
            </Card>
          )}

          {sentRequests.length === 0 && !sentError ? (
            <Card className="bg-neutral-50 dark:bg-neutral-900/50">
              <CardContent className="py-12 text-center text-neutral-500 dark:text-neutral-400">
                No sent trade requests
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sentRequests.map((req: TradeRequest) => (
               <Card
  key={req._id}
  className="flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg overflow-hidden"
>
  {/* Card Header */}
  <CardHeader className="flex items-start justify-between gap-3 pb-2 md:pb-3">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <img
        src={req.receiver.profileImage}
        alt={req.receiver.name}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
      />
      <div className="min-w-0">
        <CardTitle className="text-sm md:text-lg font-semibold dark:text-white truncate">
          {req.receiver.name}
        </CardTitle>
        {req.message && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5 italic">
            "{req.message}"
          </p>
        )}
      </div>
    </div>
    <Badge
      variant={getStatusBadgeVariant(req.status)}
      className="flex-shrink-0 text-xs md:text-sm"
    >
      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
    </Badge>
  </CardHeader>

  {/* Card Body */}
  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-neutral-700 dark:text-neutral-300 pt-0">
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
        You offer:
      </span>
      <span className="text-sm md:text-base font-medium truncate">
        {req.senderOfferedSkill.name}
      </span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
        You want:
      </span>
      <span className="text-sm md:text-base font-medium truncate">
        {req.receiverOfferedSkill.name}
      </span>
    </div>
  </CardContent>

  {/* Actions */}
  {/* {req.status === "pending" && (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 px-4 pb-4">
      <Button
        variant="default"
        size="sm"
        onClick={() => handleApprove(req._id)}
        disabled={isUpdating}
        className="w-full sm:w-auto flex-1"
      >
        Accept
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleReject(req._id)}
        disabled={isUpdating}
        className="w-full sm:w-auto flex-1"
      >
        Reject
      </Button>
    </div>
  )} */}

  {req.status === "accepted" && (
    <div className="mt-4 px-4 pb-4">
      <Button
        variant="default"
        size="sm"
        onClick={() => handleComplete(req._id)}
        disabled={isUpdating}
        className="w-full flex items-center justify-center"
      >
        <CheckCircle size={16} className="mr-2" />
        Mark as Completed
      </Button>
    </div>
  )}
</Card>

              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
