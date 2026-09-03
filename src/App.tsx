import Pitch from "./components/Pitch";
import PlayerEditor from "./components/PlayerEditor";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useTacticsState } from "./store/state";

const App = () => {
  const screen = useTacticsState((state) => state.screen);

  return (
    <div className="flex flex-1 flex-col justify-between min-h-screen w-full overflow-x-hidden bg-[#0d1b14] font-body text-[#f1faf0]">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col">
        {screen === "pitch" ? <Pitch /> : <PlayerEditor />}
      </div>

      <Footer />
    </div>
  );
};

export default App;
