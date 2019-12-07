const uuid = require("uuid/v3");

const createSong = (name: string, description: string, isNew: boolean) => {
  return {
    id: uuid(name, uuid.DNS),
    name,
    isNew,
    description,
    votes: {}
  };
};
export const songs = [
  //createSong("1177", "", true),
  //createSong("Blå skärm", "", true),
  //createSong("Ohm", "", true),
  //createSong("Tommy spelar in mig(koooort)!", "", true),
  createSong("Teknologens bön", "", true),
  createSong("git commit --amend", "", true),
  createSong("Tester - inte klar :(", "", false),
  createSong(
    "För har ett didIT-gäng en enda gång - (old, but never framförd)",
    "",
    false
  ),
  createSong("Fångad i en while-loop - Klassiker från 2013", "", false),
  createSong("Knacka massa kod - Klassiker  från 2013", "", false),
  createSong("Rolf och Roger - Klassiker från 2013", "", false),
  createSong("NullPointerException - Klassiker från 2013", "", false),
  createSong("Servern går ner - klassiker från 2014", "", false),
  createSong("Sunfleet - klassiker från 2014", "", false),
  createSong("Cat 5e - klassiker från 2015", "", false),
  createSong("Kod & Vin - klassiker från 2016", "", false),
  createSong("Datakrisen en musikal - HELA", "", false),
  createSong("Datakrisen #1 - Integrationsdebattle", "", false),
  createSong("Datakrisen #2 - Patetflyktingvals", "", false),
  createSong("Datakrisen #3 - Min rad kod", "", false),
  createSong("Datakrisen #4 - Den där builden", "", false),
  createSong("Datakrisen #5 - Hela servern skramlar", "", false),
  createSong("Datakrisen #6 - Systemkollaps", "", false),
  createSong("Datakrisen #7 - Datalagringens spöke", "", false),
  createSong("Datakrisen #8 - Ndushis tårar", "", false),
  createSong("Datakrisen #9 - Vända hoodien efter vinden", "", false)
];
