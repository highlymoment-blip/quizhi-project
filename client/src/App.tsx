import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Creator from "./pages/Creator";

/**
 * Quizhi Project - Agent Skills Creator
 * Design: Playful Creative Studio
 * 
 * Color Palette:
 * - Background: Soft gradient (cream #faf8f3 to light purple #f0e6ff)
 * - Primary: Coral Red #ff6b6b
 * - Accent: Teal #4ecdc4
 * - Gold: #ffd93d
 * - Purple: #a78bfa
 * - Pink: #ff8fab
 * 
 * Typography:
 * - Display/Headings: Poppins 700
 * - Body: Poppins 500
 * - Accent: Caveat (handwritten style)
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/creator"} component={Creator} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
