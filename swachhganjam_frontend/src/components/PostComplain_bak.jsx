import React, { useState, useRef } from "react";
import { Paper, Typography, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Webcam from "react-webcam";
import LocalSeeIcon from '@mui/icons-material/LocalSee';

const PostComplaint = () => {
    const [formData, setFormData] = useState({
        complainCategory: "",
        citizenName: "",
        wardNumber: "",
        phoneNumber: "",
        area: "",
        dateTime: "",
        description: "",
    });

    const [photo, setPhoto] = useState(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const webcamRef = useRef(null);

    // Handle form field change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Capture Photo from Webcam
    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setPhoto(imageSrc);
            setShowWebcam(false); 
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (

            <form className="space-y-4">
                {/* Complaint Category */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                <label className="block text-gray-700">Complaint Category</label>
                    <Select
                        name="complainCategory"
                        value={formData.complainCategory}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Garbage Collection">Illegal Dumping of C & D waste</MenuItem>
                        <MenuItem value="Drainage Issue">Dead Animals</MenuItem>
                        <MenuItem value="Illegal Dumping">Practice of Manual Scavening</MenuItem>
                        <MenuItem value="Street Cleaning">Open Defecation</MenuItem>
                        <MenuItem value="Others">Urination in Public</MenuItem>
                    </Select>
                </FormControl>

                {/* Citizen Name */}
                <div>
                    <label className="block text-gray-700">Citizen Name:</label>
                    <input
                        type="text"
                        name="citizenName"
                        value={formData.citizenName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Ward Number */}
                <div>
                    <label className="block text-gray-700">Ward No.:</label>
                    <input
                        type="text"
                        name="wardNumber"
                        value={formData.wardNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-gray-700">Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Area */}
                <div>
                    <label className="block text-gray-700">Area:</label>
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Date & Time */}
                <div>
                    <label className="block text-gray-700">Date & Time:</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div>
                    {!photo && !showWebcam && (
                        <Button
                            variant="contained"
                            color="secondary"
                             className="gap-2"
                            onClick={() => setShowWebcam(true)}
                            sx={{ mt: 2, bgcolor: "#f9f9f9", color:"#000" }}
                        >
                            <LocalSeeIcon className="h-4 w-4" />
                            
                            Capture Photo
                        </Button>
                    )}

                    {/* Webcam Component */}
                    {showWebcam && (
                        <div className="mt-2">
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                className="w-full h-auto border rounded"
                            />
                            <Button variant="contained" color="primary" onClick={capturePhoto} sx={{ mt: 2 }}>
                                Take Picture
                            </Button>
                        </div>
                    )}

                    {/* Captured Photo Preview */}
                    {photo && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Selected/Captured Photo:</p>
                            <img
                                src={photo}
                                alt="Captured"
                                className="w-32 h-32 object-cover border rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
                >
                    Submit Complaint
                </button>
            </form>
    );
};

export default PostComplaint;
