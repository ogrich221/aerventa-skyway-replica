import ny from "@/assets/dest-new-york.jpg";
import la from "@/assets/dest-los-angeles.jpg";
import mia from "@/assets/dest-miami.jpg";
import lon from "@/assets/dest-london.jpg";
import par from "@/assets/dest-paris.jpg";
import dxb from "@/assets/dest-dubai.jpg";
import tyo from "@/assets/dest-tokyo.jpg";
import sin from "@/assets/dest-singapore.jpg";
import yyz from "@/assets/dest-toronto.jpg";
import syd from "@/assets/dest-sydney.jpg";
import rom from "@/assets/dest-rome.jpg";
import mad from "@/assets/dest-madrid.jpg";

export const POPULAR = [
  { city: "New York", country: "United States", iata: "JFK", img: ny, from: "LAX" },
  { city: "Los Angeles", country: "United States", iata: "LAX", img: la, from: "JFK" },
  { city: "Miami", country: "United States", iata: "MIA", img: mia, from: "ORD" },
  { city: "London", country: "United Kingdom", iata: "LHR", img: lon, from: "JFK" },
  { city: "Paris", country: "France", iata: "CDG", img: par, from: "JFK" },
  { city: "Dubai", country: "United Arab Emirates", iata: "DXB", img: dxb, from: "JFK" },
  { city: "Tokyo", country: "Japan", iata: "HND", img: tyo, from: "LAX" },
  { city: "Singapore", country: "Singapore", iata: "SIN", img: sin, from: "SFO" },
  { city: "Toronto", country: "Canada", iata: "YYZ", img: yyz, from: "JFK" },
  { city: "Sydney", country: "Australia", iata: "SYD", img: syd, from: "LAX" },
  { city: "Rome", country: "Italy", iata: "FCO", img: rom, from: "JFK" },
  { city: "Madrid", country: "Spain", iata: "MAD", img: mad, from: "MIA" },
];

export const ROUTES = [
  { from: "JFK", to: "LHR", fromCity: "New York", toCity: "London", img: lon },
  { from: "LAX", to: "HND", fromCity: "Los Angeles", toCity: "Tokyo", img: tyo },
  { from: "MIA", to: "CDG", fromCity: "Miami", toCity: "Paris", img: par },
  { from: "ORD", to: "DXB", fromCity: "Chicago", toCity: "Dubai", img: dxb },
  { from: "IAH", to: "YYZ", fromCity: "Houston", toCity: "Toronto", img: yyz },
  { from: "BOS", to: "SIN", fromCity: "Boston", toCity: "Singapore", img: sin },
  { from: "SFO", to: "SYD", fromCity: "San Francisco", toCity: "Sydney", img: syd },
  { from: "DFW", to: "FCO", fromCity: "Dallas", toCity: "Rome", img: rom },
];

export const defaultDate = (offsetDays = 21) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};
