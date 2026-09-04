import { toPng } from "html-to-image";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import type { SharedState } from "./store/sharedState";
import { useTacticsState, type State } from "./store/state";

export const playerLabel = (slot: number) => `Player ${slot + 1}`;

export const exportPng = async () => {
  const node = document.getElementById("formation-export");

  if (!node) return;

  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    backgroundColor: "#1e4d3a",
    filter: (element) => {
      if (!(element instanceof Element)) {
        return true;
      }

      return !element.hasAttribute("data-export-ignore");
    },
  });

  const link = document.createElement("a");
  const title =
    (document.getElementById("squad-title") as HTMLInputElement).value ||
    "football-squad";

  link.download = `${title}.png`;
  link.href = dataUrl;

  link.click();
};

export const encodeSharedState = (state: SharedState) =>
  compressToEncodedURIComponent(JSON.stringify(state));

export const decodeSharedState = (encoded: string): SharedState =>
  JSON.parse(decompressFromEncodedURIComponent(encoded));

export const createShareUrl = (state: State) => {
  const sharedState: SharedState = {
    formation: state.formation,
    customNames: state.customNames,
    customPositions: state.customPositions,
    benchCount: state.benchCount,
  };

  const url = new URL(window.location.href);
  url.searchParams.set("share", encodeSharedState(sharedState));

  return url.toString();
};

export const shareFormation = () => {
  const url = createShareUrl(useTacticsState.getState());
  navigator.clipboard.writeText(url);
  useTacticsState.getState().addToast("Copied share URL to clipboard", 2500);
};
