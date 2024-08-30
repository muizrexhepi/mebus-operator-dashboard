import CityForm from "@/components/forms/create-city-form";
import StationsTable from "@/components/stations/StationsTable";
import { API_URL } from "@/environment";
import axios from "axios";

export default async function CityCreate() {
  // const response = axios.get(`${API_URL}/stations`);

  // console.log({ response });
  return (
    <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-10">
      <h1 className="text-2xl font-bold mb-6">City Management</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <CityForm />
        </div>
        <div className="w-full lg:w-2/3">
          <StationsTable cities={[]} />
        </div>
      </div>
    </div>
  );
}
