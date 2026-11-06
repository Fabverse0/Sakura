const panoramaImageBase = `${import.meta.env.BASE_URL}images/sakura-landscape-`;

export const panoramaWidths = [640, 960, 1280, 1536, 1920, 2880, 3840];

export const panoramaArt = `${panoramaImageBase}3840.jpg`;

export const panoramaArtSrcSet = panoramaWidths
  .map((width) => `${panoramaImageBase}${width}.jpg ${width}w`)
  .join(", ");

export function panoramaAt(width) {
  return `${panoramaImageBase}${width}.jpg`;
}

export const panoramaAlt =
  "Ilustrasi lanskap dengan maple merah, Gunung Fuji, matahari merah, pagoda, dan perahu di danau.";
