const uuid = require("uuid/v3");

const createSong = (name: string, description: string) => {
  return {
    id: uuid(name, uuid.DNS),
    name,
    description,
    votes: {}
  };
};
export const songs = [
  createSong("1177 - NYHET!", ""),
  createSong("Skärmen är olidligt blå - NYHET!", ""),
  createSong("Ohm - NYHET!", ""),
  createSong("Tommy spelar in mig - NYHET (koooort)!", ""),
  createSong("Någons bön - NYHET!", ""),
  createSong("git commit --amend - NYHET!", ""),
  createSong("Tester - inte klar :(", ""),
  createSong(
    "För har ett IT-gäng en enda gång - (old, but never framförd)",
    ""
  ),
  createSong("Fångad i en while loop - Klassiker från 2013", ""),
  createSong("Knacka massa kod - Klassiker  från 2013", ""),
  createSong("Rolf och Roger - Klassiker från 2013", ""),
  createSong("NullPointerException - Klassiker från 2013", ""),
  createSong("Servern går ner - klassiker från 2014", ""),
  createSong("Sunfleet - klassiker från 2014", ""),
  createSong("Cat 5e - klassiker från 2015", ""),
  createSong("Kod & Vin - klassiker från 2016", ""),
  createSong("Datakrisen en musikal - HELA", ""),
  createSong("Datakrisen #1 - Integrationsdebattle", ""),
  createSong("Datakrisen #2 - Patetflyktingvals", ""),
  createSong("Datakrisen #3 - Min rad kod", ""),
  createSong("Datakrisen #4 - Den där builden", ""),
  createSong("Datakrisen #5 - Hela servern skramlar", ""),
  createSong("Datakrisen #6 - Systemkollaps", ""),
  createSong("Datakrisen #7 - Datalagringens spöke", ""),
  createSong("Datakrisen #8 - Ndushis tårar", ""),
  createSong("Datakrisen #9 - Vända hoodien efter vinden", "")
];
