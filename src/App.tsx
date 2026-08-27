import { toPng } from "html-to-image";
import { useState } from "react";
import Pitch from "./components/Pitch";
import PlayerEditor from "./components/PlayerEditor";
import { defaultNames } from "./data";

const App = () => {
  const [screen, setScreen] = useState<"pitch" | "players">("pitch");

  const [names, setNames] =
    useState(defaultNames);

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

    link.download = "football-formation.png";
    link.href = dataUrl;

    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0d1b14] font-body text-[#f1faf0]">
      {screen === "pitch" ? (
        <Pitch
          names={names}
          onPlayers={() => setScreen("players")}
          onExport={exportPng}
        />
      ) : (
        <PlayerEditor
          names={names}
          setNames={setNames}
          onBack={() => setScreen("pitch")}
        />
      )}
    </div>
  );
};

export default App;
