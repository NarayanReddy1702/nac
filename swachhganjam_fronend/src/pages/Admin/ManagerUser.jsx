import React, { useEffect, useState } from "react";
import useComplainStore from "../../store/useComplainStore";
import Layout from "../../components/Layout";
import useMachineryStore from "../../store/useMachineryDefect";
import userSupervisorStore from "../../store/useSupervisorStore";


const ManageUser = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {supervisor, getUser, loading, success} = userSupervisorStore();
    const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (success) {
      setModalOpen(false);
    }
  }, [success]);

  const tableColumns = [
    { id: "username", label: "User Name", width: "15%" },
    { id: "name", label: "Supervisor Name", width: "15%" },
    { id: "contactNumber", label: "Contact Number", width: "20%" },
    { id: "role", label: "Role", width: "20%" },
    // { id: "status", label: "Status", width: "10%" },
  ];

  return (
    <Layout
      userRole="admin"
      title="Welcome to the Admin Dashboard"
      description="Monitor complaints and assign tasks to teams."
      buttonLabel="Add Supervisor"
      tableName = "Supervisor Accounts"
      modalHeading= "Create Supervisor Account"
      showButton={true}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      tableColumns={tableColumns}
      tableRows={supervisor}
      loading={loading}
      setSelectedRow={setSelectedRow}
    />
  );
};

export default ManageUser;
