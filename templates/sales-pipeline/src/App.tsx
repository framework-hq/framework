import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Pipeline } from "./components/Pipeline";
import { DealDetail } from "./components/DealDetail";
import { DealList } from "./components/DealList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="deals" element={<DealList />} />
          <Route path="deals/:id" element={<DealDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
