import type React from "react";
import { MdClose, MdFormatListNumbered } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import { defaultNames, formations, version } from "../data";
import { useTacticsState } from "../store/tactics";
import { toPng } from "html-to-image";
import { RiResetLeftFill } from "react-icons/ri";
import { GiSoccerField } from "react-icons/gi";

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

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerMenu = ({ open, setOpen }: Props) => {
  const formation = useTacticsState((state) => state.formation);
  const resetNames = useTacticsState((state) => state.resetNames);
  const gotoPitch = useTacticsState((state) => state.gotoPitch);
  const gotoPlayers = useTacticsState((state) => state.gotoPlayers);

  const onClose = () => setOpen(false);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed h-screen inset-0 z-100 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-200 flex h-dvh w-[min(85vw,360px)] flex-col border-l border-white/10 bg-[#0d1b14] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-white">Menu</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <MdClose className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {/* TODO: indicate active */}

          <MenuItem
            icon={<GiSoccerField />}
            label="Pitch"
            onClick={() => {
              gotoPitch();
              onClose();
            }}
          />

          <MenuItem
            icon={<MdFormatListNumbered />}
            label="Players"
            onClick={() => {
              gotoPlayers();
              onClose();
            }}
          />

          <div className="my-3 border-t border-white/10" />

          <MenuItem
            icon={<TbFileExport />}
            label="Export PNG"
            onClick={exportPng}
          />

          {/* <MenuItem
            icon={<MdColorLens />}
            label="Toggle Colour Scheme"
            onClick={onClose}
          /> */}

          <div className="my-3 border-t border-white/10" />

          <MenuItem
            icon={<RiResetLeftFill />}
            label="Reset All"
            onClick={() => {
              useTacticsState.persist.clearStorage();

              useTacticsState.setState({
                bench: 3,
                formation: formation,
                names: defaultNames.map((name) => ({ name, modified: false })),
                layout: formations[formation],
              });

              resetNames();
              onClose();
            }}
          />
        </nav>

        <div className="border-t border-white/10 p-4 text-center text-[10px] text-white/35">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>© Sam Naylor</span>

            <span className="text-white/15">•</span>

            <a
              href="https://github.com/samnaylor/TacticsBoard"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white/70"
            >
              GitHub
            </a>

            <span className="text-white/15">•</span>

            <span>v{version}</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DrawerMenu;

interface MenuItemsProps {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
}

function MenuItem({ icon, label, onClick }: MenuItemsProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
    >
      <span className="text-xl text-white/50">{icon}</span>
      <span className="w-full text-left">{label}</span>
    </button>
  );
}
