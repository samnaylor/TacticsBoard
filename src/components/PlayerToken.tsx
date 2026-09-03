import { forwardRef, type HTMLAttributes } from "react";
import { kitColours } from "../data";
import type { ColourScheme, Position } from "../types";

interface PlayerTokenProps extends HTMLAttributes<HTMLDivElement> {
  number: number;
  label: string;
  colourScheme: ColourScheme;
  selected: boolean;
  position?: Position;
}

const PlayerToken = forwardRef<HTMLDivElement, PlayerTokenProps>(
  (
    {
      number,
      label,
      colourScheme,
      selected,
      position,
      className = "",
      style,
      ...divProps
    },
    ref,
  ) => (
    <div
      ref={ref}
      {...divProps}
      className={[
        "group touch-none select-none flex items-center justify-center flex-col",
        position
          ? "absolute z-10 -translate-x-1/2 -translate-y-1/2"
          : "relative flex shrink-0 flex-col items-center",
        selected ? "ring-4 ring-white/30 rounded-md" : "",
        className,
      ].join(" ")}

      style={{
        ...(position
          ? { left: `${position.x}%`, top: `${position.y}%` }
          : undefined),
        ...style,
      }}
    >
      <div
        className={[
          "relative flex cursor-grab items-center justify-center",
          "rounded-full border-2",
          "font-bold text-white shadow-[0_3px_10px_rgba(0,0,0,.35)]",
          "transition-transform active:scale-95",
          "h-10 w-10 text-sm sm:h-11 sm:w-11 sm:text-base",
        ].join(" ")}

        style={{
          backgroundColor: kitColours[colourScheme].main,
          borderColor: kitColours[colourScheme].border,
        }}
      >
        {number}
      </div>

      <div className="mt-1 max-w-24 truncate rounded-md bg-black/10 px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-white shadow-sm sm:max-w-28 sm:text-[12px]">
        {label}
      </div>
    </div>
  ),
);

export default PlayerToken;
