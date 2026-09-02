import { MdFormatListNumbered, MdMenu } from "react-icons/md";
import { useTacticsState } from "../store/tactics";
import logo from "../assets/addinghamfc.png";
import DrawerMenu from "./DrawerMenu";
import { useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { GiSoccerField } from "react-icons/gi";

const Header = () => {
  const screen = useTacticsState((state) => state.screen);
  const formation = useTacticsState((state) => state.formation);
  const resetNames = useTacticsState((state) => state.resetNames);
  const changeFormation = useTacticsState((state) => state.changeFormation);
  const gotoPitch = useTacticsState((state) => state.gotoPitch);
  const gotoPlayers = useTacticsState((state) => state.gotoPlayers);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1b14]/95 px-3 py-3 backdrop-blur">
      <div className="relative mx-auto flex w-full items-center justify-between px-2 md:max-w-190">
        <img
          src={logo}
          draggable={false}
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Left side */}
        <div className="mr-auto flex items-center justify-center">
          {screen === "players" && (
            <button
              onClick={gotoPitch}
              className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <GiSoccerField className="h-6 w-6" />
            </button>
          )}

          {screen === "pitch" && (
            <button
              onClick={gotoPlayers}
              className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <MdFormatListNumbered className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center justify-center">
          <button
            onClick={() => {
              if (screen === "pitch") {
                changeFormation(formation);
                return;
              }

              resetNames();
            }}
            className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <RiResetLeftFill className="w-6 h-6" />
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <MdMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <DrawerMenu open={menuOpen} setOpen={setMenuOpen} />
    </header>
  );
};

export default Header;
