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
        

        // For now, just displaying a placeholder result
        document.getElementById('result').innerHTML = 'Medicine detected: Aspirin';
    });
}