import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Journey {
  arrival: string;
  date: Timestamp;
  departure: string;
  passengerNb: number;
  nbPlacesAvailable: number;
  price: number;
  driver: string;
}

export const JOURNEY_PATH = 'Journeys';
