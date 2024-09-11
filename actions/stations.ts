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
        const payload = {
            name: station.name,
            city: station.city,
            country: station.country,
            address: station.address,
            location: station.location, 
            code: station.code,
        };

        const res = await axios.post(
            `${API_URL}/station/create/66cba19d1a6e55b32932c59b`,
            payload
        );

        revalidatePath('lines/cities/create'); 

        return res?.data?.message; 
    } catch (error) {
        console.error("Error creating station:", error);
        throw new Error("Failed to create station"); 
    }
}