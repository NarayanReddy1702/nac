import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useGetDataStore } from "../../store/useGetDataStore";
import AdminLayout from "../../components/AdminLayout";


const GetMokhata = () => {
  const { moKhataData, getMokhataData, loading, updateMoKhata } = useGetDataStore();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getMokhataData();
  }, [getMokhataData]);

   const handleUpdate = (id,data) =>{
    updateMoKhata(id, JSON.stringify(data));
    setTimeout (() => getMokhataData(), 1000)
  }



  const tableColumns = [
    { name: "supervisorName", label: "Supervisor Name" },
    { name: "contactNumber", label: "Contact Number" },
    { name: "dateTime", label: "Date and Time"},
    { name: "moKhataGeneration", label: "Generation"},
      { name: "moKhataStock", label: "Stock"},
    { name: "sold", label: "Sold", width: "10%" },
    
  ];

  return (
    <AdminLayout
      userRole="citizen"
      tableName = "Mo Khhata Entry"
      tableColumns={tableColumns}
      tableRows={moKhataData}
      loading={loading}
      setSelectedRow={setSelectedRow}
      rawUpdate = {handleUpdate}
    />
  );
};

export default GetMokhata;
