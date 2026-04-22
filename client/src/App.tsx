import { Toaster } from "@/components/ui/sonner";
import "./blog.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AISolutions from "./pages/AISolutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Schedule from "./pages/Schedule";
import ChatBot from "./components/ChatBot";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminContacts from "./pages/admin/AdminContacts";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/ai-solutions" component={AISolutions} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      {/* Admin Routes */}
      <Route path="/admin" component={AdminOverview} />
      <Route path="/admin/appointments" component={AdminAppointments} />
      <Route path="/admin/contacts" component={AdminContacts} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ConditionalChatBot() {
  const [location] = useLocation();
  // Hide chatbot on admin pages
  if (location.startsWith("/admin")) return null;
  return <ChatBot />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ConditionalChatBot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
