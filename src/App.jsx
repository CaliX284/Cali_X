import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberDetails from "./pages/MemberDetails";
import CaptainsPage from "./pages/CaptainsPage";
import CaptainDetails from "./pages/CaptainDetails";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import { SideProvider } from "./context/SidebarContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <SideProvider>
              <AppLayout />
            </SideProvider>
          }
        >
          <Route index element={<Navigate replace to={"/dashboard"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route path="/captains" element={<CaptainsPage />} />
          <Route path="/captains/:id" element={<CaptainDetails />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
