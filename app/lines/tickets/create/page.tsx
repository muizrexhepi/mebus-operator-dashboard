"use client"

import { getStationByOperator } from "@/actions/stations";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Station } from "@/models/station";
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react";

export default function TravelApp() {
    const [stations, setStations] = useState<Station[]>([]);
    const [activeStation, setActiveStation] = useState<Station>();

    useEffect(() => {
        const op_id = "66cba19d1a6e55b32932c59b"
        getStationByOperator(op_id).then((stations: Station[]) => {
            setStations(stations);
            console.log({stations})
        })        
    }, []);


    const recentLines = [
        { name: "Kumanov", date: "08.10.2024", time: "14:00" },
        { name: "Shkup", date: "08.10.2024", time: "15:00" },
        { name: "Tetove", date: "08.10.2024", time: "16:00" },
        { name: "Gostivar", date: "08.10.2024", time: "17:00" },
    ]

    const newStations = [
        { name: "Bratislav", date: "09.10.2024", time: "04:00" },
        { name: "Berlin", date: "09.10.2024", time: "12:00" },
        { name: "Hamburg", date: "09.10.2024", time: "18:00" },
    ]

    const possibleLines = [
        { city: "Beograd", price: "20€" },
        { city: "Bratislava", price: "70€" },
        { city: "Berlin", price: "100€" },
        { city: "Hamburg", price: "120€" },
    ]

  return (
    <div className="flex justify-center items-start space-x-8 p-8 bg-gray-100 min-h-screen">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>cikidenski</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {stations && stations.map((station, index) => (
              <li onClick={()=> setActiveStation(station)} key={index} className={`${activeStation?._id == station._id && "bg-black/10"} flex items-center space-x-4`}>
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="font-semibold">{station.city}</p>
                  <p className="text-sm text-gray-500">{station.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">add a new cikidenski</h3>
            <ul className="space-y-4">
              {newStations.map((station, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-semibold">{station.name}</p>
                    <p className="text-sm text-gray-500">{station.date} {station.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Button className="w-full mt-4" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Shto stacion të ri
          </Button>
        </CardContent>
      </Card>

      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-md">Linjat e mundshme prej në {activeStation?.city} - {activeStation?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {possibleLines.map((line, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{line.city}</span>
                <span className="font-semibold">{line.price}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}