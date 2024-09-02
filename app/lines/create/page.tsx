import RouteForm from "@/components/forms/create-route-form";
import RoutesTable from "@/components/routes/RoutesTable";
import StationsTable from "@/components/stations/StationsTable";
import { API_URL } from "@/environment";
import axios from "axios";

export default async function CreateLine() {
  const operator_id = "66cba19d1a6e55b32932c59b";

  const stationsResponse = await axios.get(
    `${API_URL}/station/operator/${operator_id}?select=name city country address code`
  );
  const stations = stationsResponse.data?.data;

  const routesResponse = await axios.get(
    `${API_URL}/route`
  );
  const routes = routesResponse.data?.data;

  console.log({ zi: stations, bardh: routes });
  return (
    <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-10">
      <h1 className="text-2xl font-bold mb-6">Route Management</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <RouteForm stations={stations.reverse()} />
        </div>
        <div className="w-full lg:w-2/3">
          <RoutesTable routes={routes.reverse()} />
        </div>
      </div>
    </div>
  );
}
