// Generate input fields based on number of processes
function generateProcessInputsSJF() {
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

// Calculate SJF scheduling
function calculateSJF() {
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

            if (isNaN(burstTime) || burstTime <= 0) {
                showError(`Please enter a valid burst time for Process ${i + 1}`);
                return;
            }

            processes.push({
                name: `P${i + 1}`,
                arrivalTime: arrivalTime,
                burstTime: burstTime,
                index: i
            });
        }

        // Sort by arrival time first
        let sortedByArrival = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

        let currentTime = 0;
        let completed = new Array(processes.length).fill(false);
        let waitingTimes = new Array(processes.length).fill(0);
        let turnaroundTimes = new Array(processes.length).fill(0);
        const ganttSequence = [];
        const executionOrder = [];

        // Execute processes in SJF order
        for (let i = 0; i < processes.length; i++) {
            // Find the shortest job that has arrived
            let shortest = -1;
            let minBurst = Infinity;

            for (let j = 0; j < processes.length; j++) {
                if (!completed[j] && processes[j].arrivalTime <= currentTime && processes[j].burstTime < minBurst) {
                    shortest = j;
                    minBurst = processes[j].burstTime;
                }
            }

            // If no process has arrived yet, find the earliest arriving process
            if (shortest === -1) {
                for (let j = 0; j < processes.length; j++) {
                    if (!completed[j] && processes[j].arrivalTime < Infinity) {
                        if (shortest === -1 || processes[j].arrivalTime < processes[shortest].arrivalTime) {
                            shortest = j;
                        }
                    }
                }
                if (processes[shortest].arrivalTime > currentTime) {
                    currentTime = processes[shortest].arrivalTime;
                }
            }

            if (shortest !== -1) {
                const process = processes[shortest];
                const waitingTime = currentTime - process.arrivalTime;
                const completionTime = currentTime + process.burstTime;
                const turnaroundTime = completionTime - process.arrivalTime;

                waitingTimes[shortest] = waitingTime;
                turnaroundTimes[shortest] = turnaroundTime;
                completed[shortest] = true;

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
                    burstTime: process.burstTime
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
function resetSJF() {
    document.getElementById('sjfForm').reset();
    document.getElementById('processInputs').innerHTML = '';
    document.getElementById('resultsContainer').classList.remove('show');
    clearError();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sjfForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateSJF();
    });
});
        resultHtml += `<tr><td>Process ${i + 1}</td><td>${results.waitingTime[i]}</td><td>${results.turnaroundTime[i]}</td></tr>`;
    }
    resultHtml += '</table>';

    document.getElementById('resultContainer').innerHTML = resultHtml;
}

document.getElementById('calculateSJF').addEventListener('click', displaySJFResults);