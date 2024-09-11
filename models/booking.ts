import { Agency } from "./agency";
import { Charge } from "./charge";
import { Operator } from "./operator";
import { Passenger } from "./passenger";
import { Route } from "./route";
import { Station } from "./station";
import { Ticket } from "./ticket";
import { User } from "./user";

export interface Booking {
    _id: string;
    user: User | string;
    ticket: Ticket | string;
    route: Route | string;
    operator: Operator | string;
    agency: Agency | string;
    departure_date: Date;
    destinations: {
        departure_station: Station | string;
        arrival_station: Station | string;
    },
    labels: {
        from_city: string;
        to_city: string;
    },
    passengers: Passenger[];
    location: {
        from: {
            lat: number;
            lng: number;
        },
        to: {
            lat: number;
            lng: number;
        },
    },
    price: number;
    platform: Platforms;
    is_paid: boolean;
    metadata: BookingMetadata;
    charge?: Charge;
}

export interface BookingMetadata {
    transaction_id: string;
    payment_intent_id: string;
}

export enum Platforms {
    IOS = "ios",
    ANDROID = "android",
    WEB = "web",
}