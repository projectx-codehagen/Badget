export async function getFonts() {
  const calSansBoldFont = fetch(
    new URL("../../assets/fonts/CalSans-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const interFont = fetch(
    new URL("../../assets/fonts/Inter-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const calSansFontData = await calSansBoldFont;
  const interFontData = await interFont;
  return { calSansFontData, interFontData };
}
