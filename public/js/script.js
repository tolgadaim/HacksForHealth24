window.addEventListener('load', function () {
    document.getElementById('image-upload').addEventListener('change', function(event) {
        var selectedFile = event.target.files[0];
        var imageContainer = document.getElementById('imageContainer');
        var selectedImage = document.getElementById('selectedImage');
        var imageText = document.getElementById('imageText');
      
        // Check if a file is selected
        if (selectedFile) {
          var reader = new FileReader();
      
          reader.onload = function(event) {
            selectedImage.src = event.target.result;
            imageContainer.style.display = 'flex';
          };
      
          reader.readAsDataURL(selectedFile);
          imageText.innerText = 'Uploaded Image:';
        } else {
          // If no file is selected, reset image and hide container
          selectedImage.src = '';
          imageContainer.style.display = 'none';
          imageText.innerText = '';
        }
      });
});

function returnToPage() {
    var resultContainer = document.getElementById('result');
    resultContainer.style.display = 'none';
}

async function runGemini(prompt) {
    try {
        const response = await $.ajax({
            url: '/runGemini',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ prompt: prompt })
        });
        console.log(response); // Handle the response from the server
        return response;
    } catch (error) {
        console.error(error); // Handle any errors
        throw error; // Rethrow the error for the caller to handle
    }
}

async function runPythonScript(imageUrl) {
    console.log(imageUrl);
    try {
        const response = await $.ajax({
            url: '/runPythonScript',
            method: 'POST',
            body: imageUrl
        });
        console.log(response); // Handle the response from the server
        return response;
    } catch (error) {
        console.error(error); // Handle any errors
        throw error; // Rethrow the error for the caller to handle
    }
}

async function detectMedicine() {
    document.getElementById('upload-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        var imageSource = document.getElementById('selectedImage').getAttribute('src');

        // If image is empty, return
        if (imageSource == '') {
            // document.getElementById('result').innerHTML = 'No image selected';
            return;
        }
        
        // Run loading screen
        var loadingScreen = document.getElementById('loading');
        loadingScreen.style.display = 'flex';
        
        var drugName = "";
        // Perform image detection or processing here
        // You can use JavaScript, a server-side language, or an API for this purpose
        try {
            drugName = await runPythonScript(imageSource);
        } catch (error) {
            console.error(error);
            loadingScreen.style.display = 'none';
            // Handle errors here
            return;
        }

        if (drugName == "") {
            loadingScreen.style.display = 'none';
            return;
        }

        var promptText = "What is the general information of " + drugName;

        // Ask gemini the text:
        try {
            const result = await runGemini(promptText);
            loadingScreen.style.display = 'none';
            if (result != null) {
                var resultContainer = document.getElementById('result');
                var paragraph = resultContainer.querySelector('p');
                
                var resultWithBreaks = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
                resultWithBreaks = resultWithBreaks.replace(/\*\s/g, '&#8226; ');
                paragraph.innerHTML = resultWithBreaks;
                resultContainer.style.display = 'flex';
            }
        } catch (error) {
            console.error(error);
            loadingScreen.style.display = 'none';
            // Handle errors here
        }
    });
}