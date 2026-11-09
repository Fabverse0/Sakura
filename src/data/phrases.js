/**
 * Phrase bank for the haiku composer. Every phrase describes something visible
 * in the painting. `syllables` are counted by hand (Indonesian) so each column
 * keeps the 5-7-5 shape.
 */
export const phrases = {
  first: [
    { id: "f1", text: "Daun merah gugur", syllables: 5 },
    { id: "f2", text: "Fuji diam pagi", syllables: 5 },
    { id: "f3", text: "Perahu kecil", syllables: 5 },
    { id: "f4", text: "Kabut di gunung", syllables: 5 },
    { id: "f5", text: "Atap pagoda", syllables: 5 },
  ],
  second: [
    { id: "s1", text: "menyentuh air yang tenang", syllables: 7 },
    { id: "s2", text: "matahari merah menggantung", syllables: 7 },
    { id: "s3", text: "bayangnya gemetar di danau", syllables: 7 },
    { id: "s4", text: "ranting condong ke permukaan", syllables: 7 },
    { id: "s5", text: "burung-burung jauh melintas", syllables: 7 },
  ],
  third: [
    { id: "t1", text: "aku ikut diam", syllables: 5 },
    { id: "t2", text: "angin menunggu", syllables: 5 },
    { id: "t3", text: "senja pun lambat", syllables: 5 },
    { id: "t4", text: "air memantulkan", syllables: 5 },
    { id: "t5", text: "langit tak bersuara", syllables: 5 },
  ],
};

export const lineKeys = ["first", "second", "third"];
export const lineTargets = { first: 5, second: 7, third: 5 };
