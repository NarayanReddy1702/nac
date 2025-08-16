import React, { useEffect, useState } from "react";
import useComplainStore from "../../store/useComplainStore";
import Layout from "../../components/Layout";


const CitizerDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { complaints, getData, loading, success } = useComplainStore();
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

  const tableColumns = [
    { id: "citizenName", label: "Citizen Name", width: "15%" },
    { id: "wardNumber", label: "Ward Number", width: "10%" },
    { id: "phoneNumber", label: "Phone Number", width: "15%" },
    { id: "area", label: "Area", width: "15%" },
    { id: "dateTime", label: "Date & Time", width: "20%" },
    { id: "description", label: "Description", width: "20%" },
    { id: "photo", label: "Photo", width: "5%" },
    { id: "status", label: "Status", width: "10%" },
  ];

  return (
    <Layout
      userRole="citizen"
      title="Welcome to the Citizen Dashboard"
      description="Monitor complaints and assign tasks to teams."
      buttonLabel="Post a Complaint"
      tableName = "Complaint Summary"
      modalHeading= "Post a Complaint"
      showButton={true}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      tableColumns={tableColumns}
      tableRows={complaints}
      loading={loading}
      setSelectedRow={setSelectedRow}
    />
  );
};

export default CitizerDashboard;
