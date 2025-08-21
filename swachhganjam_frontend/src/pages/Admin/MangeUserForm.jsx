import { useState } from "react";

import DynamicForm from "../../components/DynamicForm";
import userSupervisorStore from "../../store/useSupervisorStore";


const ManageUserForm = () => {

  const { fetchData, getUser } = userSupervisorStore();



  const complaintFormFields = [
    { name: "username", label: "User Name", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true, },
    { name: "name", label: "Supervisor Name", type: "text", required: true },
    { name: "contactNumber", label: "Contact Number", type: "phone", required: true, pattern: /^\d{10}$/ },
  ];
  

  const handleComplaintSubmit = (data) => {
    fetchData(JSON.stringify(data));
    setTimeout(() => getUser(), 1000);
  };

  return (
    <DynamicForm
      fields={complaintFormFields}
      onSubmit={handleComplaintSubmit}
      showImageCapture={true}
    
    />
  );
};

export default ManageUserForm