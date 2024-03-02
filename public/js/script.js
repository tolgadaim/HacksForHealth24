window.addEventListener('load', function () {
    runGemini("Tell me a joke");

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

async function detectMedicine() {
    document.getElementById('upload-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        // If image is empty, return
        if (document.getElementById('selectedImage').getAttribute('src') == '') {
            document.getElementById('result').innerHTML = 'No image selected';
            return;
        }

        // Perform image detection or processing here
        // You can use JavaScript, a server-side language, or an API for this purpose

        // Ask gemini the text:
        try {
            const result = await runGemini("What is the general information of aspirin?");
            if (result != null) {
                var resultContainer = document.getElementById('result');
                var paragraph = resultContainer.querySelector('p');
                
                var resultWithBreaks = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
                resultWithBreaks = resultWithBreaks.replace(/\*\s/g, '&#8226; ');
                resultContainer.style.display = 'flex';
                paragraph.innerHTML = resultWithBreaks;
            }
        } catch (error) {
            console.error(error);
            // Handle errors here
        }
    });
}