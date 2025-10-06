import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ListPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProcessInputForm({ onAddProcess, processes, onRemoveProcess }) {
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(5);
  const [priority, setPriority] = useState(1);
  const [type, setType] = useState("foreground");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onAddProcess({
      arrivalTime: parseInt(arrivalTime),
      burstTime: parseInt(burstTime),
      priority: parseInt(priority),
      type
    });

    // Reset form
    setArrivalTime(0);
    setBurstTime(5);
    setPriority(1);
    setType("foreground");
  };

  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <ListPlus className="w-5 h-5 text-emerald-600" />
          Add Processes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Arrival Time</Label>
              <Input
                type="number"
                min="0"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="border-slate-200 focus:ring-emerald-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Burst Time</Label>
              <Input
                type="number"
                min="1"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
                className="border-slate-200 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Priority</Label>
              <Input
                type="number"
                min="1"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border-slate-200 focus:ring-emerald-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Process Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-slate-200 focus:ring-emerald-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foreground">Foreground</SelectItem>
                  <SelectItem value="background">Background</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Process
          </Button>
        </form>

        {/* Process List */}
        {processes.length > 0 && (
          <div className="mt-6 space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Current Processes</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
 