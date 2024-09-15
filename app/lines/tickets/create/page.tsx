"use client"

import { getStationByOperator } from "@/actions/stations";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Station } from "@/models/station";
import { PlusCircle, X } from "lucide-react"
import { useEffect, useState } from "react";

export default function TravelApp() {
    const [stations, setStations] = useState<Station[]>([]);
    const [activeStation, setActiveStation] = useState<Station>();
    const [possibleLines, setPossibleLines] = useState<Station[]>();
    const [lineData, setLineData] = useState<{[key: string]: {price: string, childrenPrice: string, duration: string, time: string}}>({});

    useEffect(() => {
        const op_id = "66cba19d1a6e55b32932c59b"
        getStationByOperator(op_id).then((stations: Station[]) => {
            setStations(stations);
            console.log({stations})
        })        
    }, []);

    const newStations = [
        { name: "Bratislav", date: "09.10.2024", time: "04:00" },
        { name: "Berlin", date: "09.10.2024", time: "12:00" },
        { name: "Hamburg", date: "09.10.2024", time: "18:00" },
    ]

    useEffect(() => {
      const pL = stations.filter((station: Station) => station._id !== activeStation?._id);
      console.log({pL})
      setPossibleLines(pL);
    }, [activeStation, stations])

    const handleInputChange = (lineId: string, field: string, value: string) => {
        setLineData(prev => ({
            ...prev,
            [lineId]: {
                ...prev[lineId],
                [field]: value
            }
        }));
    }

    const handleSubmit = () => {
        console.log("Submitted data:", lineData);
    }

    const removeLine = (lineId: string) => {
        setPossibleLines(prevLines => prevLines?.filter(line => line._id !== lineId));
        setLineData(prevData => {
            const newData = { ...prevData };
            delete newData[lineId];
            return newData;
        });
    }

    const addStation = () => {

        console.log("Add station functionality to be implemented");
    }

    return (
        <div className="flex justify-center items-start space-x-8 p-8 bg-gray-100 min-h-screen">
            <Card className="w-80">
                <CardHeader>
                    <CardTitle>cikidenski</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {stations && stations.map((station, index) => (
                            <li onClick={()=> setActiveStation(station)} key={index} className={`${activeStation?._id == station._id && "bg-black/10"} flex items-center space-x-4 p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors`}>
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <div>
                                    <p className="font-semibold">{station.city}</p>
                                    <p className="text-sm text-gray-500">{station.name}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* <div className="mt-6 border-t pt-4">
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
                    </div> */}
                    <Button className="w-full mt-4" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Shto stacion të ri
                    </Button>
                </CardContent>
            </Card>

            <Card className="w-96">
                <CardHeader>
                    <CardTitle className="text-md">Linjat e mundshme prej në {activeStation?.city} - {activeStation?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {activeStation && possibleLines?.map((line) => (
                            <li key={line._id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>{line.city}</span>
                                    <span className="font-semibold">{line.name}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => removeLine(line._id!)}
                                        className="h-8 w-8 bg-red-500 text-white"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input 
                                        type="number" 
                                        placeholder="Price" 
                                        value={lineData[line._id!]?.price || ''} 
                                        onChange={(e) => handleInputChange(line._id!, 'price', e.target.value)}
                                    />
                                    <Input 
                                        type="number" 
                                        placeholder="Children price" 
                                        value={lineData[line._id!]?.childrenPrice || ''} 
                                        onChange={(e) => handleInputChange(line._id!, 'childrenPrice', e.target.value)}
                                    />
                                    <Input 
                                        type="text" 
                                        placeholder="Statr time" 
                                        value={lineData[line._id!]?.duration || ''} 
                                        onChange={(e) => handleInputChange(line._id!, 'time', e.target.value)}
                                    />
                                    <Input 
                                        type="number" 
                                        placeholder="Duration (hrs)" 
                                        value={lineData[line._id!]?.duration || ''} 
                                        onChange={(e) => handleInputChange(line._id!, 'duration', e.target.value)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button className="w-full mt-4" onClick={addStation} variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Station
                    </Button>
                    <Button className="w-full mt-4" onClick={handleSubmit}>
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}