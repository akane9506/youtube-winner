import { HeroUIProvider } from "@heroui/react";
import PreferenceProvider from "@/contexts/PreferenceContext";
import Header from "@/components/Header";
import Search from "@/components/search/Search";

function App() {
  return (
    <PreferenceProvider>
      <HeroUIProvider>
        <Header />
        <Search />
      </HeroUIProvider>
    </PreferenceProvider>
  );
}

export default App;
