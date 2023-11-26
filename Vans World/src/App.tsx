import React, { useRef } from 'react';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure the video is playing
    if (video.paused || video.ended) {
      return;
    }

    // Draw the current frame of the video onto the canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL representing the image
      const photoDataUrl = canvas.toDataURL('image/png');
    
      // You can now use the photoDataUrl as needed (e.g., send it to a server, display it, etc.)
      console.log('Photo taken:', photoDataUrl);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={{ maxWidth: '100%' }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraComponent;
