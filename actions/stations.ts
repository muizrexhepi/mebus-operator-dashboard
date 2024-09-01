import { API_URL } from "@/environment"
import { Station } from "@/models/station"
import axios from "axios"
import { revalidatePath } from "next/cache"

export async function deleteStation (stationId:string) {
    try {
        const res = await axios.post(`${API_URL}/station/delete/${stationId}`)
        console.log({zi:res?.data?.data})
        revalidatePath('lines/cities/create')
        return res?.data?.message
    } catch (error) {
        console.log(error)
    }
}
export async function createStation(station: Station) {
    try {
        // Prepare the request payload based on the Station model
        const payload = {
            name: station.name,
            city: station.city,
            country: station.country,
            address: station.address,
            location: station.location, // Make sure this matches the API's expected format
            code: station.code,
        };

        // Perform the API request to create the station
        const res = await axios.post(
            `${API_URL}/station/create/66cba19d1a6e55b32932c59b`,
            payload
        );

        // Optionally, you can revalidate paths or perform other actions here
        revalidatePath('lines/cities/create'); // Adjust path as needed

        return res?.data?.message; // Return success message or response data
    } catch (error) {
        console.error("Error creating station:", error);
        throw new Error("Failed to create station"); // Optionally throw an error to handle it further
    }
}