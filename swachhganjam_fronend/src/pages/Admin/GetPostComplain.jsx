import React, { useEffect, useState } from "react";
import { useGetDataStore } from "../../store/useGetDataStore";
import AdminLayout from "../../components/AdminLayout";


const GetPostComplain = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { complaints, getData, loading, success,updateComaplain  } = useGetDataStore();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    }
  }, [success]);

  const handleUpdate = (id,data) =>{
    updateComaplain(id, JSON.stringify(data));
    setTimeout (() => getData(), 1000)
  }

  const tableColumns = [
    { name: "citizenName", label: "Citizen Name", width: "15%" },
    { name: "wardNumber", label: "Ward Number", width: "10%" },
    { name: "phoneNumber", label: "Phone Number", width: "15%" },
    { name: "area", label: "Area", width: "15%" },
    { name: "dateTime", label: "Date & Time", width: "20%" },
    { name: "description", label: "Description", width: "20%" },
    { name: "photo", label: "Photo", width: "5%" },
    { name: "status", label: "Status", width: "10%" },
    
  ];

  return (
    <AdminLayout
      userRole="citizen"
      tableName = "Complaint Summary"
      modalHeading= "Post a Complaint"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      tableColumns={tableColumns}
      tableRows={complaints}
      loading={loading}
      setSelectedRow={setSelectedRow}
      rawUpdate = {handleUpdate}
    />
  );
};

export default GetPostComplain;
