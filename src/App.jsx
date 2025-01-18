import React, { useState } from 'react';
    import { removeBackgroundFromImage } from './utils';

    function App() {
      const [originalImage, setOriginalImage] = useState(null);
      const [processedImage, setProcessedImage] = useState(null);
      const [imageFile, setImageFile] = useState(null);
      const [loading, setLoading] = useState(false);

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setOriginalImage(URL.createObjectURL(file));
        setImageFile(file);
        setProcessedImage(null);
      };

      const handleProcessImage = async () => {
        if (!imageFile) return;
        setLoading(true);
        try {
          const processed = await removeBackgroundFromImage(imageFile);
          setProcessedImage(processed);
        } catch (error) {
          console.error("Error processing image:", error);
          alert("Failed to process image. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      const handleDownload = () => {
        if (!processedImage) return;

        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'processed-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <div className="app-container">
          <h1>Background Remover</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-button">
            Upload Image
          </label>
          <div className="image-container">
            {originalImage && <img src={originalImage} alt="Original" />}
            {processedImage && <img src={processedImage} alt="Processed" />}
          </div>
          {originalImage && !processedImage && (
            <>
              <button className="process-button" onClick={handleProcessImage} disabled={loading}>
                Remove Background
              </button>
              {loading && <p className="loading-text">Processing...</p>}
            </>
          )}
          {processedImage && (
            <button className="download-button" onClick={handleDownload}>
              Download Image
            </button>
          )}
        </div>
      );
    }

    export default App;
