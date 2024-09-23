"use client"

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../environment'
import moment from 'moment-timezone';
import { Ticket } from '@/models/ticket';
import { Booking } from '@/models/booking';
import { Route } from '@/models/route';
import { useRouter } from 'next/navigation';

interface IData {
    ticket: Ticket;
    bookings: Booking[];
}

const BusSchedule = () => {
    const router = useRouter()
    const [selectedDate, setSelectedDate] = useState('Sht 23, 2024');
    const [routes, setRoutes] = useState<IData[]>([]);
    const [lines, setLines] = useState<Route[]>([]);
    const [selectedLine, setSelectedLine] = useState<string>("");
    const [expandedRoute, setExpandedRoute] = useState(null);
    const [today, setToday] = useState(new Date());
    const [afterOneWeek, setAfterOneWeek] = useState(new Date());
  
    console.log({
      today: today.toISOString(),
      afterOneWeek: afterOneWeek.toISOString()
    });
    
    const fetchLines = async () => {
        try {
            const response: AxiosResponse = await axios.get(`${API_URL}/route`);
            setLines(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCapacityRoutes = async () => {
        try {
            const operator_id = "66cba19d1a6e55b32932c59b";
            const response: AxiosResponse = await axios.get(`${API_URL}/ticket/capacity-routes?startDate=${today.toISOString()}&endDate=${afterOneWeek.toISOString()}&line=${selectedLine}&operator_id=${operator_id}`);
            setRoutes(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      const now = moment();
      setToday(now.toDate());
      setAfterOneWeek(now.add(1, "week").toDate());
      fetchLines()
    }, []);
    
    
    useEffect(() => {
        fetchCapacityRoutes()
    }, [selectedLine])

    const handleRouteClick = (id: any) => {
        setExpandedRoute(expandedRoute === id ? null : id);
    };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline">Today</Button>
          <Button variant="outline">Yesterday</Button>
          <Button variant="outline">This Week</Button>
          <Button variant="outline">Last Week</Button>
          <Button variant="outline">This Month</Button>
          <Button variant="outline">Last Month</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <input type="text" value={selectedDate} readOnly className="border p-2 rounded" />
          <select onChange={(e: any)=>setSelectedLine(e.target.value)} className="border p-2 rounded">
          <option value={""}>{"Select route"}</option>
            {lines?.map((route: Route) => (
                <option value={route._id}>{route.code}</option>
            )) }
            
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Statusi</TableHead>
            <TableHead>Linja</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Nga / Deri</TableHead>
            <TableHead>Karriget</TableHead>
            <TableHead>Nr blerje/e / pasagjereve</TableHead>
            <TableHead>Ngarkesa e pare</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes?.map((route: IData, idx: number) => (
            <React.Fragment key={route.ticket._id}>
              <TableRow className="cursor-pointer" onClick={() => handleRouteClick(idx)}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <span className={`${route.ticket.is_active ? "bg-green-500" : "bg-red-500"} text-white px-2 py-1 rounded-full`}>{route.ticket.is_active ? "Active" : "In active"}</span>
                </TableCell>
                <TableCell>{route.ticket.route_number.code?.toString()}</TableCell>
                <TableCell>{moment.utc(route.ticket.departure_date).format("dddd, DD-MM-YYYY")}</TableCell>
                <TableCell>{route.ticket.destination.from} / {route.ticket.destination.to}</TableCell>
                <TableCell>{route.ticket.number_of_tickets}</TableCell>
                <TableCell>
                    {route.bookings.length} / {route.bookings.reduce((totalPassengers, booking) => totalPassengers + (booking?.passengers?.length || 0), 0)}
                </TableCell>
                <TableCell>{moment.utc(route.ticket.departure_date).format("HH:mm")}</TableCell>
              </TableRow>
              {expandedRoute === idx && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => router.push(``)}>Sales report</Button>
                          <Button variant="outline">Stop sales</Button>
                          <Button variant="outline" className="text-red-500">Delete route</Button>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span>{route.ticket.destination.from} - {route.ticket.destination.to}</span>
                          <div>
                            <span>Aktuale: {route.ticket.number_of_tickets}</span>
                            <Button className="ml-2">Ruaj</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BusSchedule;