import React, { useEffect, useState } from "react";
import useComplainStore from "../../store/useComplainStore";
import Layout from "../../components/Layout";
import useMachineryStore from "../../store/useMachineryDefect";
import userSupervisorStore from "../../store/useSupervisorStore";


const ManageCitizenUser = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {citizen, getCitizenUser, loading, success} = userSupervisorStore();
    const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    getCitizenUser();
  }, [getCitizenUser]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    }
  }, [success]);

  const tableColumns = [
    { id: "name", label: "Citizen Name", width: "15%" },
    { id: "phoneNumber", label: "Contact Number", width: "20%" },
    { id: "role", label: "Role", width: "20%" },
    // { id: "status", label: "Status", width: "10%" },
  ];

  return (
    <Layout
      userRole="admin"
      title="Manage Citizen Users"
      description="Monitor complaints and assign tasks to teams."
      tableName = "Citizen Accounts"
      modalHeading= "Create Supervisor Account"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      tableColumns={tableColumns}
      tableRows={citizen}
      loading={loading}
      setSelectedRow={setSelectedRow}
    />
  );
};

export default ManageCitizenUser;
