import { useState } from "react";

import DynamicForm from "../../components/DynamicForm";

import useMoKhhataStore from "../../store/useMoKhhataStore";


const MoKhhataForm = ({selectedRow}) => {
  const { fetchData, getData, putData } = useMoKhhataStore();



  const complaintFormFields = [
    { name: "supervisorName", label: "Supervisor Name", type: "text", required: true },
    { name: "contactNumber", label: "Contact Number", type: "number", required: true, pattern: /^\d{10}$/ },
    { name: "moKhataGeneration", label: "Mo Khhata Generation", type: "text", required: true },
    { name: "moKhataStock", label: "Mo Khhata Stock", type: "text", required: true },
    { name: "sold", label: "Sold", type: "text", required: true },
  ];
  

const handleComplaintSubmit = (data) => {
  if (selectedRow?.id) {
    putData( selectedRow.id, data);
  } else {
   
    fetchData(JSON.stringify(data));
  }

  setTimeout(() => getData(), 1000);
}
  return (
    <DynamicForm
      fields={complaintFormFields}
      onSubmit={handleComplaintSubmit}
      showImageCapture={true}
      initialValues={selectedRow}
    />
  );
};

export default MoKhhataForm