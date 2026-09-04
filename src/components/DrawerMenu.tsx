import type React from "react";
import { MdClose, MdColorLens, MdFormatListNumbered } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import { useTacticsState } from "../store/state";
import { RiResetLeftFill } from "react-icons/ri";
import { GiSoccerField } from "react-icons/gi";
import Divider from "./Divider";
import { TfiHandDrag } from "react-icons/tfi";
import { AnimatePresence, motion } from "motion/react";
import MenuItem from "./MenuItem";
import IconButton from "./IconButton";
import AppCredits from "./AppCredits";
import { exportPng, shareFormation } from "../utils";
import { CiShare1 } from "react-icons/ci";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerMenu = ({ open, setOpen }: Props) => {
  const dragDropEnabled = useTacticsState((state) => state.dragDropEnabled);
  const colourScheme = useTacticsState((state) => state.colourScheme);
  const screen = useTacticsState((state) => state.screen);
  const resetAll = useTacticsState((state) => state.resetAll);
  const setScreen = useTacticsState((state) => state.setScreen);
  const toggleColourScheme = useTacticsState(
    (state) => state.toggleColourScheme,
  );
  const toggleDragDrop = useTacticsState((state) => state.toggleDragDrop);

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

              <IconButton label="Close menu" onClick={onClose} className="p-2">
                <MdClose className="h-6 w-6" />
              </IconButton>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              <Divider label="Screens" />

              <MenuItem
                icon={<GiSoccerField />}
                label="Pitch"
                onClick={() => {
                  setScreen("pitch");
                  onClose();
                }}
                active={screen === "pitch"}
              />

              <MenuItem
                icon={<MdFormatListNumbered />}
                label="Players"
                onClick={() => {
                  setScreen("players");
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
                icon={<CiShare1 />}
                label="Share Formation"
                onClick={shareFormation}
              />

              <MenuItem
                icon={<RiResetLeftFill />}
                label="Reset All"
                onClick={() => {
                  resetAll();
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
                label={`Drag and Drop: ${dragDropEnabled ? "On" : "Off"}`}
                onClick={toggleDragDrop}
              />
            </nav>

            <div className="border-t border-white/10 p-4 text-center text-[10px] text-white/35">
              <AppCredits />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;
