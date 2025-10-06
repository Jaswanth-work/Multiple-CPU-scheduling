# Multiple-CPU-scheduling
A browser-based CPU scheduling simulator that demonstrates how different scheduling algorithms work across multiple CPUs. This app allows you to input processes, choose scheduling algorithms, run simulations, and visualize the results with a Gantt chart and performance metrics.

Features

Multiple CPUs: Simulate scheduling on more than one CPU.

Scheduling Algorithms: Supports FCFS, SJF, Priority, and Round Robin.

Preemptive and Non-Preemptive: Toggle preemption for applicable algorithms.

Round Robin Time Quantum: Set custom time quantum for RR scheduling.

Process Input: Add processes with arrival time, burst time, type (foreground/background), and priority.

Gantt Chart: Visual representation of process execution across CPUs.

Metrics Panel: View average waiting time, turnaround time, and CPU utilization.

Standalone HTML: Runs entirely in a browser; no build tools or servers required.

How to Use

Add Processes:

Enter process name, arrival time, burst time, type, and priority.

Click Add Process.

Configure Scheduler:

Select the number of CPUs.

Choose the scheduling algorithm.

Toggle Preemptive if applicable.

For Round Robin, set the Time Quantum.

Run Simulation: Click Run to execute the scheduling simulation.

Reset Simulation: Click Reset to clear all processes and results.

View Results:

Gantt Chart: Displays execution timeline for each CPU.

Metrics Panel: Shows average waiting time, turnaround time, and CPU utilization.

Process Table: Detailed info about start/completion/waiting/turnaround times.

Supported Scheduling Algorithms

FCFS (First Come First Serve)

SJF (Shortest Job First) – Non-preemptive or preemptive depending on settings.

Priority Scheduling – Lower numeric priority value indicates higher priority.

Round Robin (RR) – Time-sliced scheduling with configurable quantum.

Technical Details

Built using React and ReactDOM via CDN.

No external dependencies or build tools required.

Fully functional as a single HTML file (index.html).

Inline CSS for styling, responsive layout, and visual clarity.

Customization

Modify colors, fonts, and layout directly in the <style> block.

Adjust the Gantt chart scaling by changing the width multiplier for .gantt-bar.

Extend functionality to include more metrics or scheduling algorithms.

License

This project is open-source and free to use for educational purposes.

Screenshots

(Optional: include screenshots of the app running, showing Gantt chart and metrics.)
