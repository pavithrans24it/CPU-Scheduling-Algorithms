// Generate input fields based on number of processes
function generateProcessInputs() {
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

// Calculate FCFS scheduling
function calculateFCFS() {
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
                burstTime: burstTime
            });
        }

        // Sort by arrival time
        processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

        let currentTime = 0;
        const waitingTimes = [];
        const turnaroundTimes = [];
        const ganttSequence = [];

        // Calculate times
        for (let i = 0; i < processes.length; i++) {
            const process = processes[i];
            
            // If process arrives after current time, start at arrival time
            if (process.arrivalTime > currentTime) {
                currentTime = process.arrivalTime;
            }

            const waitingTime = currentTime - process.arrivalTime;
            const completionTime = currentTime + process.burstTime;
            const turnaroundTime = completionTime - process.arrivalTime;

            waitingTimes.push(waitingTime);
            turnaroundTimes.push(turnaroundTime);

            // Add to Gantt chart sequence
            ganttSequence.push({
                process: process.name,
                startTime: currentTime,
                endTime: completionTime,
                duration: process.burstTime
            });

            currentTime = completionTime;
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
function resetFCFS() {
    document.getElementById('fcfsForm').reset();
    document.getElementById('processInputs').innerHTML = '';
    document.getElementById('resultsContainer').classList.remove('show');
    clearError();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fcfsForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateFCFS();
    });
});