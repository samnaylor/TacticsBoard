import { version } from "../data";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-40 border-t border-white/10 px-4 py-4 text-center text-[10px] text-white/35">
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
    </footer>
  );
};

export default Footer;
