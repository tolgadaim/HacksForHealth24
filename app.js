const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { spawn } = require('child_process');


const { GoogleGenerativeAI } = require("@google/generative-ai");
const Your_API_Key = "AIzaSyC6pDhC9uWmaR66-88s5u0j-fn1f7HA3Tg"
const genAI = new GoogleGenerativeAI(Your_API_Key);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.post('/runGemini', (req, res) => {
    const prompt = req.body.prompt; // Assuming you're using body-parser middleware for parsing request bodies
    // Execute the desired functionality here based on the prompt
    runGemini(prompt)
        .then(text => {
            const responseText = text;
            res.send(responseText);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error processing request');
        });
});

function runGemini(prompt) {
    return new Promise((resolve, reject) => {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
        model.generateContent(prompt)
            .then(result => result.response.text())
            .then(text => {
                console.log(text);
                resolve(text);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

app.post('/runPythonScript', (req, res) => {
    const imageUrl = req.body; // Assuming you're using body-parser middleware for parsing request bodies
    // Execute the desired functionality here based on the prompt
    runPythonScript(imageUrl)
        .then(text => {
            const responseText = text;
            res.send(responseText);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error processing request');
        });
});

function runPythonScript(imageUrl) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['vision/text_detection.py', 'vision/google_vision_ai.py', 'vision/detect_medicine.py']);

        pythonProcess.stdout.on('data', (data) => {
            // Append the output received from the Python script to the 'output' variable
            output += data.toString();
        });

        pythonProcess.on('close', (code) => {
            console.log(output);
            resolve(output); // Resolve with the output from the Python script
        });

        pythonProcess.on('error', (error) => {
            console.error('Error executing Python script:', error);
            reject(error); // Reject the promise if an error occurs
        });
    });
}