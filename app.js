const express = require('express');
const path = require('path');
const { spawn } = require('child_process');


const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


function runPythonScript() {
    const pythonProcess = spawn('python', ['vision/text_detection.py', 'vision/google_vision_ai.py', 'vision/detect_medicine.py']);
    let output = '';


    pythonProcess.stdout.on('data', (data) => {
        // Append the output received from the Python script to the 'output' variable
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script child process exited with code ${code}`);
        // Log or process the accumulated output here
        console.log('Output:', output);
    });
}

runPythonScript();
