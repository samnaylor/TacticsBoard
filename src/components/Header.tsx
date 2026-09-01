import { useTacticsState } from "../store/tactics";
import PitchHeader from "./PitchHeader";
import PlayerEditorHeader from "./PlayerEditorHeader";

const Header = () => {
  const screen = useTacticsState((state) => state.screen);

  return screen === "pitch" ? <PitchHeader /> : <PlayerEditorHeader />;
};

export default Header;
