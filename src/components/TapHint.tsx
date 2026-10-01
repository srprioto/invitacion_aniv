export default function TapHint() {
  return (
    <div className="tap-hint" role="img" aria-label="Toca aquí">
      <svg
        className="tap-hint__svg"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Círculo que parpadea en el centro */}
        <circle
          className="tap-hint__pulse"
          cx="32"
          cy="32"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          className="tap-hint__pulse tap-hint__pulse--delay"
          cx="32"
          cy="32"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Dedo señalando */}
        <g
          className="tap-hint__finger"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Índice */}
          <path d="M28 34V18a3 3 0 0 1 6 0v13" />
          {/* Nudillo / palma */}
          <path d="M34 31h4a3 3 0 0 1 3 3v1h3a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v4a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8v-6" />
        </g>
      </svg>
    </div>
  );
}