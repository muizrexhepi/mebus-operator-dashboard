"use client";
import { citySchema } from "@/schemas";
import { Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Station {
  country: string;
  cityName: string;
  stationName: string;
  cityCode: string;
  locationUrl: string;
  stationAddress: string;
}

const StationsTable = ({
  cities,
}: {
  cities: z.infer<typeof citySchema>[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<Station>({
    country: "",
    cityName: "",
    stationName: "",
    cityCode: "",
    locationUrl: "",
    stationAddress: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      country: "",
      cityName: "",
      stationName: "",
      cityCode: "",
      locationUrl: "",
      stationAddress: "",
    });
  };

  const filteredCities = cities.filter((city) =>
    Object.values(city).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>City Name</TableHead>
              <TableHead>Station Name</TableHead>
              <TableHead>City Code</TableHead>
              <TableHead>Location URL</TableHead>
              <TableHead>Station Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.map((city, index) => (
              <TableRow key={index}>
                <TableCell>{city.country}</TableCell>
                <TableCell>{city.cityName}</TableCell>
                <TableCell>{city.stationName}</TableCell>
                <TableCell>{city.cityCode}</TableCell>
                <TableCell>
                  <a
                    href={city.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Map
                  </a>
                </TableCell>
                <TableCell>{city.stationAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StationsTable;
