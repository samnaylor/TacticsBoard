import type React from "react";
import { MdClose, MdColorLens, MdFormatListNumbered } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import { defaultNames, formations, version } from "../data";
import { useTacticsState } from "../store/state";
import { toPng } from "html-to-image";
import { RiResetLeftFill } from "react-icons/ri";
import { GiSoccerField } from "react-icons/gi";
import Divider from "./Divider";
import { TfiHandDrag } from "react-icons/tfi";
import { AnimatePresence, motion } from "motion/react";

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
  const dndEnabled = useTacticsState((state) => state.dndEnabled);
  const colourScheme = useTacticsState((state) => state.colourScheme);
  const screen = useTacticsState((state) => state.screen);
  const formation = useTacticsState((state) => state.formation);
  const resetNames = useTacticsState((state) => state.resetNames);
  const gotoPitch = useTacticsState((state) => state.gotoPitch);
  const gotoPlayers = useTacticsState((state) => state.gotoPlayers);
  const toggleColourScheme = useTacticsState(
    (state) => state.toggleColourScheme,
  );
  const toggleDnd = useTacticsState((state) => state.toggleDnd);

  const onClose = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed h-screen inset-0 z-100 bg-black/50 backdrop-blur-[2px]"
          />

          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-200 flex h-dvh w-[min(85vw,360px)] flex-col border-l border-white/10 bg-[#0d1b14] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/40 px-5 py-4">
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
              <Divider label="Screens" />

              <MenuItem
                icon={<GiSoccerField />}
                label="Pitch"
                onClick={() => {
                  gotoPitch();
                  onClose();
                }}
                active={screen === "pitch"}
              />

              <MenuItem
                icon={<MdFormatListNumbered />}
                label="Players"
                onClick={() => {
                  gotoPlayers();
                  onClose();
                }}
                active={screen === "players"}
              />

              <Divider label="Actions" />

              <MenuItem
                icon={<TbFileExport />}
                label="Export PNG"
                onClick={exportPng}
              />

              <MenuItem
                icon={<RiResetLeftFill />}
                label="Reset All"
                onClick={() => {
                  useTacticsState.persist.clearStorage();

                  useTacticsState.setState({
                    benchCount: 3,
                    formation: formation,
                    names: defaultNames.map((name) => ({
                      name,
                      modified: false,
                    })),
                    layout: formations[formation],
                  });

                  resetNames();
                  onClose();
                }}
              />

              <Divider label="Settings" />

              <MenuItem
                icon={<MdColorLens />}
                label={`Toggle Colour Scheme: ${colourScheme.at(0)?.toUpperCase() + colourScheme.slice(1)}`}
                onClick={toggleColourScheme}
              />

              <MenuItem
                icon={<TfiHandDrag />}
                label={`Drag and Drop: ${dndEnabled ? "On" : "Off"}`}
                onClick={toggleDnd}
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;

interface MenuItemsProps {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  active = false,
  disabled = false,
}: MenuItemsProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex w-full items-center gap-3 rounded-xl p-3
        text-sm font-medium outline-none transition-all duration-200
        ${
          disabled
            ? "cursor-not-allowed text-white/20"
            : active
              ? "bg-emerald-400/12 text-white"
              : "text-white/55 hover:bg-white/[0.07] hover:text-white"
        }
      `}
    >
      <span
        className={`
          text-xl transition-colors
          ${
            disabled
              ? "text-white/15"
              : active
                ? "text-emerald-300"
                : "text-white/35 group-hover:text-white/70"
          }
        `}
      >
        {icon}
      </span>

      <span className="w-full text-left">{label}</span>
    </button>
  );
};
