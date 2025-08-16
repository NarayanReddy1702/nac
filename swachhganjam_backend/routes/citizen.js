const express = require('express');
const router = express.Router();
const db = require('../models');
const Complaint = db.Complaint;
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is present
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // to generate a unique filename
const axios = require('axios');
require('dotenv').config(); // Optional, if not already called in main file


router.post('/complaint', authMiddleware('citizen'), async (req, res) => {
  const { citizenName, phoneNumber, wardNumber, area, description, category, photo } = req.body;

  try {
    // Check if there's a photo
    let photoUrl = null;
    if (photo) {
      // Decode the base64 string
      const base64Data = photo.replace(/^data:image\/\w+;base64,/, ''); // Remove the prefix if it exists
      const buffer = Buffer.from(base64Data, 'base64');

      // Generate a unique file name
      const fileName = `${uuidv4()}.jpg`; // Use .jpg or the appropriate file extension

      // Define the full path where you want to store the image
      const uploadPath = path.join('/home/complaint-system/uploads', fileName);

      // Ensure the directory exists before writing the file
      const dirPath = path.dirname(uploadPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Write the image to the server
      fs.writeFileSync(uploadPath, buffer);

      // Generate the URL to access the image (adjust based on your actual server URL)
      photoUrl = `https://sas.briskode.online/uploads/${fileName}`;
    }

    // Create the complaint record with the URL to the image
    const complaint = await Complaint.create({
      citizenId: req.user.id, // This is where the error occurred
      citizenName,
      phoneNumber,
      wardNumber,
      area,
      description,
      category,
      photo: photoUrl, // Store the URL of the image
    });

    res.status(201).json({ success: true, message: 'Complaint registered successfully', complaint });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ success: false, message: 'Failed to register complaint', error: error.message });
  }
});


router.get('/complaints', authMiddleware('citizen'), async (req, res) => {
  try {
    // Fetch active complaints for the citizen
    const complaints = await Complaint.findAll({
      where: {
        citizenId: req.user.id,
        activeStatus: 'Active', // Only fetch active complaints
      },
    });

    // Respond with the success message and the fetched complaints
    res.status(200).json({
      success: true,
      message: 'Active complaints retrieved successfully',
      complaints,
    });
  } catch (error) {
    // Catch any errors and respond with failure message
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve complaints',
      error: error.message,
    });
  }
});


router.get('/trackings', authMiddleware('citizen'), async (req, res) => {
  try {
    const loginPayload = {
      username: process.env.BLACKBUCK_USERNAME,
      password: process.env.BLACKBUCK_PASSWORD,
      login_type: process.env.BLACKBUCK_LOGIN_TYPE,
      tenant: process.env.BLACKBUCK_TENANT,
      client_name: process.env.BLACKBUCK_CLIENT_NAME,
    };
     
    const loginResponse = await axios.post(
      'https://partner-api.blackbuck.com/authentication/v1/login',
      loginPayload,
      {
        headers: {
          'content-type': 'application/json',
	  'x-aaa-enabled': 'true',
        },
      }
    );

    const token = loginResponse?.data?.access_token; // ✅ fixed here

    if (!token) {
      return res.status(401).json({ success: false, message: 'Blackbuck token not received' });
    }

    const trackingResponse = await axios.get(
      'https://api-fms.blackbuck.com/fmsiot/api/shipper/tracking/list?page_number=0&page_size=5',
      {
        headers: {
          authorization: `Token ${token}`,
          'content-type': 'application/json',
	  'x-aaa-enabled': 'true',
        },
      }
    );
    const allData = trackingResponse.data;
    const filteredList = allData.list.filter(
        item => item.truck_no !== 'OD07Z8706' && item.truck_no !== 'OD07Z8705'
    );

    /*res.status(200).json({
      success: true,
      message: 'Tracking data fetched successfully',
      data: trackingResponse.data,
    });*/
	  res.status(200).json({
		        success: true,
		        message: 'Tracking data fetched successfully',
		        data: {
				        ...allData,
				        list: filteredList,
				        total_count: filteredList.length, // Optional: update count
				      },
		      });
  } catch (error) {
    console.error('Blackbuck tracking error:', error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tracking data from Blackbuck',
      error: error?.response?.data || error.message,
    });
  }
});


// Export the router to be used in the main app
module.exports = router;

