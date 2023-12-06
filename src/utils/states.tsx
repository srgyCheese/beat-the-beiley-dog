export const beileyStates = [
  {
    calm: '/assets/beiley1/calm.png',
    beated: '/assets/beiley1/beated.png',
    BeatZone: ({onMouseDown}: {onMouseDown?: React.MouseEventHandler}) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -10 30 20">
        <path onMouseDown={onMouseDown} d="M -4.425 0.399 C -4.4744 -1.2244 -3.9972 -1.7522 -2.2765 -2.2346 L -0.96 -2.28 C -0.1067 -2.0667 0.96 -2.28 1.5584 -1.8973 C 1.761 1.37 2.88 0.28 3.0752 7.3942 T -0.5907 7.8365 L -3.5194 7.1414 C -5.857 4.499 -4.3622 3.5382 -3.7299 1.9581" fill="transparent" />
      </svg>
    )
  }
]