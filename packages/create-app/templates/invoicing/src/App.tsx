import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { InvoiceList } from "./components/InvoiceList";
import { InvoiceDetail } from "./components/InvoiceDetail";
import { CreateInvoice } from "./components/CreateInvoice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InvoiceList />} />
          <Route path="invoice/:id" element={<InvoiceDetail />} />
          <Route path="new" element={<CreateInvoice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
