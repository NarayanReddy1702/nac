import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useMoKhhataStore from "../../store/useMoKhhataStore";


const MoKhhataEntry = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, getData, loading, success } = useMoKhhataStore();

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (success) {
    setModalOpen(false);
    }
  }, [success]);

  const handleEdit = (row) => {
    setSelectedRow(row); // save the row that needs to be edited
    setModalOpen(true);  // open the modal
  };

  const tableColumns = [
    { id: "supervisorName", label: "Supervisor Name", width: "15%" },
    { id: "contactNumber", label: "Contact Number", width: "15%" },
    { id: "dateTime", label: "Date & Time", width: "20%" },
    { id: "moKhataGeneration", label: "Generation", width: "15%" },
    { id: "moKhataStock", label: "Stock", width: "15%" },
    { id: "sold", label: "Sold", width: "10%" },
    { id: "actions", label: "Actions", width: "10%" },
  ];
  

  return (
<Layout
  userRole="moKhhataForm"
  title="Mo Khhata Entry"
  description="Monitor complaints and assign tasks to teams."
  buttonLabel="Mo Khhata Entry Form"
  tableName="Mo Khhata Entry Summary"
  modalHeading="Mo Khhata Entry Form"
  showButton={true}
  modalOpen={modalOpen}
  setModalOpen={setModalOpen}
  tableColumns={tableColumns}
  tableRows={data}
  loading={loading}
  onEdit={handleEdit}            
  selectedRow={selectedRow}  
  setSelectedRow={setSelectedRow}
/>
  );
};

export default MoKhhataEntry;
