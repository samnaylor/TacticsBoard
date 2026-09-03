import { MdFormatListNumbered, MdMenu } from "react-icons/md";
import { useTacticsState } from "../store/state";
import logo from "../assets/addinghamfc.webp";
import DrawerMenu from "./DrawerMenu";
import { useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { GiSoccerField } from "react-icons/gi";
import IconButton from "./IconButton";

const Header = () => {
  const screen = useTacticsState((state) => state.screen);
  const resetNames = useTacticsState((state) => state.resetNames);
  const resetLayout = useTacticsState((state) => state.resetLayout);
  const setScreen = useTacticsState((state) => state.setScreen);

  const [menuOpen, setMenuOpen] = useState(false);

  const resetLabel =
    screen === "pitch" ? "Reset formation" : "Reset player names";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1b14]/95 px-3 py-3 backdrop-blur">
      <div className="relative mx-auto flex w-full items-center justify-between px-2 md:max-w-190">
        <img
          src={logo}
          width={768}
          height={768}
          decoding="async"
          draggable={false}
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="mr-auto flex items-center justify-center">
          {screen === "players" && (
            <IconButton
              label="Show pitch"
              onClick={() => setScreen("pitch")}
              className="px-2.5 py-2"
            >
              <GiSoccerField className="h-6 w-6" />
            </IconButton>
          )}

          {screen === "pitch" && (
            <IconButton
              label="Edit player names"
              onClick={() => setScreen("players")}
              className="px-2.5 py-2"
            >
              <MdFormatListNumbered className="h-6 w-6" />
            </IconButton>
          )}
        </div>

        <div className="ml-auto flex items-center justify-center">
          <IconButton
            label={resetLabel}
            onClick={() => {
              if (screen === "pitch") {
                resetLayout();
                return;
              }

              resetNames();
            }}
            className="px-2.5 py-2"
          >
            <RiResetLeftFill className="w-6 h-6" />
          </IconButton>

          <IconButton
            label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="px-2.5 py-2"
          >
            <MdMenu className="h-6 w-6" />
          </IconButton>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <DrawerMenu open={menuOpen} setOpen={setMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
