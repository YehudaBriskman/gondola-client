import "./App.css";
import "leaflet/dist/leaflet.css";
import { Routes, Route, Outlet } from "react-router-dom"
import Map from "./components/map/Map.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AboutUsPage from "./pages/about/AboutUsPage.tsx";
import Homepage from "./pages/homepage/Homepage.tsx";
import CreationMode from "./pages/creationMode/CreationMode.tsx";
import UploadCSV from "./pages/uploadCSV/UploadCSV.tsx";
import ErrorPage from "./pages/errorPage/ErrorPage.tsx";
import Response from "./pages/response/Response.tsx";
import HistoryPage from "./pages/HistoryPage/HistoryPage.tsx";



export default function App() {

  return (
    <div className="app">
      <Routes>
        <Route element={<MainLayout showMap children={<Outlet />} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route element={<Map outlet />}>
          <Route path="/create-mode" element={<CreationMode />} />
          <Route path="/response/:id?" element={<Response />} />
        </Route>
      </Routes>
    </div>
  );
}
