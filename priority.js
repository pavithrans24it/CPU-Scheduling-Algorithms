// Generate input fields based on number of processes
function generateProcessInputsPriority() {
    clearError();
    const processCount = parseInt(document.getElementById('processCount').value);
    
    if (isNaN(processCount) || processCount <= 0 || processCount > 10) {
        showError('Please enter a valid number of processes (1-10)');
        return;
    }

    const container = document.getElementById('processInputs');
    container.innerHTML = '';

    for (let i = 0; i < processCount; i++) {
        const processDiv = document.createElement('div');
        processDiv.className = 'process-input-item';
        processDiv.innerHTML = `
            <label>Process ${i + 1}</label>
            <input type="number" id="arrival${i}" placeholder="Arrival Time" min="0" value="0" required>
            <input type="number" id="burst${i}" placeholder="Burst Time" min="1" required>
            <input type="number" id="priority${i}" placeholder="Priority (lower is higher)" min="1" value="1" required>
        `;
        container.appendChild(processDiv);
    }
}

// Calculate Priority Scheduling
function calculatePriority() {
    clearError();
    const processCount = parseInt(document.getElementById('processCount').value);
    
    if (isNaN(processCount) || processCount <= 0) {
        showError('Please enter a valid number of processes');
        return;
    }

    const processes = [];
    
    try {
        for (let i = 0; i < processCount; i++) {
            const arrivalTime = parseInt(document.getElementById(`arrival${i}`).value) || 0;
            const burstTime = parseInt(document.getElementById(`burst${i}`).value);
            const priority = parseInt(document.getElementById(`priority${i}`).value);

            if (isNaN(burstTime) || burstTime <= 0) {
                showError(`Please enter a valid burst time for Process ${i + 1}`);
                return;
            }

            if (isNaN(priority)) {
                showError(`Please enter a valid priority for Process ${i + 1}`);
                return;
            }

            processes.push({
                name: `P${i + 1}`,
                arrivalTime: arrivalTime,
                burstTime: burstTime,
                priority: priority,
                index: i
            });
        }

        let currentTime = 0;
        let completed = new Array(processes.length).fill(false);
        let waitingTimes = new Array(processes.length).fill(0);
        let turnaroundTimes = new Array(processes.length).fill(0);
        const ganttSequence = [];
        const executionOrder = [];

        // Execute processes based on priority
        for (let i = 0; i < processes.length; i++) {
            // Find the highest priority process that has arrived
            let highest = -1;
            let highestPriority = Infinity;

            for (let j = 0; j < processes.length; j++) {
                if (!completed[j] && processes[j].arrivalTime <= currentTime && processes[j].priority < highestPriority) {
                    highest = j;
                    highestPriority = processes[j].priority;
                }
            }

            // If no process has arrived yet, find the earliest arriving process
            if (highest === -1) {
                for (let j = 0; j < processes.length; j++) {
                    if (!completed[j]) {
                        if (highest === -1 || processes[j].arrivalTime < processes[highest].arrivalTime) {
                            highest = j;
                        }
                    }
                }
                if (processes[highest].arrivalTime > currentTime) {
                    currentTime = processes[highest].arrivalTime;
                }
            }

            if (highest !== -1) {
                const process = processes[highest];
                const waitingTime = currentTime - process.arrivalTime;
                const completionTime = currentTime + process.burstTime;
                const turnaroundTime = completionTime - process.arrivalTime;

                waitingTimes[highest] = waitingTime;
                turnaroundTimes[highest] = turnaroundTime;
                completed[highest] = true;

                // Add to Gantt chart sequence
                ganttSequence.push({
                    process: process.name,
                    startTime: currentTime,
                    endTime: completionTime,
                    duration: process.burstTime
                });

                executionOrder.push({
                    name: process.name,
                    arrivalTime: process.arrivalTime,
                    burstTime: process.burstTime,
                    priority: process.priority
                });

                currentTime = completionTime;
            }
        }

        // Display results
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.add('show');

        displayResults(executionOrder, waitingTimes.slice(0, executionOrder.length), turnaroundTimes.slice(0, executionOrder.length), 'results');
        drawGanttChart(processes, ganttSequence, 'ganttChart');

    } catch (error) {
        showError('An error occurred: ' + error.message);
    }
}

// Reset form
function resetPriority() {
    document.getElementById('priorityForm').reset();
    document.getElementById('processInputs').innerHTML = '';
    document.getElementById('resultsContainer').classList.remove('show');
    clearError();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('priorityForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculatePriority();
    });
});
    }
}

document.getElementById("calculateButton").addEventListener("click", calculatePriorityScheduling);