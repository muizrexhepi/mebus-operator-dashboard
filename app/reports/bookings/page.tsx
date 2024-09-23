"use client"

import React, { useState, useEffect } from 'react';
import { Booking } from '@/models/booking';
import BookingsTable from '@/components/tables/booking';
import { getBookingsByOperatorId } from '@/actions/bookings';

const ParentComponent = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    const operator_id = "66cba19d1a6e55b32932c59b";
    const buchungen = await getBookingsByOperatorId(operator_id, page, itemsPerPage);
    setBookings(buchungen as Booking[]);
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  return (
    <div>
      <BookingsTable
        bookings={bookings}
      />
    </div>
  );
};

export default ParentComponent;
