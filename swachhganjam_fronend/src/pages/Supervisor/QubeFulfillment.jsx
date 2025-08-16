import React, { useEffect, useState } from "react";
import useComplainStore from "../../store/useComplainStore";
import Layout from "../../components/Layout";
import useQubeStore from "../../store/useQubeStore";


const QubeFulFillment = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, getData, loading, success } = useQubeStore();
    const [selectedRow, setSelectedRow] = useState(null)

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

  const tableColumns = [
    { id: "supervisorName", label: "Supervisor Name", width: "15%" },
    { id: "contactNumber", label: "Contact Number", width: "15%" },
    { id: "category", label: "Category", width: "15%" },
    { id: "cubeNumber", label: "Category Number", width: "15%" },
    { id: "dateTime", label: "Date & Time", width: "20%" },
    { id: "photo", label: "Photo", width: "5%" },
    { id: "status", label: "Status", width: "10%" },
  ];

  return (
    <Layout
      userRole="qubeFulfillment"
      title="Qube FulFillment"
      description="Monitor complaints and assign tasks to teams."
      buttonLabel="Qube FulFillment"
      tableName = "Qube FulFillment Summary"
      modalHeading= "Wealth Center Name: Ganjam NAC"
      showButton={true}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      tableColumns={tableColumns}
      tableRows={data}
      loading={loading}
      setSelectedRow={setSelectedRow}
    />
    
  );
};

export default QubeFulFillment;
