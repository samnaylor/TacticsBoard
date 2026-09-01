const PitchMarkings = () => {
  return (
    <svg
      viewBox="0 0 100 150"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <rect
          key={index}
          x="2"
          y={2 + index * 14.6}
          width="96"
          height="14.6"
          fill={index % 2 === 0 ? "#2b694d" : "#245c44"}
          opacity="0.38"
        />
      ))}

      <rect
        x="2"
        y="2"
        width="96"
        height="146"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <line
        x1="2"
        y1="75"
        x2="98"
        y2="75"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <circle
        cx="50"
        cy="75"
        r="12"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <circle cx="50" cy="75" r="0.8" fill="#eef7f0" fillOpacity="0.7" />

      <rect
        x="22"
        y="2"
        width="56"
        height="20"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <rect
        x="36"
        y="2"
        width="28"
        height="8"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <rect
        x="22"
        y="128"
        width="56"
        height="20"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <rect
        x="36"
        y="140"
        width="28"
        height="8"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <path
        d="M 40 22 A 10 10 0 0 0 60 22"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />

      <path
        d="M 40 128 A 10 10 0 0 1 60 128"
        fill="none"
        stroke="#eef7f0"
        strokeOpacity="0.65"
        strokeWidth="0.6"
      />
    </svg>
  );
};

export default PitchMarkings;
