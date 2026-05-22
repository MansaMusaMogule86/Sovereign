import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RecoveryNew from "./pages/RecoveryNew";
import RecoverySession from "./pages/RecoverySession";
import RecoveryQuantum from "./pages/RecoveryQuantum";
import RecoveryAIPredict from "./pages/RecoveryAIPredict";
import RecoveryDarkweb from "./pages/RecoveryDarkweb";
import RecoveryTimeMachine from "./pages/RecoveryTimeMachine";
import History from "./pages/History";
import Addresses from "./pages/Addresses";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import DashboardLayout from "./components/layout/DashboardLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/dashboard">
        <DashboardLayout><Dashboard /></DashboardLayout>
      </Route>
      <Route path="/recovery/new">
        <DashboardLayout><RecoveryNew /></DashboardLayout>
      </Route>
      <Route path="/recovery/quantum">
        <DashboardLayout><RecoveryQuantum /></DashboardLayout>
      </Route>
      <Route path="/recovery/ai-predict">
        <DashboardLayout><RecoveryAIPredict /></DashboardLayout>
      </Route>
      <Route path="/recovery/darkweb">
        <DashboardLayout><RecoveryDarkweb /></DashboardLayout>
      </Route>
      <Route path="/recovery/timemachine">
        <DashboardLayout><RecoveryTimeMachine /></DashboardLayout>
      </Route>
      <Route path="/recovery/:id">
        {(params) => <DashboardLayout><RecoverySession id={params.id} /></DashboardLayout>}
      </Route>
      <Route path="/history">
        <DashboardLayout><History /></DashboardLayout>
      </Route>
      <Route path="/addresses">
        <DashboardLayout><Addresses /></DashboardLayout>
      </Route>
      <Route path="/settings">
        <DashboardLayout><Settings /></DashboardLayout>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
