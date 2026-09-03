import { version } from "../data";

const AppCredits = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <span>© Sam Naylor</span>

      <span className="text-white/15">•</span>

      <a
        href="https://github.com/samnaylor/TacticsBoard"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-white/70"
      >
        GitHub
      </a>

      <span className="text-white/15">•</span>

      <span>v{version}</span>
    </div>
  );
};

export default AppCredits;
