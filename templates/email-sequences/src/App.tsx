import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { SubscriberList } from "./components/SubscriberList";
import { TemplateList } from "./components/TemplateList";
import { SequenceList } from "./components/SequenceList";
import { SequenceDetail } from "./components/SequenceDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="subscribers" element={<SubscriberList />} />
          <Route path="templates" element={<TemplateList />} />
          <Route path="sequences" element={<SequenceList />} />
          <Route path="sequences/:id" element={<SequenceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
