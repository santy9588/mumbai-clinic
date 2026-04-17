import type { MapLocation } from "@/types";
import {
  ChevronRight,
  Clock,
  Globe,
  MapPin,
  Navigation,
  Phone,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";

const LOCATIONS: MapLocation[] = [
  {
    id: "1",
    name: "Eiffel Tower",
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
    lat: 48.8584,
    lng: 2.2945,
    rating: 4.7,
    category: "Landmark",
    hours: "Open · Closes 11:45 PM",
    website: "https://toureiffel.paris",
  },
  {
    id: "2",
    name: "Colosseum",
    address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
    lat: 41.8902,
    lng: 12.4922,
    rating: 4.7,
    category: "Historical Site",
    hours: "Open · Closes 7:15 PM",
    phone: "+39 06 3996 7700",
  },
  {
    id: "3",
    name: "Taj Mahal",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    lat: 27.1751,
    lng: 78.0421,
    rating: 4.8,
    category: "Landmark",
    hours: "Open · Closes 6:30 PM",
  },
  {
    id: "4",
    name: "Sagrada Familia",
    address: "C/ de Mallorca, 401, L'Eixample, 08013 Barcelona, Spain",
    lat: 41.4036,
    lng: 2.1744,
    rating: 4.7,
    category: "Church",
    hours: "Open · Closes 8:00 PM",
    website: "https://sagradafamilia.org",
  },
  {
    id: "5",
    name: "Great Wall of China",
    address: "Huairou District, Beijing, China",
    lat: 40.4319,
    lng: 116.5704,
    rating: 4.8,
    category: "Historical Site",
    hours: "Open · Closes 5:30 PM",
  },
  {
    id: "6",
    name: "Machu Picchu",
    address: "Machu Picchu, Cusco Region, Peru",
    lat: -13.1631,
    lng: -72.545,
    rating: 4.9,
    category: "Archaeological Site",
    hours: "Open · Closes 5:30 PM",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium text-g-dark">{rating}</span>
      <div className="flex">
        {["s1", "s2", "s3", "s4", "s5"].map((key, i) => (
          <Star
            key={key}
            size={12}
            className={
              i < Math.floor(rating)
                ? "text-g-yellow fill-g-yellow"
                : "text-muted-foreground"
            }
          />
        ))}
      </div>
    </div>
  );
}

export function MapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<MapLocation | null>(null);

  const filtered = LOCATIONS.filter(
    (loc) =>
      !searchQuery ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="flex h-[calc(100vh-56px)] overflow-hidden bg-background"
      data-ocid="maps.page"
    >
      {/* Left panel */}
      <div className="w-96 flex-shrink-0 flex flex-col border-r border-border overflow-hidden shadow-card">
        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-2 bg-background border border-g-border rounded-full px-4 py-2.5 shadow-search-hover">
            <Search size={16} className="text-g-gray flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Maps"
              className="flex-1 outline-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground"
              data-ocid="maps.search_input"
            />
          </div>
        </div>

        {/* Locations list */}
        <div className="flex-1 overflow-y-auto" data-ocid="maps.locations.list">
          {filtered.length === 0 ? (
            <div className="py-16 text-center" data-ocid="maps.empty_state">
              <MapPin
                size={40}
                className="mx-auto text-muted-foreground mb-3"
              />
              <p className="text-sm text-muted-foreground">
                No locations found
              </p>
            </div>
          ) : (
            filtered.map((loc, i) => (
              <button
                key={loc.id}
                type="button"
                onClick={() =>
                  setSelected(loc.id === selected?.id ? null : loc)
                }
                className={`w-full flex items-start gap-3 px-4 py-4 border-b border-border text-left transition-smooth ${
                  selected?.id === loc.id ? "bg-primary/10" : "hover:bg-muted"
                }`}
                data-ocid={`maps.location.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-full bg-g-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-g-red" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-g-dark truncate">
                    {loc.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {loc.category}
                  </p>
                  {loc.rating && <StarRating rating={loc.rating} />}
                  {loc.hours && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={11} className="text-g-green" />
                      <span className="text-xs text-g-green">{loc.hours}</span>
                    </div>
                  )}
                </div>
                <ChevronRight
                  size={16}
                  className="text-muted-foreground flex-shrink-0 mt-1"
                />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden bg-muted">
        {/* Static map placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 39px, #DADCE0 39px, #DADCE0 40px),
                repeating-linear-gradient(90deg, transparent, transparent 39px, #DADCE0 39px, #DADCE0 40px)
              `,
              backgroundColor: "#f5f5f5",
            }}
          />
          {/* Street-like paths */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <title>Map grid</title>
            <path d="M0 200 L800 200" stroke="#E8E8E8" strokeWidth="4" />
            <path d="M0 400 L800 400" stroke="#E8E8E8" strokeWidth="6" />
            <path d="M200 0 L200 600" stroke="#E8E8E8" strokeWidth="4" />
            <path d="M500 0 L500 600" stroke="#E8E8E8" strokeWidth="6" />
          </svg>

          {/* Map pins for each location */}
          {filtered.map((loc, i) => {
            const x = 15 + (i % 3) * 30 + Math.sin(i * 1.5) * 5;
            const y = 20 + Math.floor(i / 3) * 35 + Math.cos(i * 1.3) * 5;
            const isSelected = selected?.id === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() =>
                  setSelected(loc.id === selected?.id ? null : loc)
                }
                className="absolute transition-smooth"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -100%)",
                }}
                aria-label={loc.name}
                data-ocid={`maps.pin.${i + 1}`}
              >
                <div
                  className={`relative flex flex-col items-center ${isSelected ? "scale-125" : "hover:scale-110"} transition-smooth`}
                >
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-semibold shadow-elevated ${
                      isSelected
                        ? "bg-g-blue text-white"
                        : "bg-background text-g-dark border border-border"
                    }`}
                  >
                    {loc.name.split(" ")[0]}
                  </div>
                  <div
                    className={`w-2 h-2 rotate-45 -mt-1 ${isSelected ? "bg-g-blue" : "bg-background border-r border-b border-border"}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected location detail card */}
        {selected && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 bg-background rounded-2xl shadow-elevated border border-border p-4 animate-fade-in"
            data-ocid="maps.detail.card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-g-dark">{selected.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selected.category}
                </p>
                {selected.rating && (
                  <div className="mt-1">
                    <StarRating rating={selected.rating} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground transition-smooth flex-shrink-0"
                aria-label="Close"
                data-ocid="maps.detail.close_button"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {selected.address}
            </p>
            {selected.hours && (
              <div className="flex items-center gap-1 mt-1.5">
                <Clock size={11} className="text-g-green" />
                <span className="text-xs text-g-green">{selected.hours}</span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-g-blue text-white rounded-full text-xs font-medium hover:bg-primary transition-smooth"
                data-ocid="maps.directions.button"
              >
                <Navigation size={12} />
                Directions
              </button>
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-xs text-g-dark hover:bg-muted transition-smooth"
                  data-ocid="maps.call.button"
                >
                  <Phone size={12} />
                  Call
                </a>
              )}
              {selected.website && (
                <a
                  href={selected.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-xs text-g-dark hover:bg-muted transition-smooth"
                  data-ocid="maps.website.button"
                >
                  <Globe size={12} />
                  Website
                </a>
              )}
            </div>
          </div>
        )}

        {/* Navigation controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1">
          <button
            type="button"
            className="w-8 h-8 bg-background border border-border rounded shadow-card flex items-center justify-center text-g-dark hover:bg-muted transition-smooth font-bold"
            aria-label="Zoom in"
            data-ocid="maps.zoom_in.button"
          >
            +
          </button>
          <button
            type="button"
            className="w-8 h-8 bg-background border border-border rounded shadow-card flex items-center justify-center text-g-dark hover:bg-muted transition-smooth font-bold"
            aria-label="Zoom out"
            data-ocid="maps.zoom_out.button"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
}
