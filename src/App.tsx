import { toPng } from "html-to-image";
import { useState } from "react";
import Pitch from "./components/Pitch";
import PlayerEditor from "./components/PlayerEditor";
import { defaultNames, type Formation } from "./data";
import Footer from "./components/Footer";

const App = () => {
  const [screen, setScreen] = useState<"pitch" | "players">("pitch");
  const [formation, setFormation] = useState<Formation>("4-4-2");
  const [names, setNames] = useState(defaultNames);

  // TODO - desktop export is broken

  const exportPng = async () => {
    const node =
      document.getElementById("formation-export");

    if (!node) return;

    const dataUrl = await toPng(node, {
      pixelRatio: 3,
      backgroundColor: "#1e4d3a",
      filter: (element) => {
        if (!(element instanceof Element)) {
          return true;
        }

        return !element.hasAttribute("data-export-ignore")
      }
    });

    const link = document.createElement("a");

    link.download = `football-squad.png`;
    link.href = dataUrl;

    link.click();
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0d1b14] font-body text-[#f1faf0]">
      <div className="flex min-h-0 flex-1 flex-col">
        {screen === "pitch" ? (
          <Pitch
            names={names}
            formation={formation}
            onPlayers={() => setScreen("players")}
            onExport={exportPng}
            setFormation={setFormation}
            setNames={setNames}
          />
        ) : (
          <PlayerEditor
            names={names}
            setNames={setNames}
            onBack={() => setScreen("pitch")}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
