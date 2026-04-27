// Validation function
function validateInput(arrivalTime, burstTime, priority = null) {
    if (isNaN(arrivalTime) || isNaN(burstTime)) {
        return false;
    }
    if (priority !== null && isNaN(priority)) {
        return false;
    }
    return true;
}

// Calculate average wait time
function calculateAverageWaitTime(waitTimes) {
    const totalWaitTime = waitTimes.reduce((acc, time) => acc + time, 0);
    return totalWaitTime / waitTimes.length;
}

// Calculate average turnaround time
function calculateAverageTurnaroundTime(turnaroundTimes) {
    const totalTurnaroundTime = turnaroundTimes.reduce((acc, time) => acc + time, 0);
    return totalTurnaroundTime / turnaroundTimes.length;
}

// Display results in a table format
function displayResults(processes, waitTimes, turnaroundTimes, containerId = "results") {
    const resultContainer = document.getElementById(containerId);
    if (!resultContainer) return;

    let html = '<table class="results-table"><thead><tr>';
    html += '<th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Completion Time</th><th>Wait Time</th><th>Turnaround Time</th></tr></thead><tbody>';

    for (let i = 0; i < processes.length; i++) {
        const completionTime = (i === 0 ? 0 : processes[i - 1].completionTime || 0) + turnaroundTimes[i];
        html += `<tr>
            <td>${processes[i].name}</td>
            <td>${processes[i].arrivalTime || 0}</td>
            <td>${processes[i].burstTime}</td>
            <td>${completionTime}</td>
            <td>${waitTimes[i]}</td>
            <td>${turnaroundTimes[i]}</td>
        </tr>`;
    }

    html += '</tbody></table>';

    const avgWaitTime = calculateAverageWaitTime(waitTimes);
    const avgTurnaroundTime = calculateAverageTurnaroundTime(turnaroundTimes);
    
    html += `<div class="statistics">
        <h4>Algorithm Statistics</h4>
        <div class="statistics-grid">
            <div class="stat-item">
                <div class="stat-label">Average Wait Time</div>
                <div class="stat-value">${avgWaitTime.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Average Turnaround Time</div>
                <div class="stat-value">${avgTurnaroundTime.toFixed(2)}</div>
            </div>
        </div>
    </div>`;

    resultContainer.innerHTML = html;
}

// Draw Gantt Chart
function drawGanttChart(processes, sequence, canvasId = "ganttChart") {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.offsetWidth || 800;
    const canvasHeight = canvas.offsetHeight || 200;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const barHeight = 40;
    const topMargin = 50;
    const leftMargin = 60;
    const timelineMargin = 30;
    const colors = ['#667eea', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

    let currentX = leftMargin;
    let maxTime = 0;

    // Calculate total time
    sequence.forEach(item => {
        maxTime += item.duration;
    });

    const pixelPerUnit = (canvasWidth - leftMargin - 20) / maxTime;

    // Draw title
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Gantt Chart', 10, 30);

    // Draw timeline
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftMargin, topMargin);
    ctx.lineTo(canvasWidth - 10, topMargin);
    ctx.stroke();

    // Draw time markers
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    for (let i = 0; i <= maxTime; i += Math.max(1, Math.floor(maxTime / 10))) {
        const x = leftMargin + i * pixelPerUnit;
        ctx.beginPath();
        ctx.moveTo(x, topMargin);
        ctx.lineTo(x, topMargin + 5);
        ctx.stroke();
        ctx.fillText(i, x - 10, topMargin + 20);
    }

    // Draw process bars
    currentX = leftMargin;
    sequence.forEach((item, index) => {
        const width = item.duration * pixelPerUnit;
        const colorIndex = processes.findIndex(p => p.name === item.process) % colors.length;
        
        // Draw rectangle
        ctx.fillStyle = colors[colorIndex];
        ctx.fillRect(currentX, topMargin + 30, width, barHeight);

        // Draw border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(currentX, topMargin + 30, width, barHeight);

        // Draw process name
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.process, currentX + width / 2, topMargin + 55);

        // Draw time at bottom
        ctx.fillStyle = '#333';
        ctx.font = '11px Arial';
        ctx.fillText(item.startTime, currentX, topMargin + 85);
        ctx.fillText(item.endTime, currentX + width, topMargin + 85);

        currentX += width;
    });

    // Draw legend
    ctx.font = '12px Arial';
    let legendY = topMargin + 120;
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('Legend:', 10, legendY);
    
    processes.forEach((process, index) => {
        const colorIndex = index % colors.length;
        ctx.fillStyle = colors[colorIndex];
        ctx.fillRect(10, legendY + 15 + (index * 20), 15, 15);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(10, legendY + 15 + (index * 20), 15, 15);
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(process.name, 35, legendY + 27 + (index * 20));
    });
}

// Show error message
function showError(message, containerId = "error-message") {
    const errorContainer = document.getElementById(containerId);
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.add('show');
    } else {
        alert(message);
    }
}

// Clear error message
function clearError(containerId = "error-message") {
    const errorContainer = document.getElementById(containerId);
    if (errorContainer) {
        errorContainer.classList.remove('show');
        errorContainer.textContent = '';
    }
}

// Reset form
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}