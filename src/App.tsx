import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Home />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
