import { useState, useRef, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import { CameraAlt, FlipCameraAndroid } from "@mui/icons-material";

export default function PhotoCaptureModal({ open, onClose, onCapture }) {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [open, isFrontCamera]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      setCapturedImage(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const constraints = {
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setCameraError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/jpeg"));
    }
  };

  const retakePhoto = () => setCapturedImage(null);

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Take a Photo</DialogTitle>
      <DialogContent className="flex flex-col items-center">
        {cameraError ? (
          <div className="text-center text-red-500">{cameraError}</div>
        ) : (
          <div className="relative w-full aspect-[4/3] bg-gray-900 rounded-md overflow-hidden">
            {!capturedImage ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </DialogContent>
      <DialogActions className="flex justify-between px-4 pb-4">
        {!capturedImage ? (
          <>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <div className="flex items-center gap-2">
              <IconButton onClick={() => setIsFrontCamera(!isFrontCamera)}>
                <FlipCameraAndroid />
              </IconButton>
              <Button
  variant="contained"
  onClick={takePhoto}
  startIcon={<CameraAlt />}
  sx={{
    fontSize: {
      xs: '0.75rem', // Small text on small screens
      sm: '0.875rem', // Normal text from sm and up
    },
    padding: {
      xs: '6px 12px',
      sm: '8px 16px',
    },
  }}
>
  Take Photo
</Button>
            </div>
          </>
        ) : (
          <>
            <Button variant="outlined" onClick={retakePhoto}>Retake</Button>
            <Button variant="contained" onClick={confirmPhoto}>Use Photo</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
