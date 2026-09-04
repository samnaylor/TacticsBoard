import { toPng } from "html-to-image";

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
