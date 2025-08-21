import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Groups2Icon from '@mui/icons-material/Groups2'; 
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; 
import BuildCircleIcon from '@mui/icons-material/BuildCircle'; 
import InventoryIcon from '@mui/icons-material/Inventory'; 
import DescriptionIcon from '@mui/icons-material/Description'; 

export default function Navigation() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("userRole");
    if (roleFromStorage) {
      setUserRole(roleFromStorage);
    }
  }, []);

  // Base class for each navigation link with responsive styling.
  const navLinkClasses = ({ isActive }) =>
    `px-2 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm md:text-md border-b-2 ${
      isActive
        ? "border-orange-600 text-orange-600"
        : "border-transparent text-gray-600 hover:text-gray-900"
    }`;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-wrap">
          {/* Citizen Specific Links */}
          {userRole === "citizen" && (
            <>
              <NavLink to="/complaint" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  <span>Post a Complaint</span>
                </div>
              </NavLink>
              <NavLink to="/trackVehicle" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <LocalShippingIcon className="h-4 w-4" />
                  <span>Track Vehicle</span>
                </div>
              </NavLink>
            </>
          )}

          {/* Supervisor Specific Links */}
          {userRole === "supervisor" && (
            <>
              <NavLink to="/machinery" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <SupervisorAccountIcon className="h-4 w-4" />
                  <span>Machinery Defect</span>
                </div>
              </NavLink>
              <NavLink to="/trackVehicle" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <LocalShippingIcon className="h-4 w-4" />
                  <span>Track Vehicle</span>
                </div>
              </NavLink>
              <NavLink to="/qubeFulfillment" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <SupervisorAccountIcon className="h-4 w-4" />
                  <span>Qube Fulfillment</span>
                </div>
              </NavLink>
              <NavLink to="/moKhhataEntry" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <SupervisorAccountIcon className="h-4 w-4" />
                  <span>Mo Khhata Entry</span>
                </div>
              </NavLink>
            </>
          )}

          {/* Admin Specific Links */}
          {userRole === "admin" && (
  <>
    <NavLink to="/admin/manageSupervisor" className={navLinkClasses}>
      <div className="flex items-center gap-2">
        <AdminPanelSettingsIcon className="h-4 w-4" />
        <span>Manage Supervisor Users</span>
      </div>
    </NavLink>

    <NavLink to="/admin/manageUser" className={navLinkClasses}>
      <div className="flex items-center gap-2">
        <Groups2Icon className="h-4 w-4" />
        <span>Manage Citizen Users</span>
      </div>
    </NavLink>

    <NavLink to="/admin/complaint" className={navLinkClasses}>
      <div className="flex items-center gap-2">
        <AssignmentTurnedInIcon className="h-4 w-4" />
        <span>Post a Complaint</span>
      </div>
    </NavLink>

    <NavLink to="/admin/machinery" className={navLinkClasses}>
      <div className="flex items-center gap-2">
        <BuildCircleIcon className="h-4 w-4" />
        <span>Machinery Defect</span>
      </div>
    </NavLink>

    <NavLink to="/admin/qubeFulfillment" className={navLinkClasses}>
      <div className="flex items-center gap-2">
        <InventoryIcon className="h-4 w-4" />
        <span>Qube Fulfillment</span>
      </div>
    </NavLink>

    <NavLink to="/admin/moKhhataEntry" className={navLinkClasses}>
      <div className="flex items-center gap-2">
        <DescriptionIcon className="h-4 w-4" />
        <span>Mo Khhata Entry</span>
      </div>
    </NavLink>
     <NavLink to="/trackVehicle" className={navLinkClasses}>
                <div className="flex items-center gap-2">
                  <LocalShippingIcon className="h-4 w-4" />
                  <span>Track Vehicle</span>
                </div>
              </NavLink>
  </>
)}

        </div>
      </div>
    </div>
  );
}
