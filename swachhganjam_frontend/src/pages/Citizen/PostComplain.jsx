import { useState } from "react";

import DynamicForm from "../../components/DynamicForm";
import useComplainStore from "../../store/useComplainStore";


const PostComplaint = () => {
  const { fetchData, getData } = useComplainStore();

  const categories = [
    'Illegal Dumping of C & D Waste',
    'Dead Animals',
    'Practice of Manual Scavenging',
    'Open Defecation',
    'Urination in Public',
    'No Electricity in Public Toilet',
    'No Water Supply in Public Toilet',
    'Stagnant Water on the Road',
    'Sewerage or Storm Water Overflow',
    'Open Manholes or Drains',
    'Improper Disposal of Faecal Waste or Septage',
    'Garbage Dump',
    'Burning Of Garbage In Open Space',
    'Dustbins Not Cleaned',
    'Sweeping Not Done',
    'Garbage Vehicle Not Arrived',
    'Cleaning of Garbage from Public Spaces',
    'Cleaning of Street Roads',
    'Cleaning of Sewer',
    'Cleaning of Drain',
    'Public Toilet Blockage',
    'Public Toilet Cleaning',
    'Garbage Dump in Public Toilet',
    'Door To Door Collection Not Done'
  ];
  

  const complaintFormFields = [
    { name: "citizenName", label: "Citizen Name", type: "text", required: true },
    { name: "phoneNumber", label: "Phone Number", type: "number", required: true, pattern: /^\d{10}$/ },
    { name: "wardNumber", label: "Ward Number", type: "text", required: true },
    { name: "area", label: "Area", type: "text", required: true },
    { name: "category", label: "Category", type: "select", options: categories, required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "photo", type: "photo" },
  ];
  

  const handleComplaintSubmit = (data) => {
    fetchData(JSON.stringify(data));
    setTimeout(() => getData(), 1000);
  };

  return (
    <DynamicForm
      fields={complaintFormFields}
      onSubmit={handleComplaintSubmit}
      showImageCapture={true}
    />
  );
};

export default PostComplaint