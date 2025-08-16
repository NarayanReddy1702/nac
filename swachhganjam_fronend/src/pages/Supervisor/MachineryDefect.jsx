import { useState } from "react";

import DynamicForm from "../../components/DynamicForm";
import useMachineryStore from "../../store/useMachineryDefect";


const MachineryDefect = () => {
  const { fetchData, getData } = useMachineryStore();

  const categories = [
      'Sheaving/Screening Machine',
      'Balling Machine',
      'Incinerator',
      'Grass Cutter',
      'Tree Cutter',
      'Greese Gun',
      'Shreader Machine',
];



  const complaintFormFields = [
    { name: "supervisorName", label: "Supervisor Name", type: "text", required: true },
    { name: "contactNumber", label: "Contact Number", type: "number", required: true, pattern: /^\d{10}$/ },
    { name: "machineName", label: "Machine Name", type: "select", options: categories, required: true },
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

export default MachineryDefect