export interface Airport {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface PassengerCounts {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

export interface SearchFlightsParams {
  origin: {
    skyId: string | undefined;
    entityId: string | undefined;
  };
  destination: {
    skyId: string | undefined;
    entityId: string | undefined;
  };
  fromDate: string | undefined;
  toDate: string | undefined;
  cabinClass: string | undefined;
  passengers: PassengerCounts;
}

export interface FlightData {
  id: string;
  price: Price;
  legs: Leg[];
  tags?: string[];
  score: number;
  isSelfTransfer: boolean;
}

interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

interface Leg {
  id: string;
  origin: Origin;
  destination: Destination;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

interface Segment {
  id: string;
  origin: Origin;
  destination: Destination;
}

interface Origin {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

interface Destination {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

interface Carriers {
  marketing: Marketing[];
  operating?: Operating[];
  operationType: string;
}

interface Marketing {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

interface Operating {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}
