import { HeroUIProvider } from "@heroui/react";
import PreferenceProvider from "@/contexts/PreferenceContext";
import Header from "@/components/Header";
import Search from "@/components/search/Search";

function App() {
  // TODO: use this part for handling screen with different resolutions

  // const screenWidth = window.screen.width;
  // const screenHeight = window.screen.height;
  // console.log(`Screen Width: ${screenWidth}px`);
  // console.log(`Screen Height: ${screenHeight}px`);
  // console.log(`Device Pixel Ratio: ${window.devicePixelRatio}`);

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
