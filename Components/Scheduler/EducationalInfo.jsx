import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Layers, Zap, Users } from "lucide-react";

export default function EducationalInfo() {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Understanding CPU Scheduling
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Foreground vs Background */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Foreground vs Background</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Foreground processes</strong> are interactive tasks requiring immediate CPU attention (e.g., user applications). 
              <strong className="text-slate-900"> Background processes</strong> are non-interactive, system-level tasks (e.g., backups, updates) that can wait for CPU availability.
            </p>
            <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
              <p className="text-xs text-slate-600">
                In this simulator, foreground processes are prioritized and scheduled before background ones, ensuring responsive user experience.
              </p>
            </div>
          </div>

          {/* Preemptive vs Non-Preemptive */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Preemptive vs Non-Preemptive</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Preemptive scheduling</strong> allows the OS to interrupt a running process to allocate CPU to a higher-priority task. 
              <strong className="text-slate-900"> Non-preemptive</strong> means once a process starts, it runs to completion.
            </p>
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-xs text-slate-600">
                Preemptive mode is ideal for real-time systems and ensures fairness, while non-preemptive reduces context-switching overhead.
              </p>
            </div>
          </div>

          {/* Multi-CPU Load Balancing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Multi-CPU Load Balancing</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              With multiple CPUs, processes are distributed across available processors to maximize throughput and minimize waiting time. 
              The scheduler assigns ready processes to idle CPUs dynamically.
            </p>
            <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
              <p className="text-xs text-slate-600">
                This simulator demonstrates parallel execution where multiple processes run simultaneously on different CPUs, improving overall system performance.
              </p>
            </div>
          </div>
        </div>

        {/* Algorithms Quick Reference */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="font-semibold text-slate-900 mb-4">Scheduling Algorithms Quick Reference</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">FCFS (First Come First Serve)</h4>
              <p className="text-xs text-slate-600">Simple queue-based scheduling. First process to arrive gets CPU first. May cause convoy effect.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">SJF (Shortest Job First)</h4>
              <p className="text-xs text-slate-600">Selects process with shortest burst time. Minimizes average waiting time but may cause starvation.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">Priority Scheduling</h4>
              <p className="text-xs text-slate-600">Assigns CPU based on priority levels. Lower number = higher priority. Can lead to starvation of low-priority tasks.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">Round Robin (RR)</h4>
              <p className="text-xs text-slate-600">Time-sharing algorithm with fixed time quantum. Ensures fairness and prevents starvation.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}