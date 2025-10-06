import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings2, Cpu } from "lucide-react";

export default function SchedulerControls({
  cpuCount,
  setCpuCount,
  algorithm,
  setAlgorithm,
  isPreemptive,
  setIsPreemptive,
  timeQuantum,
  setTimeQuantum
}) {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Settings2 className="w-5 h-5 text-indigo-600" />
          Scheduler Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* CPU Count */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            Number of CPUs
          </Label>
          <Select value={cpuCount.toString()} onValueChange={(v) => setCpuCount(parseInt(v))}>
            <SelectTrigger className="border-slate-200 focus:ring-indigo-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'CPU' : 'CPUs'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">
            Scheduling Algorithm
          </Label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="border-slate-200 focus:ring-indigo-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fcfs">First Come First Serve (FCFS)</SelectItem>
              <SelectItem value="sjf">Shortest Job First (SJF)</SelectItem>
              <SelectItem value="priority">Priority Scheduling</SelectItem>
              <SelectItem value="rr">Round Robin (RR)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preemptive Toggle */}
        {algorithm !== "rr" && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold text-slate-700">
                Preemptive Mode
              </Label>
              <p className="text-xs text-slate-500">
                Allow process interruption
              </p>
            </div>
            <Switch
              checked={isPreemptive}
              onCheckedChange={setIsPreemptive}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        )}

        {/* Time Quantum */}
        {algorithm === "rr" && (
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">
              Time Quantum (ms)
            </Label>
            <Input
              type="number"
              min="1"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(parseInt(e.target.value) || 1)}
              className="border-slate-200 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Algorithm Info */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
          <p className="text-xs text-slate-600 leading-relaxed">
            {algorithm === "fcfs" && "Processes are executed in order of arrival."}
            {algorithm === "sjf" && "Shortest burst time processes execute first."}
            {algorithm === "priority" && "Lower priority number = higher priority."}
            {algorithm === "rr" && "Each process gets equal CPU time slices."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}