import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useGetDataStore } from "../../store/useGetDataStore";
import AdminLayout from "../../components/AdminLayout";


const GetQubeData = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { qubeData, getQubeData, loading, success, updateQube } = useGetDataStore();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getQubeData();
  }, [getQubeData]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    }
  }, [success]);

    const handleUpdate = (id,data) =>{
    updateQube(id, JSON.stringify(data));
    setTimeout (() => getQubeData(), 1000)
  }

  const tableColumns = [
    { name: "supervisorName", label: "Supervisor Name"},
    { name: "contactNumber", label: "Contact Number", pattern: /^\d{10}$/ },
     { name: "category", label: "Category"},
   { name: "cubeNumber", label: "Cube Number"},
    { name: "dateTime", label: "Date and Time", type: "datetime-local"},
    { name: "photo", label: "Photo"},
    { name: "status", label: "Status", width: "10%" },
    
  ];

  return (
    <AdminLayout
      userRole="citizen"
      tableName = "Qube Fullfillment"
      tableColumns={tableColumns}
      tableRows={qubeData}
      loading={loading}
      setSelectedRow={setSelectedRow}
       rawUpdate = {handleUpdate}
    />
  );
};

export default GetQubeData;
