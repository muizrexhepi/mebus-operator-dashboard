"use client"

import React, { useState, useEffect } from 'react';
import { Booking } from '@/models/booking';
import BookingsTable from '@/components/tables/booking';
import { getBookingsByOperatorId } from '@/actions/bookings';
import { Button } from '@/components/ui/button';

const ParentComponent = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    const operator_id = "66cba19d1a6e55b32932c59b";
    const result = await getBookingsByOperatorId(operator_id, page, itemsPerPage);
    setBookings(result as Booking[]);
    setTotalPages(Math.ceil(100 / itemsPerPage));
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <BookingsTable
        bookings={bookings}
      />
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page}
        </span>
        <Button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ParentComponent;