import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Reels from "./pages/Reels.tsx";
import TryOn from "./pages/TryOn.tsx";
import StyleLibrary from "./pages/StyleLibrary.tsx";
import AIStylist from "./pages/AIStylist.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/try-on" element={<TryOn />} />
          <Route path="/style-library" element={<StyleLibrary />} />
          <Route path="/ai-stylist" element={<AIStylist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
