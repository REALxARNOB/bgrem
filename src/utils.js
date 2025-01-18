import { removeBackground } from '@imgly/background-removal';

    async function loadImageBitmap(file) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          createImageBitmap(canvas)
            .then(resolve)
            .catch(reject);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    }

    export async function removeBackgroundFromImage(file) {
      if (!file) {
        console.error("No file provided to removeBackgroundFromImage");
        throw new Error("No file provided");
      }
      try {
        const imageBitmap = await loadImageBitmap(file);
        const canvas = await removeBackground(imageBitmap);
        return canvas.toDataURL('image/png');
      } catch (error) {
        console.error("Error in removeBackgroundFromImage:", error);
        throw new Error("Failed to remove background");
      }
    }
