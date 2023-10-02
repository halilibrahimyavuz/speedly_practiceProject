import axios from "axios";
import { settings } from "../utils/settings";
import { authHeader } from "./auth-header";

const API_URL = settings.apiUrl;

export const isCarAvailable = async (reservation) => {
  const { carId, pickUpDateTime, dropOffDateTime } = reservation;

  return axios.get(
    `${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
    { headers: await authHeader() }
  );
};

export const createReservation = async (reservation) => {
  const { carId } = reservation;
  delete reservation.carId;
  return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
    headers: await authHeader(),
  });
};

export const getReservations = async () => {
  return axios.get(
    `${API_URL}/reservations/auth/all?page=0&size=999&sort=pickUpTime`,
    { headers: await authHeader() }
  );
};
