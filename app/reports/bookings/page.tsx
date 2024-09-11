import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getBookingsByOperatorId } from '@/actions/bookings'
import BookingsTable from '@/components/tables/booking'

const BookingsReportPage = async () => {

    const operator_id = "66cba19d1a6e55b32932c59b";
    const bookings = await getBookingsByOperatorId(operator_id);
    
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Bookings Report</h1>
        <BookingsTable bookings={bookings ? bookings : []} />
    </div>
  )
}

export default BookingsReportPage;