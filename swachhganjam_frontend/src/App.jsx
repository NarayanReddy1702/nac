import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import CitizenLogin from "./pages/Citizen/CitizenLogin";
import CitizenDashboard from "./pages/Citizen/CitizenDashboard";
import "leaflet/dist/leaflet.css";
import useLoginStore from "./store/useLoginStore";
import Complain from "./pages/Citizen/Complain";
import TrackVehicle from "./pages/Citizen/TrackVehicle";
import SuperVisorDashboard from "./pages/Supervisor/SuperVisorDashboard";
import MoKhhataEntry from "./pages/Supervisor/MoKhhataEntry";
import QubeFulFillment from "./pages/Supervisor/QubeFulfillment";
import ManageUser from "./pages/Admin/ManagerUser";
import ManageCitizenUser from "./pages/Admin/ManageCitizenUser";
import GetPostComplain from "./pages/Admin/GetPostComplain";
import GetMachineryDefect from "./pages/Admin/GetMachineryDefect";
import GetQubeData from "./pages/Admin/QubeData";
import GetMokhata from "./pages/Admin/GetMoKhhata";

// Component to handle default route
const DefaultRoute = () => {
  const { isLoggedIn } = useLoginStore();
  return isLoggedIn ? <Navigate to="/complaint" replace /> : <Navigate to="/login" replace />;
};

// Private Route Wrapper
const PrivateRoute = () => {
  const { isLoggedIn } = useLoginStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultRoute />,
  },
  {
    path: "/login",
    element: <CitizenLogin />,
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: "/complaint", element: <CitizenDashboard /> },     
      { path: "/machinery", element: <SuperVisorDashboard /> }, 
      {path: "qubeFulfillment", element: <QubeFulFillment />},
      {path: "/moKhhataEntry", element: <MoKhhataEntry />} ,   
      { path: "/dashboard", element: <CitizenDashboard /> },      
      { path: "/trackVehicle", element: <TrackVehicle /> },
      {path: "/admin/manageSupervisor", element: <ManageUser />},
      {path: "/admin/manageUser", element:<ManageCitizenUser />},
      {path: "/admin/complaint", element:<GetPostComplain />},
      {path: "/admin/machinery", element:<GetMachineryDefect /> },
       {path: "/admin/qubeFulfillment", element:<GetQubeData /> },
       {path: "/admin/moKhhataEntry", element: <GetMokhata />}
    ],
  },
]);

function App() {

  const {handleTokenExpiry} = useLoginStore();
  useEffect(()=>{
    handleTokenExpiry()
  },[])
  return <RouterProvider router={router} />;
}

export default App;
