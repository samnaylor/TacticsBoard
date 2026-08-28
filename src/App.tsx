import { toPng } from "html-to-image";
import { useState } from "react";
import Pitch from "./components/Pitch";
import PlayerEditor from "./components/PlayerEditor";
import { defaultNames, type Formation } from "./data";

const App = () => {
  const [screen, setScreen] = useState<"pitch" | "players">("pitch");
  const [formation, setFormation] = useState<Formation>("4-4-2");
  const [names, setNames] = useState(defaultNames);

  // TODO - desktop export is broken

  const exportPng = async () => {
    const node =
      document.getElementById("formation-export");

    if (!node) return;

    let title = (document.getElementById("squad-title")! as HTMLInputElement).value;

    if (title.trim() === "") {
      title = "football-formation";
    }

    const dataUrl = await toPng(node, {
      pixelRatio: 1,
      backgroundColor: "#1e4d3a",
      filter: (element) => {
        if (!(element instanceof Element)) {
          return true;
        }

        return !element.hasAttribute("data-export-ignore")
      }
    });

    const link = document.createElement("a");

    link.download = `${title}.png`;
    link.href = dataUrl;

    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0d1b14] font-body text-[#f1faf0]">
      {screen === "pitch" ? (
        <Pitch
          names={names}
          formation={formation}
          onPlayers={() => setScreen("players")}
          onExport={exportPng}
          setFormation={setFormation}
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
