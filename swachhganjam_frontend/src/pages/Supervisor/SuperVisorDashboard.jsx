import React, { useEffect, useState } from "react";
import useComplainStore from "../../store/useComplainStore";
import Layout from "../../components/Layout";
import useMachineryStore from "../../store/useMachineryDefect";


const SuperVisorDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {machinery, getData, loading, success} = useMachineryStore();
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
    { id: "machineName", label: "Machine Name", width: "15%" },
    { id: "dateTime", label: "Date & Time", width: "20%" },
    { id: "photo", label: "Image", width: "5%" },
    { id: "description", label: "Description", width: "20%" },
    { id: "status", label: "Status", width: "10%" },
  ];

  return (
    <Layout
      userRole="supervisor"
      title="Welcome to the Supervisor Dashboard"
      description="Monitor complaints and assign tasks to teams."
      buttonLabel="Machinery Defect Form"
      tableName = "Machinery Defect Summary"
      modalHeading= "Machinery Defect"
      showButton={true}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      tableColumns={tableColumns}
      tableRows={machinery}
      loading={loading}
      setSelectedRow={setSelectedRow}
    />
  );
};

export default SuperVisorDashboard;
