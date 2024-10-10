import { Loader } from "@/components";
import { AppView } from "@/components/views";
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AppView />
    </Suspense>
  );
};

export default App;
