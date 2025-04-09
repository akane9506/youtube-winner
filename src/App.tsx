import { HeroUIProvider } from "@heroui/react";
import PreferenceProvider from "@/contexts/PreferenceContext";
import Header from "@/components/Header";
import SearchResultProvider from "@/contexts/SearchResultContext";
import Main from "@/components/Main";

function App() {
  // TODO: use this part for handling screen with different resolutions

  // const screenWidth = window.screen.width;
  // const screenHeight = window.screen.height;
  // console.log(`Screen Width: ${screenWidth}px`);
  // console.log(`Screen Height: ${screenHeight}px`);
  // console.log(`Device Pixel Ratio: ${window.devicePixelRatio}`);

  return (
    <PreferenceProvider>
      <HeroUIProvider className="h-full">
        <div className="flex flex-col h-full">
          <SearchResultProvider>
            <Header />
            {/* Search and result section */}
            <Main />
          </SearchResultProvider>
        </div>
      </HeroUIProvider>
    </PreferenceProvider>
  );
}

export default App;
