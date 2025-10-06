import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, TrendingUp, Cpu, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MetricsPanel({ metrics, processes }) {
  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 mb-1">Avg Waiting Time</p>
                <p className="text-2xl font-bold text-slate-900">{metrics.avgWaitingTime}ms</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 mb-1">Avg Turnaround Time</p>
                <p className="text-2xl font-bold text-slate-900">{metrics.avgTurnaroundTime}ms</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 mb-1">CPU Utilization</p>
                <p className="text-2xl font-bold text-slate-900">{metrics.cpuUtilization}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Process Metrics */}
      <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
        <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white pb-4">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Cpu className="w-5 h-5 text-indigo-600" />
            Process Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Process ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Arrival Time</TableHead>
                  <TableHead className="font-semibold text-slate-700">Burst Time</TableHead>
                  <TableHead className="font-semibold text-slate-700">Completion</TableHead>
                  <TableHead className="font-semibold text-slate-700">Waiting Time</TableHead>
                  <TableHead className="font-semibold text-slate-700">Turnaround</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process) => (
                  <TableRow key={process.id} className="border-slate-100">
                    <TableCell className="font-medium">{process.id}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          process.type === "foreground"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0"
                            : "bg-slate-300 text-slate-700 border-0"
                        }
                      >
                        {process.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{process.arrivalTime}ms</TableCell>
                    <TableCell>{process.burstTime}ms</TableCell>
                    <TableCell>{process.completionTime}ms</TableCell>
                    <TableCell className="font-semibold text-blue-600">{process.waitingTime}ms</TableCell>
                    <TableCell className="font-semibold text-emerald-600">{process.turnaroundTime}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}