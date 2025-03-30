import { HeroUIProvider } from "@heroui/react";
import PreferenceProvider from "@/contexts/PreferenceContext";
import Header from "@/components/Header";
import Search from "@/components/search/Search";

function App() {
  return (
    <PreferenceProvider>
      <HeroUIProvider>
        <div className="flex flex-col h-dvh min-h-[680px]">
          <Header />
          <Search />
        </div>
      </HeroUIProvider>
    </PreferenceProvider>
  );
}

export default App;
