import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useGetDataStore } from "../../store/useGetDataStore";
import AdminLayout from "../../components/AdminLayout";


const GetMachineryDefect = () => {
  const { machinery, getMachineryData, loading, success, updateMachinery } = useGetDataStore();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getMachineryData();
  }, [getMachineryData]);


  const handleUpdate = (id,data) =>{
    updateMachinery(id, JSON.stringify(data));
    setTimeout (() => getMachineryData(), 1000)
  }

  const tableColumns = [
    { name: "supervisorName", label: "Supervisor Name", type: "text", required: true },
    { name: "contactNumber", label: "Contact Number", type: "number", required: true, pattern: /^\d{10}$/ },
    { name: "dateTime", label: "Date and Time", type: "datetime-local", required: true },
    // { name: "machineName", label: "Machine Name", type: "select", options: categories, required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "photo", label: "Photo",type: "photo" },
    { name: "status", label: "Status", width: "10%" },
    
  ];

  return (
    <AdminLayout
      userRole="citizen"
      tableName = "Machinery Defect"
      tableColumns={tableColumns}
      tableRows={machinery}
      loading={loading}
      setSelectedRow={setSelectedRow}
      rawUpdate = {handleUpdate}
    />
  );
};

export default GetMachineryDefect;
