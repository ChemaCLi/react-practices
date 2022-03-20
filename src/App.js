import { UserService } from "./services"
import { UsersManagementPage } from "./pages"
import { ServiceLayerProvider } from "./contexts";

function App() {  
  return (
    <ServiceLayerProvider services={{ UserService }}>
      <UsersManagementPage />
    </ServiceLayerProvider>
  );
}

export default App;
