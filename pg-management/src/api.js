import axios from 'axios';

const API_URL = 'http://localhost:3000/api/bookings'; // This is already the full URL

export const fetchBookings = () => {
  return axios.get(API_URL); // No need to append /bookings again
};
