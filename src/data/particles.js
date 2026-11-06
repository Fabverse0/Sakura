export function createPetals(count = 12) {
  return Array.from({ length: count }, (_, index) => ({
    left: `${(index * 29 + 7) % 100}%`,
    size: 0.7 + ((index * 37) % 60) / 100,
    duration: `${14 + ((index * 13) % 10)}s`,
    delay: `${-((index * 7) % 18)}s`,
    tone: ["var(--maple)", "var(--maple-rule)", "var(--ivory)", "var(--maple-hover)"][index % 4],
    drift: `${(index % 2 === 0 ? 1 : -1) * (40 + ((index * 17) % 80))}px`,
  }));
}
