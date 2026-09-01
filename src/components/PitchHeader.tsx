import { defaultNames, formations, type Formation } from "../data";
import logo from "../assets/addinghamfc.png";
import { useTacticsState } from "../store/tactics";
import { toPng } from "html-to-image";

const exportPng = async () => {
  const node = document.getElementById("formation-export");

  if (!node) return;

  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    backgroundColor: "#1e4d3a",
    filter: (element) => {
      if (!(element instanceof Element)) {
        return true;
      }

      return !element.hasAttribute("data-export-ignore");
    },
  });

  const link = document.createElement("a");

  link.download = `football-squad.png`;
  link.href = dataUrl;

  link.click();
};

const PitchHeader = () => {
  const formation = useTacticsState((state) => state.formation);
  const changeFormation = useTacticsState((state) => state.changeFormation);
  const gotoPlayers = useTacticsState((state) => state.gotoPlayers);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1b14]/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto max-w-190 flex items-center justify-between gap-3 px-2">
        <div className="flex flex-row justify-between items-center gap-4">
          <img src={logo} draggable={false} className="w-8 h-8" />

          <select
            value={formation}
            onChange={(event) =>
              changeFormation(event.target.value as Formation)
            }
            className="w-full rounded border border-white/25 bg-[#14261c] px-1.5 py-0.5 text-[13px] text-[#f1faf0] outline-none focus:border-[#e9c46a]"
          >
            {Object.keys(formations).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => {
              useTacticsState.persist.clearStorage();

              useTacticsState.setState({
                bench: 3,
                formation: formation,
                names: defaultNames.map((name) => ({ name, modified: false })),
                layout: formations[formation],
              });
            }}
            className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            Reset
          </button>

          <button
            onClick={gotoPlayers}
            className="rounded-lg bg-white/10 px-2.5 py-2 text-xs font-semibold transition hover:bg-white/15"
          >
            Players
          </button>

          <button
            onClick={exportPng}
            className="rounded-lg bg-amber-300 px-2.5 py-2 text-xs font-bold text-[#13251b] shadow-sm transition hover:bg-amber-200"
          >
            Export PNG
          </button>
        </div>
      </div>
    </header>
  );
};

export default PitchHeader;
