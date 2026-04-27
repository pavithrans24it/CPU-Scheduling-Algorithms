// Generate input fields based on number of processes
function generateProcessInputsRR() {
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
        `;
        container.appendChild(processDiv);
    }
}

// Calculate Round Robin scheduling
function calculateRoundRobin() {
    clearError();
    const processCount = parseInt(document.getElementById('processCount').value);
    const quantum = parseInt(document.getElementById('quantum').value);
    
    if (isNaN(processCount) || processCount <= 0) {
        showError('Please enter a valid number of processes');
        return;
    }

    if (isNaN(quantum) || quantum <= 0) {
        showError('Please enter a valid time quantum');
        return;
    }

    const processes = [];
    
    try {
        for (let i = 0; i < processCount; i++) {
            const arrivalTime = parseInt(document.getElementById(`arrival${i}`).value) || 0;
            const burstTime = parseInt(document.getElementById(`burst${i}`).value);

            if (isNaN(burstTime) || burstTime <= 0) {
                showError(`Please enter a valid burst time for Process ${i + 1}`);
                return;
            }

            processes.push({
                name: `P${i + 1}`,
                arrivalTime: arrivalTime,
                burstTime: burstTime,
                originalBurst: burstTime,
                index: i
            });
        }

        // Sort by arrival time
        const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

        let currentTime = 0;
        let queue = [];
        let waitingTimes = new Array(processes.length).fill(0);
        let turnaroundTimes = new Array(processes.length).fill(0);
        let completionTimes = new Array(processes.length).fill(0);
        const ganttSequence = [];
        const executionOrder = [...processes];

        // Initialize with first process
        let arrivalIndex = 0;
        
        while (arrivalIndex < sorted.length || queue.length > 0) {
            // Add all processes that have arrived
            while (arrivalIndex < sorted.length && sorted[arrivalIndex].arrivalTime <= currentTime) {
                queue.push({...sorted[arrivalIndex]});
                arrivalIndex++;
            }

            // If no process in queue, skip time to next arrival
            if (queue.length === 0 && arrivalIndex < sorted.length) {
                currentTime = sorted[arrivalIndex].arrivalTime;
                continue;
            }

            // Execute process for one time quantum
            if (queue.length > 0) {
                const process = queue.shift();
                const executeTime = Math.min(quantum, process.burstTime);
                const startTime = currentTime;
                
                ganttSequence.push({
                    process: process.name,
                    startTime: startTime,
                    endTime: currentTime + executeTime,
                    duration: executeTime
                });

                currentTime += executeTime;
                process.burstTime -= executeTime;

                // If process not complete, add back to queue
                if (process.burstTime > 0) {
                    queue.push(process);
                } else {
                    // Process completed
                    const originalIndex = processes.findIndex(p => p.name === process.name && p.arrivalTime === process.arrivalTime);
                    if (originalIndex !== -1) {
                        completionTimes[originalIndex] = currentTime;
                        turnaroundTimes[originalIndex] = currentTime - process.arrivalTime;
                        waitingTimes[originalIndex] = turnaroundTimes[originalIndex] - process.originalBurst;
                    }
                }

                // Add newly arrived processes
                while (arrivalIndex < sorted.length && sorted[arrivalIndex].arrivalTime <= currentTime) {
                    const newProcess = {...sorted[arrivalIndex]};
                    newProcess.burstTime = newProcess.originalBurst;
                    queue.push(newProcess);
                    arrivalIndex++;
                }
            }
        }

        // Display results
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.add('show');

        displayResults(processes, waitingTimes, turnaroundTimes, 'results');
        drawGanttChart(processes, ganttSequence, 'ganttChart');

    } catch (error) {
        showError('An error occurred: ' + error.message);
    }
}

// Reset form
function resetRR() {
    document.getElementById('roundRobinForm').reset();
    document.getElementById('processInputs').innerHTML = '';
    document.getElementById('resultsContainer').classList.remove('show');
    clearError();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('roundRobinForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateRoundRobin();
    });
});
        arrivalTime[i] = parseInt(document.getElementById(`arrivalTime${i}`).value);
    }

    const { waitingTime, turnaroundTime } = calculateRoundRobin(processes, burstTime, arrivalTime, quantum);
    displayResults(waitingTime, turnaroundTime);
});