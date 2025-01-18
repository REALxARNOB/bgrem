const apiKey = '4arxY8wN8YWV4Pvj3rBxhFBB'; // Replace with your actual API key

    export async function removeBackgroundFromImage(file) {
      if (!file) {
        console.error("No file provided to removeBackgroundFromImage");
        throw new Error("No file provided");
      }

      const formData = new FormData();
      formData.append('image_file', file);

      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error from remove.bg API:", errorText);
          throw new Error(`Failed to remove background: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error in removeBackgroundFromImage:", error);
        throw new Error("Failed to remove background");
      }
    }
