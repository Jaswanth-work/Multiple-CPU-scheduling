import React, { useState } from "react";
import ProcessInputForm from "../components/scheduler/ProcessInputForm";
import SchedulerControls from "../components/scheduler/SchedulerControls";
import GanttVisualization from "../components/scheduler/GanttVisualization";
import MetricsPanel from "../components/scheduler/MetricsPanel";
import EducationalInfo from "../components/scheduler/EducationalInfo";
import { Cpu, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Scheduler() {
  const [processes, setProcesses] = useState([]);
  const [cpuCount, setCpuCount] = useState(2);
  const [algorithm, setAlgorithm] = useState("fcfs");
  const [isPreemptive, setIsPreemptive] = useState(false);
  const [timeQuantum, setTimeQuantum] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);
  const [schedulingResults, setSchedulingResults] = useState(null);

  const handleAddProcess = (process) => {
    setProcesses([...processes, { ...process, id: `P${processes.length + 1}` }]);
  };

  const handleRemoveProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const runSimulation = () => {
    if (processes.length === 0) {
      alert("Please add at least one process");
      return;
    }

    setIsSimulating(true);
    
    // Run scheduling algorithm
    const results = scheduleProcesses(
      processes,
      cpuCount,
      algorithm,
      isPreemptive,
      timeQuantum
    );
    
    setSchedulingResults(results);
  };

  const resetSimulation = () => {
    setProcesses([]);
    setSchedulingResults(null);
    setIsSimulating(false);
    setCpuCount(2);
    setAlgorithm("fcfs");
    setIsPreemptive(false);
    setTimeQuantum(4);
  };

  const scheduleProcesses = (processes, cpuCount, algorithm, isPreemptive, timeQuantum) => {
    // Sort processes by arrival time
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    // Initialize CPUs
    const cpus = Array(cpuCount).fill(null).map((_, i) => ({
      id: i,
      timeline: [],
      currentTime: 0
    }));

    // Create process copies with remaining burst time
    const processList = sortedProcesses.map(p => ({
      ...p,
      remainingTime: p.burstTime,
      startTime: null,
      completionTime: null,
      waitingTime: 0,
      turnaroundTime: 0
    }));

    let currentTime = 0;
    const completedProcesses = [];
    
    // Main scheduling loop
    while (completedProcesses.length < processList.length) {
      // Get processes that have arrived
      const readyQueue = processList.filter(
        p => p.arrivalTime <= currentTime && p.remainingTime > 0
      );

      if (readyQueue.length === 0) {
        currentTime++;
        continue;
      }

      // Separate foreground and background processes
      const foregroundProcesses = readyQueue.filter(p => p.type === "foreground");
      const backgroundProcesses = readyQueue.filter(p => p.type === "background");

      // Priority: foreground first, then background
      const priorityQueue = [...foregroundProcesses, ...backgroundProcesses];

      // Sort based on algorithm
      let sortedQueue;
      switch (algorithm) {
        case "sjf":
          sortedQueue = priorityQueue.sort((a, b) => a.remainingTime - b.remainingTime);
          break;
        case "priority":
          sortedQueue = priorityQueue.sort((a, b) => a.priority - b.priority);
          break;
        case "rr":
          sortedQueue = priorityQueue;
          break;
        case "fcfs":
        default:
          sortedQueue = priorityQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
          break;
      }

      // Assign processes to available CPUs
      const availableCPUs = cpus.filter(cpu => {
        const lastTask = cpu.timeline[cpu.timeline.length - 1];
        return !lastTask || lastTask.endTime <= currentTime;
      });

      for (let i = 0; i < Math.min(sortedQueue.length, availableCPUs.length); i++) {
        const process = sortedQueue[i];
        const cpu = availableCPUs[i];

        if (process.startTime === null) {
          process.startTime = currentTime;
        }

        // Determine execution time
        let executionTime;
        if (algorithm === "rr") {
          executionTime = Math.min(timeQuantum, process.remainingTime);
        } else if (isPreemptive) {
          executionTime = 1;
        } else {
          executionTime = process.remainingTime;
        }

        // Add to CPU timeline
        cpu.timeline.push({
          processId: process.id,
          processType: process.type,
          startTime: currentTime,
          endTime: currentTime + executionTime,
          burstTime: executionTime
        });

        process.remainingTime -= executionTime;

        if (process.remainingTime === 0) {
          process.completionTime = currentTime + executionTime;
          process.turnaroundTime = process.completionTime - process.arrivalTime;
          process.waitingTime = process.turnaroundTime - process.burstTime;
          completedProcesses.push(process);
        }
      }

      currentTime++;
    }

    // Calculate metrics
    const avgWaitingTime = completedProcesses.reduce((sum, p) => sum + p.waitingTime, 0) / completedProcesses.length;
    const avgTurnaroundTime = completedProcesses.reduce((sum, p) => sum + p.turnaroundTime, 0) / completedProcesses.length;
    
    const totalTime = Math.max(...cpus.map(cpu => 
      cpu.timeline.length > 0 ? cpu.timeline[cpu.timeline.length - 1].endTime : 0
    ));
    
    const totalBusyTime = cpus.reduce((sum, cpu) => 
      sum + cpu.timeline.reduce((cpuSum, task) => cpuSum + task.burstTime, 0), 0
    );
    
    const cpuUtilization = (totalBusyTime / (totalTime * cpuCount)) * 100;

    return {
      cpus,
      processes: completedProcesses,
      metrics: {
        avgWaitingTime: avgWaitingTime.toFixed(2),
        avgTurnaroundTime: avgTurnaroundTime.toFixed(2),
        cpuUtilization: cpuUtilization.toFixed(2)
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CPU Scheduler Simulator</h1>
                <p className="text-sm text-slate-500 mt-0.5">Multi-processor scheduling with foreground & background processes</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={resetSimulation}
                variant="outline"
                className="gap-2 hover:bg-slate-50 border-slate-200"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                onClick={runSimulation}
                disabled={processes.length === 0}
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
              >
                <Play className="w-4 h-4" />
                Run Simulation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-[450px_1fr] gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <SchedulerControls
              cpuCount={cpuCount}
              setCpuCount={setCpuCount}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              isPreemptive={isPreemptive}
              setIsPreemptive={setIsPreemptive}
              timeQuantum={timeQuantum}
              setTimeQuantum={setTimeQuantum}
            />
            
            <ProcessInputForm
              onAddProcess={handleAddProcess}
              processes={processes}
              onRemoveProcess={handleRemoveProcess}
            />
          </div>

          {/* Right Panel - Visualization */}
          <div className="space-y-6">
            <GanttVisualization
              results={schedulingResults}
              isSimulating={isSimulating}
              cpuCount={cpuCount}
            />
            
            {schedulingResults && (
              <MetricsPanel
                metrics={schedulingResults.metrics}
                processes={schedulingResults.processes}
              />
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12">
          <EducationalInfo />
        </div>
      </div>
    </div>
  );
}