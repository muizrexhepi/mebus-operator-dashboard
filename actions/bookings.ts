import { API_URL } from "@/environment";
import { Booking } from "@/models/booking";
import axios from "axios";


export const getBookingsByOperatorId = async (operator_id: string, select?: string) => {
    try {
        const res = await axios.get(`${API_URL}/booking/operator/${operator_id}`);
        console.log(res.data.data);
        return res?.data?.data as Booking[];
    } catch (error) {
        console.log(error);
        // throw new Error("Error fetching bookings");
    }
};

export const getBookingByIdWithChargeData = async (booking_id: string) => {
    try {
        const res = await axios.get(`${API_URL}/booking/operator/with_charge/${booking_id}`);
        console.log(res.data.data);
        return res?.data?.data as Booking;
    } catch (error) {
        console.log(error);
    }
};


