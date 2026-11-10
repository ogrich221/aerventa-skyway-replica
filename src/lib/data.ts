// AERVANTA reference + demonstration data.
// All fares are DEMONSTRATION values generated deterministically until a real flight API is connected.

export type Region = "North America" | "South America" | "Europe" | "Asia" | "Middle East" | "Oceania";

export interface Country {
  name: string;
  code: string;
  region: Region;
  hub: string; // main city
  iata: string;
  lat: number;
  lon: number;
}

export const COUNTRIES: Country[] = [
  // North America
  { name: "United States", code: "US", region: "North America", hub: "New York", iata: "JFK", lat: 40.6, lon: -73.8 },
  { name: "Canada", code: "CA", region: "North America", hub: "Toronto", iata: "YYZ", lat: 43.7, lon: -79.6 },
  { name: "Mexico", code: "MX", region: "North America", hub: "Mexico City", iata: "MEX", lat: 19.4, lon: -99.1 },
  { name: "Costa Rica", code: "CR", region: "North America", hub: "San José", iata: "SJO", lat: 10.0, lon: -84.2 },
  { name: "Panama", code: "PA", region: "North America", hub: "Panama City", iata: "PTY", lat: 9.1, lon: -79.4 },
  { name: "Guatemala", code: "GT", region: "North America", hub: "Guatemala City", iata: "GUA", lat: 14.6, lon: -90.5 },
  { name: "Jamaica", code: "JM", region: "North America", hub: "Montego Bay", iata: "MBJ", lat: 18.5, lon: -77.9 },
  { name: "Bahamas", code: "BS", region: "North America", hub: "Nassau", iata: "NAS", lat: 25.0, lon: -77.5 },
  { name: "Dominican Republic", code: "DO", region: "North America", hub: "Punta Cana", iata: "PUJ", lat: 18.6, lon: -68.4 },
  { name: "Barbados", code: "BB", region: "North America", hub: "Bridgetown", iata: "BGI", lat: 13.1, lon: -59.5 },
  { name: "Belize", code: "BZ", region: "North America", hub: "Belize City", iata: "BZE", lat: 17.5, lon: -88.3 },
  { name: "Honduras", code: "HN", region: "North America", hub: "Roatán", iata: "RTB", lat: 16.3, lon: -86.5 },
  { name: "Trinidad and Tobago", code: "TT", region: "North America", hub: "Port of Spain", iata: "POS", lat: 10.6, lon: -61.3 },
  // South America
  { name: "Brazil", code: "BR", region: "South America", hub: "São Paulo", iata: "GRU", lat: -23.4, lon: -46.5 },
  { name: "Argentina", code: "AR", region: "South America", hub: "Buenos Aires", iata: "EZE", lat: -34.8, lon: -58.5 },
  { name: "Chile", code: "CL", region: "South America", hub: "Santiago", iata: "SCL", lat: -33.4, lon: -70.8 },
  { name: "Peru", code: "PE", region: "South America", hub: "Lima", iata: "LIM", lat: -12.0, lon: -77.1 },
  { name: "Colombia", code: "CO", region: "South America", hub: "Bogotá", iata: "BOG", lat: 4.7, lon: -74.1 },
  { name: "Ecuador", code: "EC", region: "South America", hub: "Quito", iata: "UIO", lat: -0.1, lon: -78.4 },
  { name: "Uruguay", code: "UY", region: "South America", hub: "Montevideo", iata: "MVD", lat: -34.8, lon: -56.0 },
  { name: "Paraguay", code: "PY", region: "South America", hub: "Asunción", iata: "ASU", lat: -25.2, lon: -57.5 },
  { name: "Bolivia", code: "BO", region: "South America", hub: "La Paz", iata: "LPB", lat: -16.5, lon: -68.2 },
  { name: "Venezuela", code: "VE", region: "South America", hub: "Caracas", iata: "CCS", lat: 10.6, lon: -67.0 },
  // Europe
  { name: "United Kingdom", code: "GB", region: "Europe", hub: "London", iata: "LHR", lat: 51.5, lon: -0.5 },
  { name: "France", code: "FR", region: "Europe", hub: "Paris", iata: "CDG", lat: 49.0, lon: 2.5 },
  { name: "Germany", code: "DE", region: "Europe", hub: "Frankfurt", iata: "FRA", lat: 50.0, lon: 8.6 },
  { name: "Italy", code: "IT", region: "Europe", hub: "Rome", iata: "FCO", lat: 41.8, lon: 12.2 },
  { name: "Spain", code: "ES", region: "Europe", hub: "Madrid", iata: "MAD", lat: 40.5, lon: -3.6 },
  { name: "Portugal", code: "PT", region: "Europe", hub: "Lisbon", iata: "LIS", lat: 38.8, lon: -9.1 },
  { name: "Netherlands", code: "NL", region: "Europe", hub: "Amsterdam", iata: "AMS", lat: 52.3, lon: 4.8 },
  { name: "Belgium", code: "BE", region: "Europe", hub: "Brussels", iata: "BRU", lat: 50.9, lon: 4.5 },
  { name: "Switzerland", code: "CH", region: "Europe", hub: "Zurich", iata: "ZRH", lat: 47.5, lon: 8.6 },
  { name: "Austria", code: "AT", region: "Europe", hub: "Vienna", iata: "VIE", lat: 48.1, lon: 16.6 },
  { name: "Ireland", code: "IE", region: "Europe", hub: "Dublin", iata: "DUB", lat: 53.4, lon: -6.3 },
  { name: "Greece", code: "GR", region: "Europe", hub: "Athens", iata: "ATH", lat: 37.9, lon: 23.9 },
  { name: "Turkey", code: "TR", region: "Europe", hub: "Istanbul", iata: "IST", lat: 41.3, lon: 28.7 },
  { name: "Sweden", code: "SE", region: "Europe", hub: "Stockholm", iata: "ARN", lat: 59.7, lon: 17.9 },
  { name: "Norway", code: "NO", region: "Europe", hub: "Oslo", iata: "OSL", lat: 60.2, lon: 11.1 },
  { name: "Denmark", code: "DK", region: "Europe", hub: "Copenhagen", iata: "CPH", lat: 55.6, lon: 12.6 },
  { name: "Finland", code: "FI", region: "Europe", hub: "Helsinki", iata: "HEL", lat: 60.3, lon: 24.9 },
  { name: "Iceland", code: "IS", region: "Europe", hub: "Reykjavík", iata: "KEF", lat: 64.0, lon: -22.6 },
  { name: "Poland", code: "PL", region: "Europe", hub: "Warsaw", iata: "WAW", lat: 52.2, lon: 21.0 },
  { name: "Czech Republic", code: "CZ", region: "Europe", hub: "Prague", iata: "PRG", lat: 50.1, lon: 14.3 },
  { name: "Hungary", code: "HU", region: "Europe", hub: "Budapest", iata: "BUD", lat: 47.4, lon: 19.3 },
  { name: "Croatia", code: "HR", region: "Europe", hub: "Dubrovnik", iata: "DBV", lat: 42.6, lon: 18.3 },
  { name: "Romania", code: "RO", region: "Europe", hub: "Bucharest", iata: "OTP", lat: 44.6, lon: 26.1 },
  { name: "Malta", code: "MT", region: "Europe", hub: "Valletta", iata: "MLA", lat: 35.9, lon: 14.5 },
  { name: "Cyprus", code: "CY", region: "Europe", hub: "Larnaca", iata: "LCA", lat: 34.9, lon: 33.6 },
  { name: "Luxembourg", code: "LU", region: "Europe", hub: "Luxembourg", iata: "LUX", lat: 49.6, lon: 6.2 },
  { name: "Estonia", code: "EE", region: "Europe", hub: "Tallinn", iata: "TLL", lat: 59.4, lon: 24.8 },
  // Asia
  { name: "Japan", code: "JP", region: "Asia", hub: "Tokyo", iata: "HND", lat: 35.5, lon: 139.8 },
  { name: "South Korea", code: "KR", region: "Asia", hub: "Seoul", iata: "ICN", lat: 37.5, lon: 126.4 },
  { name: "China", code: "CN", region: "Asia", hub: "Shanghai", iata: "PVG", lat: 31.1, lon: 121.8 },
  { name: "Hong Kong", code: "HK", region: "Asia", hub: "Hong Kong", iata: "HKG", lat: 22.3, lon: 113.9 },
  { name: "Taiwan", code: "TW", region: "Asia", hub: "Taipei", iata: "TPE", lat: 25.1, lon: 121.2 },
  { name: "Singapore", code: "SG", region: "Asia", hub: "Singapore", iata: "SIN", lat: 1.4, lon: 104.0 },
  { name: "Thailand", code: "TH", region: "Asia", hub: "Bangkok", iata: "BKK", lat: 13.7, lon: 100.7 },
  { name: "Vietnam", code: "VN", region: "Asia", hub: "Ho Chi Minh City", iata: "SGN", lat: 10.8, lon: 106.7 },
  { name: "Malaysia", code: "MY", region: "Asia", hub: "Kuala Lumpur", iata: "KUL", lat: 2.7, lon: 101.7 },
  { name: "Indonesia", code: "ID", region: "Asia", hub: "Bali", iata: "DPS", lat: -8.7, lon: 115.2 },
  { name: "Philippines", code: "PH", region: "Asia", hub: "Manila", iata: "MNL", lat: 14.5, lon: 121.0 },
  { name: "India", code: "IN", region: "Asia", hub: "Delhi", iata: "DEL", lat: 28.6, lon: 77.1 },
  { name: "Sri Lanka", code: "LK", region: "Asia", hub: "Colombo", iata: "CMB", lat: 7.2, lon: 79.9 },
  { name: "Maldives", code: "MV", region: "Asia", hub: "Malé", iata: "MLE", lat: 4.2, lon: 73.5 },
  { name: "Nepal", code: "NP", region: "Asia", hub: "Kathmandu", iata: "KTM", lat: 27.7, lon: 85.4 },
  { name: "Cambodia", code: "KH", region: "Asia", hub: "Siem Reap", iata: "SAI", lat: 13.4, lon: 103.8 },
  { name: "Kazakhstan", code: "KZ", region: "Asia", hub: "Almaty", iata: "ALA", lat: 43.4, lon: 77.0 },
  { name: "Uzbekistan", code: "UZ", region: "Asia", hub: "Tashkent", iata: "TAS", lat: 41.3, lon: 69.3 },
  { name: "Mongolia", code: "MN", region: "Asia", hub: "Ulaanbaatar", iata: "UBN", lat: 47.6, lon: 106.8 },
  // Middle East
  { name: "United Arab Emirates", code: "AE", region: "Middle East", hub: "Dubai", iata: "DXB", lat: 25.3, lon: 55.4 },
  { name: "Qatar", code: "QA", region: "Middle East", hub: "Doha", iata: "DOH", lat: 25.3, lon: 51.6 },
  { name: "Saudi Arabia", code: "SA", region: "Middle East", hub: "Riyadh", iata: "RUH", lat: 24.9, lon: 46.7 },
  { name: "Oman", code: "OM", region: "Middle East", hub: "Muscat", iata: "MCT", lat: 23.6, lon: 58.3 },
  { name: "Bahrain", code: "BH", region: "Middle East", hub: "Manama", iata: "BAH", lat: 26.3, lon: 50.6 },
  { name: "Kuwait", code: "KW", region: "Middle East", hub: "Kuwait City", iata: "KWI", lat: 29.2, lon: 47.97 },
  { name: "Jordan", code: "JO", region: "Middle East", hub: "Amman", iata: "AMM", lat: 31.7, lon: 36.0 },
  { name: "Israel", code: "IL", region: "Middle East", hub: "Tel Aviv", iata: "TLV", lat: 32.0, lon: 34.9 },
  { name: "Lebanon", code: "LB", region: "Middle East", hub: "Beirut", iata: "BEY", lat: 33.8, lon: 35.5 },
  // Oceania
  { name: "Australia", code: "AU", region: "Oceania", hub: "Sydney", iata: "SYD", lat: -33.9, lon: 151.2 },
  { name: "New Zealand", code: "NZ", region: "Oceania", hub: "Auckland", iata: "AKL", lat: -37.0, lon: 174.8 },
  { name: "Fiji", code: "FJ", region: "Oceania", hub: "Nadi", iata: "NAN", lat: -17.8, lon: 177.4 },
  { name: "French Polynesia", code: "PF", region: "Oceania", hub: "Papeete", iata: "PPT", lat: -17.6, lon: -149.6 },
  { name: "Papua New Guinea", code: "PG", region: "Oceania", hub: "Port Moresby", iata: "POM", lat: -9.4, lon: 147.2 },
  { name: "Samoa", code: "WS", region: "Oceania", hub: "Apia", iata: "APW", lat: -13.8, lon: -171.8 },
  { name: "Vanuatu", code: "VU", region: "Oceania", hub: "Port Vila", iata: "VLI", lat: -17.7, lon: 168.3 },
  { name: "New Caledonia", code: "NC", region: "Oceania", hub: "Nouméa", iata: "NOU", lat: -22.0, lon: 166.2 },
];

export const REGIONS: Region[] = ["North America", "South America", "Europe", "Asia", "Middle East", "Oceania"];

export interface UsState {
  name: string;
  abbr: string;
  row: number;
  col: number;
  airports: { iata: string; city: string; name: string }[];
}

// Tile-grid layout (row, col) approximating US geography.
export const US_STATES: UsState[] = [
  { name: "Alaska", abbr: "AK", row: 0, col: 0, airports: [{ iata: "ANC", city: "Anchorage", name: "Ted Stevens Anchorage Intl" }, { iata: "FAI", city: "Fairbanks", name: "Fairbanks Intl" }] },
  { name: "Maine", abbr: "ME", row: 0, col: 11, airports: [{ iata: "PWM", city: "Portland", name: "Portland Intl Jetport" }, { iata: "BGR", city: "Bangor", name: "Bangor Intl" }] },
  { name: "Vermont", abbr: "VT", row: 1, col: 10, airports: [{ iata: "BTV", city: "Burlington", name: "Burlington Intl" }] },
  { name: "New Hampshire", abbr: "NH", row: 1, col: 11, airports: [{ iata: "MHT", city: "Manchester", name: "Manchester-Boston Regional" }] },
  { name: "Washington", abbr: "WA", row: 2, col: 1, airports: [{ iata: "SEA", city: "Seattle", name: "Seattle-Tacoma Intl" }, { iata: "GEG", city: "Spokane", name: "Spokane Intl" }] },
  { name: "Idaho", abbr: "ID", row: 2, col: 2, airports: [{ iata: "BOI", city: "Boise", name: "Boise Airport" }] },
  { name: "Montana", abbr: "MT", row: 2, col: 3, airports: [{ iata: "BZN", city: "Bozeman", name: "Bozeman Yellowstone Intl" }, { iata: "MSO", city: "Missoula", name: "Missoula Montana" }] },
  { name: "North Dakota", abbr: "ND", row: 2, col: 4, airports: [{ iata: "FAR", city: "Fargo", name: "Hector Intl" }] },
  { name: "Minnesota", abbr: "MN", row: 2, col: 5, airports: [{ iata: "MSP", city: "Minneapolis", name: "Minneapolis–Saint Paul Intl" }] },
  { name: "Wisconsin", abbr: "WI", row: 2, col: 6, airports: [{ iata: "MKE", city: "Milwaukee", name: "Milwaukee Mitchell Intl" }, { iata: "MSN", city: "Madison", name: "Dane County Regional" }] },
  { name: "Michigan", abbr: "MI", row: 2, col: 8, airports: [{ iata: "DTW", city: "Detroit", name: "Detroit Metropolitan" }, { iata: "GRR", city: "Grand Rapids", name: "Gerald R. Ford Intl" }] },
  { name: "New York", abbr: "NY", row: 2, col: 9, airports: [{ iata: "JFK", city: "New York", name: "John F. Kennedy Intl" }, { iata: "LGA", city: "New York", name: "LaGuardia" }, { iata: "BUF", city: "Buffalo", name: "Buffalo Niagara Intl" }] },
  { name: "Massachusetts", abbr: "MA", row: 2, col: 10, airports: [{ iata: "BOS", city: "Boston", name: "Logan Intl" }] },
  { name: "Rhode Island", abbr: "RI", row: 2, col: 11, airports: [{ iata: "PVD", city: "Providence", name: "Rhode Island T. F. Green Intl" }] },
  { name: "Oregon", abbr: "OR", row: 3, col: 1, airports: [{ iata: "PDX", city: "Portland", name: "Portland Intl" }] },
  { name: "Nevada", abbr: "NV", row: 3, col: 2, airports: [{ iata: "LAS", city: "Las Vegas", name: "Harry Reid Intl" }, { iata: "RNO", city: "Reno", name: "Reno-Tahoe Intl" }] },
  { name: "Wyoming", abbr: "WY", row: 3, col: 3, airports: [{ iata: "JAC", city: "Jackson", name: "Jackson Hole Airport" }] },
  { name: "South Dakota", abbr: "SD", row: 3, col: 4, airports: [{ iata: "FSD", city: "Sioux Falls", name: "Sioux Falls Regional" }] },
  { name: "Iowa", abbr: "IA", row: 3, col: 5, airports: [{ iata: "DSM", city: "Des Moines", name: "Des Moines Intl" }] },
  { name: "Illinois", abbr: "IL", row: 3, col: 6, airports: [{ iata: "ORD", city: "Chicago", name: "O'Hare Intl" }, { iata: "MDW", city: "Chicago", name: "Midway Intl" }] },
  { name: "Indiana", abbr: "IN", row: 3, col: 7, airports: [{ iata: "IND", city: "Indianapolis", name: "Indianapolis Intl" }] },
  { name: "Ohio", abbr: "OH", row: 3, col: 8, airports: [{ iata: "CLE", city: "Cleveland", name: "Cleveland Hopkins Intl" }, { iata: "CMH", city: "Columbus", name: "John Glenn Columbus Intl" }] },
  { name: "Pennsylvania", abbr: "PA", row: 3, col: 9, airports: [{ iata: "PHL", city: "Philadelphia", name: "Philadelphia Intl" }, { iata: "PIT", city: "Pittsburgh", name: "Pittsburgh Intl" }] },
  { name: "New Jersey", abbr: "NJ", row: 3, col: 10, airports: [{ iata: "EWR", city: "Newark", name: "Newark Liberty Intl" }] },
  { name: "Connecticut", abbr: "CT", row: 3, col: 11, airports: [{ iata: "BDL", city: "Hartford", name: "Bradley Intl" }] },
  { name: "California", abbr: "CA", row: 4, col: 1, airports: [{ iata: "LAX", city: "Los Angeles", name: "Los Angeles Intl" }, { iata: "SFO", city: "San Francisco", name: "San Francisco Intl" }, { iata: "SAN", city: "San Diego", name: "San Diego Intl" }] },
  { name: "Utah", abbr: "UT", row: 4, col: 2, airports: [{ iata: "SLC", city: "Salt Lake City", name: "Salt Lake City Intl" }] },
  { name: "Colorado", abbr: "CO", row: 4, col: 3, airports: [{ iata: "DEN", city: "Denver", name: "Denver Intl" }, { iata: "ASE", city: "Aspen", name: "Aspen/Pitkin County" }] },
  { name: "Nebraska", abbr: "NE", row: 4, col: 4, airports: [{ iata: "OMA", city: "Omaha", name: "Eppley Airfield" }] },
  { name: "Missouri", abbr: "MO", row: 4, col: 5, airports: [{ iata: "STL", city: "St. Louis", name: "St. Louis Lambert Intl" }, { iata: "MCI", city: "Kansas City", name: "Kansas City Intl" }] },
  { name: "Kentucky", abbr: "KY", row: 4, col: 6, airports: [{ iata: "SDF", city: "Louisville", name: "Louisville Muhammad Ali Intl" }] },
  { name: "West Virginia", abbr: "WV", row: 4, col: 7, airports: [{ iata: "CRW", city: "Charleston", name: "Yeager Airport" }] },
  { name: "Virginia", abbr: "VA", row: 4, col: 8, airports: [{ iata: "IAD", city: "Washington", name: "Washington Dulles Intl" }, { iata: "DCA", city: "Arlington", name: "Reagan National" }] },
  { name: "Maryland", abbr: "MD", row: 4, col: 9, airports: [{ iata: "BWI", city: "Baltimore", name: "Baltimore/Washington Intl" }] },
  { name: "Delaware", abbr: "DE", row: 4, col: 10, airports: [{ iata: "ILG", city: "Wilmington", name: "Wilmington Airport" }] },
  { name: "Arizona", abbr: "AZ", row: 5, col: 2, airports: [{ iata: "PHX", city: "Phoenix", name: "Phoenix Sky Harbor Intl" }, { iata: "TUS", city: "Tucson", name: "Tucson Intl" }] },
  { name: "New Mexico", abbr: "NM", row: 5, col: 3, airports: [{ iata: "ABQ", city: "Albuquerque", name: "Albuquerque Intl Sunport" }] },
  { name: "Kansas", abbr: "KS", row: 5, col: 4, airports: [{ iata: "ICT", city: "Wichita", name: "Wichita Eisenhower" }] },
  { name: "Arkansas", abbr: "AR", row: 5, col: 5, airports: [{ iata: "LIT", city: "Little Rock", name: "Clinton National" }] },
  { name: "Tennessee", abbr: "TN", row: 5, col: 6, airports: [{ iata: "BNA", city: "Nashville", name: "Nashville Intl" }, { iata: "MEM", city: "Memphis", name: "Memphis Intl" }] },
  { name: "North Carolina", abbr: "NC", row: 5, col: 7, airports: [{ iata: "CLT", city: "Charlotte", name: "Charlotte Douglas Intl" }, { iata: "RDU", city: "Raleigh", name: "Raleigh-Durham Intl" }] },
  { name: "South Carolina", abbr: "SC", row: 5, col: 8, airports: [{ iata: "CHS", city: "Charleston", name: "Charleston Intl" }] },
  { name: "Hawaii", abbr: "HI", row: 6, col: 0, airports: [{ iata: "HNL", city: "Honolulu", name: "Daniel K. Inouye Intl" }, { iata: "OGG", city: "Kahului", name: "Kahului Airport" }] },
  { name: "Oklahoma", abbr: "OK", row: 6, col: 4, airports: [{ iata: "OKC", city: "Oklahoma City", name: "Will Rogers World" }] },
  { name: "Louisiana", abbr: "LA", row: 6, col: 5, airports: [{ iata: "MSY", city: "New Orleans", name: "Louis Armstrong New Orleans Intl" }] },
  { name: "Mississippi", abbr: "MS", row: 6, col: 6, airports: [{ iata: "JAN", city: "Jackson", name: "Jackson–Medgar Evers Intl" }] },
  { name: "Alabama", abbr: "AL", row: 6, col: 7, airports: [{ iata: "BHM", city: "Birmingham", name: "Birmingham–Shuttlesworth Intl" }] },
  { name: "Georgia", abbr: "GA", row: 6, col: 8, airports: [{ iata: "ATL", city: "Atlanta", name: "Hartsfield–Jackson Atlanta Intl" }, { iata: "SAV", city: "Savannah", name: "Savannah/Hilton Head Intl" }] },
  { name: "Texas", abbr: "TX", row: 7, col: 4, airports: [{ iata: "DFW", city: "Dallas", name: "Dallas/Fort Worth Intl" }, { iata: "IAH", city: "Houston", name: "George Bush Intercontinental" }, { iata: "AUS", city: "Austin", name: "Austin–Bergstrom Intl" }] },
  { name: "Florida", abbr: "FL", row: 7, col: 9, airports: [{ iata: "MIA", city: "Miami", name: "Miami Intl" }, { iata: "MCO", city: "Orlando", name: "Orlando Intl" }, { iata: "TPA", city: "Tampa", name: "Tampa Intl" }] },
];

export interface Airport { iata: string; city: string; country: string; label: string }

export const AIRPORTS: Airport[] = (() => {
  const map = new Map<string, Airport>();
  for (const s of US_STATES)
    for (const a of s.airports)
      map.set(a.iata, { iata: a.iata, city: a.city, country: "United States", label: `${a.city} (${a.iata}) · ${a.name}` });
  for (const c of COUNTRIES)
    if (!map.has(c.iata)) map.set(c.iata, { iata: c.iata, city: c.hub, country: c.name, label: `${c.hub} (${c.iata}) · ${c.name}` });
  return [...map.values()].sort((a, b) => a.city.localeCompare(b.city));
})();

export const findAirport = (iata: string) => AIRPORTS.find((a) => a.iata === iata);

// Approximate coordinates for distance-based demo pricing.
const COORDS: Record<string, [number, number]> = Object.fromEntries(COUNTRIES.map((c) => [c.iata, [c.lat, c.lon]]));
const US_COORDS: Record<string, [number, number]> = {
  ANC: [61.2, -150], FAI: [64.8, -147.9], PWM: [43.6, -70.3], BGR: [44.8, -68.8], BTV: [44.5, -73.2], MHT: [42.9, -71.4],
  SEA: [47.4, -122.3], GEG: [47.6, -117.5], BOI: [43.6, -116.2], BZN: [45.8, -111.2], MSO: [46.9, -114.1], FAR: [46.9, -96.8],
  MSP: [44.9, -93.2], MKE: [42.9, -87.9], MSN: [43.1, -89.3], DTW: [42.2, -83.4], GRR: [42.9, -85.5], JFK: [40.6, -73.8],
  LGA: [40.8, -73.9], BUF: [42.9, -78.7], BOS: [42.4, -71.0], PVD: [41.7, -71.4], PDX: [45.6, -122.6], LAS: [36.1, -115.2],
  RNO: [39.5, -119.8], JAC: [43.6, -110.7], FSD: [43.6, -96.7], DSM: [41.5, -93.7], ORD: [42.0, -87.9], MDW: [41.8, -87.8],
  IND: [39.7, -86.3], CLE: [41.4, -81.8], CMH: [40.0, -82.9], PHL: [39.9, -75.2], PIT: [40.5, -80.2], EWR: [40.7, -74.2],
  BDL: [41.9, -72.7], LAX: [33.9, -118.4], SFO: [37.6, -122.4], SAN: [32.7, -117.2], SLC: [40.8, -112.0], DEN: [39.9, -104.7],
  ASE: [39.2, -106.9], OMA: [41.3, -95.9], STL: [38.7, -90.4], MCI: [39.3, -94.7], SDF: [38.2, -85.7], CRW: [38.4, -81.6],
  IAD: [38.9, -77.5], DCA: [38.9, -77.0], BWI: [39.2, -76.7], ILG: [39.7, -75.6], PHX: [33.4, -112.0], TUS: [32.1, -110.9],
  ABQ: [35.0, -106.6], ICT: [37.6, -97.4], LIT: [34.7, -92.2], BNA: [36.1, -86.7], MEM: [35.0, -90.0], CLT: [35.2, -80.9],
  RDU: [35.9, -78.8], CHS: [32.9, -80.0], HNL: [21.3, -157.9], OGG: [20.9, -156.4], OKC: [35.4, -97.6], MSY: [30.0, -90.3],
  JAN: [32.3, -90.1], BHM: [33.6, -86.8], ATL: [33.6, -84.4], SAV: [32.1, -81.2], DFW: [32.9, -97.0], IAH: [30.0, -95.3],
  AUS: [30.2, -97.7], MIA: [25.8, -80.3], MCO: [28.4, -81.3], TPA: [27.98, -82.5],
};
const ALL_COORDS = { ...COORDS, ...US_COORDS };

export function distanceKm(a: string, b: string) {
  const p = ALL_COORDS[a], q = ALL_COORDS[b];
  if (!p || !q) return 3000;
  const R = 6371, toR = Math.PI / 180;
  const dLat = (q[0] - p[0]) * toR, dLon = (q[1] - p[1]) * toR;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(p[0] * toR) * Math.cos(q[0] * toR) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// ---------- Currency (demo indicative rates, USD base) ----------
export const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "CAD", symbol: "C$", rate: 1.37 },
  { code: "AUD", symbol: "A$", rate: 1.52 },
  { code: "JPY", symbol: "¥", rate: 151 },
  { code: "AED", symbol: "AED ", rate: 3.67 },
  { code: "SGD", symbol: "S$", rate: 1.35 },
] as const;
export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function formatPrice(usd: number, code: CurrencyCode) {
  const c = CURRENCIES.find((x) => x.code === code)!;
  const v = usd * c.rate;
  return `${c.symbol}${Math.round(v).toLocaleString("en-US")}`;
}

// ---------- Demo flight generation ----------
export const CABINS = ["Economy", "Premium Economy", "Business", "First"] as const;
export type Cabin = (typeof CABINS)[number];
const CABIN_MULT: Record<Cabin, number> = { Economy: 1, "Premium Economy": 1.7, Business: 3.6, First: 6.2 };

export const AIRLINES = [
  { code: "AV", name: "Aurelia Airways", hue: 250 },
  { code: "NX", name: "Northstar Air", hue: 200 },
  { code: "MR", name: "Meridian Global", hue: 30 },
  { code: "CP", name: "Coastline Pacific", hue: 170 },
  { code: "EL", name: "Elevate International", hue: 0 },
  { code: "SK", name: "Skyhaven", hue: 280 },
];

export interface Flight {
  id: string;
  airline: (typeof AIRLINES)[number];
  flightNo: string;
  from: string;
  to: string;
  depart: number; // minutes from midnight
  durationMin: number;
  stops: number;
  stopVia?: string;
  baggage: string;
  cabin: Cabin;
  priceUsd: number; // per passenger
  score: number;
}

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const VIA = ["LHR", "FRA", "DXB", "DOH", "IST", "AMS", "ORD", "ATL", "SIN", "HKG", "CDG", "DFW"];

export function generateFlights(from: string, to: string, date: string, cabin: Cabin): Flight[] {
  const r = rng(hash(`${from}-${to}-${date}`));
  const km = distanceKm(from, to);
  const baseMin = Math.max(55, Math.round((km / 820) * 60 + 30));
  const baseFare = 60 + km * 0.085;
  const out: Flight[] = [];
  const n = 10 + Math.floor(r() * 5);
  for (let i = 0; i < n; i++) {
    const airline = AIRLINES[Math.floor(r() * AIRLINES.length)];
    const stops = km < 1500 ? (r() < 0.8 ? 0 : 1) : r() < 0.4 ? 0 : r() < 0.85 ? 1 : 2;
    const durationMin = baseMin + stops * (70 + Math.floor(r() * 150));
    const priceUsd = Math.round(baseFare * (0.75 + r() * 0.7) * (stops === 0 ? 1.15 : 1 - stops * 0.08) * CABIN_MULT[cabin]);
    const depart = Math.floor(r() * 96) * 15;
    const via = VIA.filter((v) => v !== from && v !== to)[Math.floor(r() * (VIA.length - 2))];
    out.push({
      id: `${airline.code}${i}`,
      airline,
      flightNo: `${airline.code} ${100 + Math.floor(r() * 899)}`,
      from, to, depart, durationMin, stops,
      stopVia: stops > 0 ? via : undefined,
      baggage: cabin === "Economy" ? (r() < 0.5 ? "Carry-on only" : "1 × 23kg checked") : cabin === "Premium Economy" ? "2 × 23kg checked" : "2 × 32kg checked",
      cabin, priceUsd, score: 0,
    });
  }
  const minP = Math.min(...out.map((f) => f.priceUsd)), minD = Math.min(...out.map((f) => f.durationMin));
  out.forEach((f) => (f.score = (minP / f.priceUsd) * 0.55 + (minD / f.durationMin) * 0.35 + (f.stops === 0 ? 0.1 : 0)));
  return out;
}

export function cheapestFare(from: string, to: string, cabin: Cabin = "Economy") {
  const fl = generateFlights(from, to, "ref", cabin);
  return Math.min(...fl.map((f) => f.priceUsd));
}

export const fmtTime = (m: number) => {
  const mm = ((m % 1440) + 1440) % 1440;
  return `${String(Math.floor(mm / 60)).padStart(2, "0")}:${String(mm % 60).padStart(2, "0")}`;
};
export const fmtDur = (m: number) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
