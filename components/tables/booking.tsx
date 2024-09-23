"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Booking } from '@/models/booking'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'

const BookingsTable = ({bookings}: {bookings: Booking[]}) => {
    const router = useRouter();
    const getById = async (id: string) => {
        router.push("/reports/bookings/"+id)
    }
    

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Passenger</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Route</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings && bookings?.map((booking: Booking, index) => (
            <TableRow onClick={() => getById(booking?._id)} key={index}>
              <TableCell>{booking?.passengers[0]?.full_name}</TableCell>
              <TableCell>{booking?.passengers[0]?.email}</TableCell>
              <TableCell>{booking?.passengers[0]?.phone}</TableCell>
              <TableCell>{booking?.labels?.from_city}</TableCell>
              <TableCell>{booking?.labels?.to_city}</TableCell>
              <TableCell>${booking?.price?.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={booking.platform === 'web' ? 'default' : booking.platform === 'ios' ? 'secondary' : 'outline'}>
                  {booking.platform}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`${booking?.is_paid ? "bg-emerald-700" : "bg-destructive"}`}>
                  {booking.is_paid ? 'Paid' : 'Unpaid'}
                </Badge>
              </TableCell>
              <TableCell>{booking?.route?.toString()}</TableCell>
            </TableRow>
          ))}
            </TableBody>
        </Table>
    )
}

export default BookingsTable
