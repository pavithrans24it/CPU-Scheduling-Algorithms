# CPU Scheduling Algorithms Website

An interactive educational website demonstrating various CPU scheduling algorithms used in operating systems. This platform allows users to input process details and visualize how different scheduling strategies allocate CPU time using Gantt charts.

## Features

- **Interactive Algorithm Demonstrations**: Four major CPU scheduling algorithms
- **Real-time Calculations**: Instant computation of scheduling metrics
- **Gantt Chart Visualization**: Visual representation of process execution timelines
- **Detailed Statistics**: Average waiting time and turnaround time analysis
- **Responsive Design**: Works on desktop and mobile devices
- **Educational Explanations**: Comprehensive algorithm descriptions and comparisons

## Algorithms Included

### 1. First Come First Serve (FCFS)
- **Type**: Non-preemptive
- **Strategy**: Processes execute in arrival order
- **Best For**: Batch processing systems
- **Pros**: Simple, easy to implement
- **Cons**: Long average waiting time, convoy effect

### 2. Shortest Job First (SJF)
- **Type**: Non-preemptive
- **Strategy**: Execute process with smallest burst time
- **Best For**: Batch systems with known burst times
- **Pros**: Minimizes average waiting time (optimal)
- **Cons**: Requires knowing burst times, may starve long jobs

### 3. Priority Scheduling
- **Type**: Non-preemptive
- **Strategy**: Execute based on priority values (lower = higher priority)
- **Best For**: Real-time systems, mixed workloads
- **Pros**: Flexible, supports different process priorities
- **Cons**: Starvation of low-priority processes

### 4. Round Robin (RR)
- **Type**: Preemptive
- **Strategy**: Each process gets a time quantum
- **Best For**: Time-sharing systems, interactive applications
- **Pros**: Fair CPU allocation, low response time
- **Cons**: Context switching overhead, higher turnaround time

## Project Structure

```
cpu-scheduling-website/
├── index.html                 # Home page
├── package.json              # Project metadata
├── README.md                 # This file
├── css/
│   ├── styles.css           # Main styling
│   └── algorithm.css        # Algorithm-specific styling
├── js/
│   ├── fcfs.js             # FCFS algorithm implementation
│   ├── sjf.js              # SJF algorithm implementation
│   ├── priority.js         # Priority scheduling implementation
│   ├── roundrobin.js       # Round Robin implementation
│   └── utils.js            # Utility functions and Gantt chart
└── pages/
    ├── fcfs.html           # FCFS algorithm page
    ├── sjf.html            # SJF algorithm page
    ├── priority.html       # Priority scheduling page
    └── roundrobin.html     # Round Robin page
```

## Key Terms

- **Arrival Time**: When a process enters the ready queue
- **Burst Time**: How long the process needs the CPU
- **Completion Time**: When the process finishes execution
- **Waiting Time**: Time spent waiting in the ready queue
- **Turnaround Time**: Total time from arrival to completion (= Burst Time + Waiting Time)
- **Priority**: Relative importance of a process (lower number = higher priority)
- **Time Quantum**: Fixed time slice for each process in Round Robin scheduling

## Formulas

### Waiting Time
- **First Job**: Waiting Time = 0
- **Subsequent Jobs**: Waiting Time = Previous Waiting Time + Previous Burst Time

### Turnaround Time
- **Formula**: Turnaround Time = Burst Time + Waiting Time
- **Alternative**: Turnaround Time = Completion Time - Arrival Time

### Averages
- **Average Waiting Time**: Sum of all waiting times / Number of processes
- **Average Turnaround Time**: Sum of all turnaround times / Number of processes

## How to Use

1. **Open the Website**
   - Open `index.html` in a modern web browser
   - Or use a local server: `npm install && npm start` (requires live-server)

2. **Select an Algorithm**
   - Click on an algorithm card on the home page
   - Or use the navigation menu

3. **Enter Process Details**
   - Specify the number of processes
   - Click "Generate Input Fields"
   - Fill in arrival times and burst times
   - For Priority Scheduling, also enter priorities (lower = higher)
   - For Round Robin, enter the time quantum

4. **Calculate Results**
   - Click "Calculate [Algorithm Name]"
   - View the results table with waiting times and turnaround times

5. **Analyze the Gantt Chart**
   - See visual representation of process execution
   - Understand the execution order
   - Compare with other algorithms

6. **Reset and Try Again**
   - Click "Reset" to clear all inputs
   - Try different process combinations

## Input Constraints

- **Number of Processes**: 1-10
- **Arrival Time**: 0 or greater
- **Burst Time**: Must be greater than 0
- **Priority**: Any positive integer (lower = higher priority)
- **Time Quantum**: Must be greater than 0

## Features

### Algorithm Explanations
Each page includes:
- Detailed algorithm description
- Key characteristics and properties
- Advantages and disadvantages
- Use cases and best practices

### Interactive Input
- Dynamic input field generation
- Real-time validation
- Clear error messages

### Visual Results
- Results table with metrics
- Color-coded Gantt charts
- Statistical summary

### Performance Metrics
- Average Waiting Time
- Average Turnaround Time
- Individual process metrics

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Responsive design with flexbox and grid
- **Vanilla JavaScript**: No frameworks or dependencies
- **Canvas API**: Gantt chart visualization

## Installation & Running

### Option 1: Direct
Simply open `index.html` in a web browser.

### Option 2: With Live Server
```bash
npm install
npm start
```

This requires Node.js and live-server to be installed.

## Code Quality

- No external dependencies
- Pure JavaScript implementation
- Responsive CSS design
- Accessible HTML structure
- Modular code organization

## Educational Value

This website is designed for:
- **Students**: Learning CPU scheduling concepts
- **Educators**: Classroom demonstrations
- **Professionals**: Quick reference and comparison
- **Interviews**: Understanding scheduling algorithms

## Comparison Table

| Algorithm | Type | Best Case (Avg Wait) | Worst Case | Preemptive | Starvation |
|-----------|------|-------------------|-----------|-----------|-----------|
| FCFS | Non-preemptive | 1 | n² | No | No |
| SJF | Non-preemptive | Best | Worst | No | Yes |
| Priority | Non-preemptive | Good | Poor | No | Yes |
| Round Robin | Preemptive | Average | Poor | Yes | No |

## Tips for Better Understanding

1. **Start with FCFS**: Simplest algorithm to understand
2. **Compare SJF with FCFS**: See how burst time affects scheduling
3. **Experiment with Priorities**: Understand importance-based scheduling
4. **Try Different Quantums in RR**: See how quantum size affects results
5. **Analyze Gantt Charts**: Understand execution flow visually

## Common Questions

**Q: What's the optimal time quantum for Round Robin?**
A: It depends on context switching overhead and system characteristics. Typically 10-100ms for modern systems.

**Q: Why does SJF minimize average waiting time?**
A: Because long jobs can't delay short jobs. Short jobs get scheduled early, reducing waiting time.

**Q: What's starvation?**
A: A process never gets CPU time (e.g., low-priority processes in Priority scheduling).

**Q: When should I use each algorithm?**
A: See the "Best For" descriptions in the Algorithms Included section.

## Troubleshooting

**Canvas not rendering**: Ensure JavaScript is enabled
**Styling issues**: Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
**Input not working**: Check browser console for errors

## Future Enhancements

- Multi-level queue scheduling
- Preemptive SJF
- Multi-CPU scheduling
- Process state visualization
- Export results to CSV

## Learning Resources

- Operating Systems Concepts by Silberschatz, Galvin, Gagne
- CPU Scheduling algorithms documentation
- Interactive scheduling visualizers

## License

MIT License - Feel free to use, modify, and distribute for educational purposes.

## Contributing

Suggestions and improvements are welcome! This is an educational project designed to help students understand CPU scheduling.

---

**Note**: This website is designed for educational purposes to help understand CPU scheduling concepts. Real-world OS scheduling is much more complex and involves many additional factors.
- Processes are executed in the order they arrive in the ready queue.

### Shortest Job First (SJF)
- Processes with the smallest burst time are executed first.
- Can be preemptive or non-preemptive.

### Priority Scheduling
- Each process is assigned a priority.
- The process with the highest priority is executed first.

### Round Robin (RR)
- Each process is assigned a fixed time slice (quantum).
- Processes are executed in a cyclic order.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.