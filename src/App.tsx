import Pitch from "./components/Pitch";
import PlayerEditor from "./components/PlayerEditor";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useTacticsState } from "./store/state";
import { useEffect } from "react";
import { decodeSharedState } from "./utils";
import Toast from "./components/Toast";
import LoadSquadModal from "./components/LoadSquadModal";
import EditPlayerModal from "./components/EditPlayerModal";
import SaveSquadModal from "./components/SaveSquadModal";
import NewSquadModal from "./components/NewSquadModal";

const App = () => {
  const screen = useTacticsState((state) => state.screen);
  const squadDialog = useTacticsState((state) => state.squadDialog);
  const editingPlayer = useTacticsState(
    (state) => state.playerInteraction.type === "editing",
  );
  const toasts = useTacticsState((state) => state.toasts);
  const removeToast = useTacticsState((state) => state.removeToast);

  useEffect(() => {
    const url = new URL(window.location.href);
    const encoded = url.searchParams.get("share");

    if (!encoded) {
      return;
    }

    try {
      const sharedState = decodeSharedState(encoded);
      useTacticsState.getState().loadSharedState(sharedState);

      url.searchParams.delete("share");
      window.history.replaceState({}, "", url);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0d1b14] text-[#f1faf0]">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col">
        {screen === "pitch" ? <Pitch /> : <PlayerEditor />}
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <Toast {...toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>

      {squadDialog === "load" && <LoadSquadModal />}
      {squadDialog === "new" && <NewSquadModal />}
      {squadDialog === "save" && <SaveSquadModal />}
      {editingPlayer && <EditPlayerModal />}

      <Footer />
    </div>
  );
};

export default App;
