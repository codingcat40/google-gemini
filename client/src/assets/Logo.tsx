
const Logo = () => {
  return (
    <svg
  width="100%"
  height="100%"
  viewBox="0 0 1600 900"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid slice"
>
  <defs>
    <radialGradient id="bgGradient" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0b1220" />
      <stop offset="100%" stop-color="#02040a" />
    </radialGradient>

    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bgGradient)" />

  <g opacity="0.8">
    <circle cx="200" cy="120" r="1.2" fill="#7aa2ff"/>
    <circle cx="480" cy="300" r="1" fill="#9cc7ff"/>
    <circle cx="900" cy="180" r="1.4" fill="#6f8cff"/>
    <circle cx="1200" cy="420" r="1" fill="#88aaff"/>
    <circle cx="1450" cy="200" r="1.3" fill="#9db7ff"/>
    <circle cx="300" cy="600" r="1" fill="#6fa3ff"/>
    <circle cx="700" cy="720" r="1.2" fill="#8bb6ff"/>
    <circle cx="1100" cy="650" r="1" fill="#7d9fff"/>
  </g>

  <g filter="url(#softGlow)" opacity="0.9">
    <path
      d="M0 620 C 300 560, 600 700, 900 640 S 1300 600, 1600 680"
      fill="none"
      stroke="#3b82f6"
      stroke-width="1.2"
      stroke-dasharray="2 10"
    />

    <path
      d="M0 660 C 320 610, 650 760, 1000 700 S 1350 660, 1600 740"
      fill="none"
      stroke="#60a5fa"
      stroke-width="1"
      stroke-dasharray="1 12"
      opacity="0.7"
    />

    <path
      d="M0 700 C 350 660, 700 820, 1100 760 S 1400 720, 1600 800"
      fill="none"
      stroke="#93c5fd"
      stroke-width="0.8"
      stroke-dasharray="1 14"
      opacity="0.5"
    />
  </g>
</svg>

  )
}

export default Logo