import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GanttVisualization({ results, isSimulating, cpuCount }) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (results) {
      setAnimationPhase(0);
      const interval = setInterval(() => {
        setAnimationPhase(prev => prev + 1);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [results]);

  const getProcessColor = (processId, type) => {
    const colors = {
      foreground: [
        "from-cyan-500 to-blue-500",
        "from-emerald-500 to-teal-500",
        "from-violet-500 to-purple-500",
        "from-pink-500 to-rose-500",
        "from-amber-500 to-orange-500",
        "from-indigo-500 to-blue-500",
      ],
      background: [
        "from-slate-300 to-slate-400",
        "from-gray-300 to-gray-400",
        "from-zinc-300 to-zinc-400",
        "from-stone-300 to-stone-400",
        "from-neutral-300 to-neutral-400",
      ]
    };

    const colorArray = colors[type];
    const processNum = parseInt(processId.replace('P', '')) - 1;
    return colorArray[processNum % colorArray.length];
  };

  if (!results) {
    return (
      <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
        <CardContent className="py-24">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">No Simulation Running</h3>
              <p className="text-sm text-slate-500 mt-1">Add processes and click "Run Simulation" to begin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxTime = Math.max(...results.cpus.map(cpu => 
    cpu.timeline.length > 0 ? cpu.timeline[cpu.timeline.length - 1].endTime : 0
  ));

  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Gantt Chart Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {results.cpus.map((cpu, cpuIndex) => (
            <div key={cpu.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-20 text-sm font-semibold text-slate-700">
                  CPU {cpu.id}
                </div>
                <div className="flex-1 relative h-16 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  {/* Time markers */}
                  <div className="absolute inset-x-0 bottom-0 flex text-[10px] text-slate-400 px-2 pb-1">
                    {Array.from({ length: Math.min(maxTime + 1, 20) }, (_, i) => (
                      <div key={i} className="flex-1 text-center">
                        {i}
                      </div>
                    ))}
                  </div>

                  {/* Process blocks */}
                  <div className="absolute inset-0 flex items-center px-2 pb-6">
                    <AnimatePresence>
                      {cpu.timeline.map((task, taskIndex) => (
                        <motion.div
                          key={`${task.processId}-${taskIndex}`}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ 
                            scaleX: 1, 
                            opacity: 1,
 