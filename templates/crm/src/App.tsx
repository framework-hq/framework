import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ContactList } from "./components/ContactList";
import { ContactDetail } from "./components/ContactDetail";
import { isDemoMode } from "./lib/supabase";

function App() {
  return (
    <BrowserRouter>
      {isDemoMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
          🎭 Demo Mode — Connect Supabase to persist data.{" "}
          <a href="https://supabase.com/dashboard?utm_source=framework" className="underline">
            Get started free →
          </a>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactList />} />
          <Route path="contact/:id" element={<ContactDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
