"use client"

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../environment';
import moment from 'moment';
import { Ticket } from '@/models/ticket';
import { Booking } from '@/models/booking';
import { Route } from '@/models/route';
import { useRouter } from 'next/navigation';
import { deactivateTicket, reactivateTicket } from '@/actions/ticket';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUser } from '@/context/user';

interface IData {
    ticket: Ticket;
    bookings: Booking[];
}

const BusSchedule = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [routes, setRoutes] = useState<IData[]>([]);
    const [selectedLine, setSelectedLine] = useState<string>('');
    const [expandedRoute, setExpandedRoute] = useState<number | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [updatedSeats, setUpdatedSeats] = useState<{ [key: string]: number }>({});
    const [deleteRouteId, setDeleteRouteId] = useState<string | null>(null);
    const [lines, setLines] = useState<Route[]>([]);

    const { user } = useUser();

    const fetchLines = async () => {
        try {
            const response: AxiosResponse = await axios.get(`${API_URL}/route/operator/${user?.$id}`); 
            const lineIds = response.data.data.map((route: Route) => route._id).join('-');
            setLines(response.data.data);
            setSelectedLine(lineIds); 
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCapacityRoutes = async () => {
        try {
            const operator_id = user?.$id;
            const response: AxiosResponse = await axios.get(`${API_URL}/ticket/capacity-routes?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&line=${selectedLine}&operator_id=${operator_id}`);
            setRoutes(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(user) {
            fetchLines();
        }
    }, [user]);

    useEffect(() => {
        if (selectedLine && user) {
            fetchCapacityRoutes();
        }
    }, [selectedLine, startDate, endDate, user]);

    const handleRouteClick = (id: number) => {
        setExpandedRoute(expandedRoute === id ? null : id);
    };

    const handleLineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'all') {
            const allLineIds = lines.map((route: Route) => route._id).join('-');
            setSelectedLine(allLineIds);
        } else {
            setSelectedLine(selectedValue);
        }
    };

    const performStateChange = async (currentActivationState: boolean, ticketId: string) => {
        const updatedRoutes = routes.map(route => {
            if (route.ticket._id === ticketId) {
                return {
                    ...route,
                    ticket: {
                        ...route.ticket,
                        is_active: !currentActivationState
                    }
                };
            }
            return route;
        });

        setRoutes(updatedRoutes);

        try {
            if (currentActivationState) {
                await deactivateTicket(ticketId);
            } else {
                await reactivateTicket(ticketId);
            }
        } catch (error) {
            console.error("Error changing ticket state:", error);
            setRoutes(routes);
        }
    };

    const handleUpdateSeats = async (ticketId: string) => {
        const newSeats = updatedSeats[ticketId];

        try {
            await axios.post(`${API_URL}/ticket/update/seats/${ticketId}?seats=${newSeats}`, { number_of_tickets: newSeats });
            setRoutes(prevRoutes =>
                prevRoutes.map(route =>
                    route.ticket._id === ticketId ? { ...route, ticket: { ...route.ticket, number_of_tickets: newSeats } } : route
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleSeatChange = (ticketId: string, value: number) => {
        setUpdatedSeats(prev => ({ ...prev, [ticketId]: value }));
    };

    const handleDeleteRoute = async () => {
        if (deleteRouteId) {
            try {
                await axios.post(`${API_URL}/ticket/delete/${deleteRouteId}`);
                setRoutes(routes.filter(route => route.ticket._id !== deleteRouteId));
                setDeleteRouteId(null);
            } catch (error) {
                console.error("Error deleting route:", error);
            }
        }
    };

    const setDateRange = (range: string) => {
        let start, end;

        switch (range) {
            case 'today':
                start = moment.utc().startOf('day');
                end = moment.utc().endOf('day');
                break;
            case 'yesterday':
                start = moment.utc().subtract(1, 'day').startOf('day');
                end = moment.utc().subtract(1, 'day').endOf('day');
                break;
            case 'thisWeek':
                start = moment.utc().startOf('isoWeek');
                end = moment.utc().endOf('isoWeek');
                break;
            case 'lastWeek':
                start = moment.utc().subtract(1, 'week').startOf('isoWeek');
                end = moment.utc().subtract(1, 'week').endOf('isoWeek');
                break;
            case 'thisMonth':
                start = moment.utc().startOf('month');
                end = moment.utc().endOf('month');
                break;
            case 'lastMonth':
                start = moment.utc().subtract(1, 'month').startOf('month');
                end = moment.utc().subtract(1, 'month').endOf('month');
                break;
            default:
                start = moment().startOf('day');
                end = moment().endOf('day');
        }

        console.log({ start: start.format(), end: end.format() });

        setStartDate(start.toDate());
        setEndDate(end.toDate());
        setSelectedDate(`${start.format('MMM DD, YYYY')} - ${end.format('MMM DD, YYYY')}`);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setDateRange('today')}>Today</Button>
                    <Button variant="outline" onClick={() => setDateRange('yesterday')}>Yesterday</Button>
                    <Button variant="outline" onClick={() => setDateRange('thisWeek')}>This Week</Button>
                    <Button variant="outline" onClick={() => setDateRange('lastWeek')}>Last Week</Button>
                    <Button variant="outline" onClick={() => setDateRange('thisMonth')}>This Month</Button>
                    <Button variant="outline" onClick={() => setDateRange('lastMonth')}>Last Month</Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <input type="text" value={selectedDate} readOnly className="border p-2 rounded" />
                    <select onChange={handleLineChange} className="border p-2 rounded">
                        <option value="all">All routes</option>
                        {lines?.map((route: Route) => (
                            <option key={route._id} value={route._id}>{route.code}</option>
                        ))}
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
                            <TableRow key={idx} className="cursor-pointer" onClick={() => handleRouteClick(idx)}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>
                                    <span className={`${route.ticket.is_active ? "bg-green-500" : "bg-red-500"} text-white px-2 py-1 rounded-full`}>
                                        {route.ticket.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>
                                <TableCell>{route.ticket.route_number.code?.toString()}</TableCell>
                                <TableCell>{moment.utc(route.ticket.departure_date).format('dddd, DD-MM-YYYY')}</TableCell>
                                <TableCell>{route.ticket.destination.from} / {route.ticket.destination.to}</TableCell>
                                <TableCell>{route.ticket.number_of_tickets}</TableCell>
                                <TableCell>
                                    {route.bookings.length} / {route.bookings.reduce((totalPassengers, booking) => totalPassengers + (booking?.passengers?.length || 0), 0)}
                                </TableCell>
                                <TableCell>{moment.utc(route.ticket.departure_date).format('HH:mm')}</TableCell>
                            </TableRow>
                            {expandedRoute === idx && (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex justify-between">
                                                    <Button variant="outline" className='bg-blue-500' onClick={() => router.push(`/capacity/sales-report?booking_ids=${route.bookings.map((booking) => booking._id)}`)}>
                                                        Sales report
                                                    </Button>
                                                    <Button variant="outline" className='bg-yellow-500' onClick={() => performStateChange(route.ticket.is_active, route.ticket._id)}>
                                                        {route.ticket.is_active ? "Stop Sales" : "Resume Sales"}
                                                    </Button>
                                                    <AlertDialog>
                                                      <AlertDialogTrigger><Button variant="outline" className="text-red-500" onClick={() => setDeleteRouteId(route.ticket._id)}>Delete route</Button></AlertDialogTrigger>
                                                      <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                          <AlertDialogDescription>
                                                              This action cannot be undone. Are you sure you want to delete this route?
                                                          </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                          <AlertDialogAction  onClick={handleDeleteRoute}>Yes</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                      </AlertDialogContent>
                                                    </AlertDialog>
                                                    {/* <Button variant="outline" className="text-red-500" onClick={() => setDeleteRouteId(route.ticket._id)}>Delete route</Button> */}
                                                </div>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <span>{route.ticket.destination.from} - {route.ticket.destination.to}</span>
                                                    <div className='flex'>
                                                        <Input
                                                            className='border'
                                                            type="number"
                                                            value={updatedSeats[route.ticket._id] || route.ticket.number_of_tickets}
                                                            onChange={(e) => handleSeatChange(route.ticket._id, Number(e.target.value))}
                                                        />
                                                        <Button className="ml-2" onClick={() => handleUpdateSeats(route.ticket._id)}>Ruaj</Button>
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
