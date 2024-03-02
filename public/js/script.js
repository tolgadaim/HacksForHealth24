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

function detectMedicine() {
    document.getElementById('upload-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // If image is empty, return
        if (document.getElementById('selectedImage').getAttribute('src') == '') {
            document.getElementById('result').innerHTML = 'No image selected';
            return;
        }

        // Perform image detection or processing here
        // You can use JavaScript, a server-side language, or an API for this purpose
        

        // Ask gemini the text:
        result = runGemini("What is the general information of aspirin?");

        // For now, just displaying a placeholder result
        document.getElementById('result').innerHTML = 'Medicine detected: Aspirin';
    });
}

function runGemini(prompt) {
    // Send an AJAX request to the server to execute the runGemini function
    $.ajax({
        url: '/runGemini',
        method: 'POST',
        contentType: 'application/json', // Set content type to JSON
        data: JSON.stringify({ prompt: prompt }), // Convert data to JSON format
        success: function (response) {
            console.log(response); // Handle the response from the server
            return response;
        },
        error: function (xhr, status, error) {
            console.error(error); // Handle any errors
        }
    });
}