import React from 'react'
import { getBookingByIdWithChargeData } from '@/actions/bookings'
import { CreditCardIcon, MapPinIcon, UserIcon, ClockIcon, BusIcon, BuildingIcon, PhoneIcon, MailIcon, CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Passenger } from '@/models/passenger'
import moment from "moment-timezone"

const BookingDetailsPage = async ({ params }: { params: { id: string } }) => {
  let booking = null;
  if (params.id) {
    booking = await getBookingByIdWithChargeData(params.id);
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Booking Not Found</h2>
            <p className="mt-2 text-center text-gray-600">We couldn't find the booking you're looking for. Please check the booking ID and try again.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const departureDate = moment.utc(booking.departure_date).format("dddd, DD-MM-YYYY");

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Booking Details</h1>
                <p className="text-sm opacity-80">Booking ID: {booking._id}</p>
              </div>
              <Badge className="text-lg py-1 px-3">
                {booking.is_paid ? "Paid" : "Unpaid"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BusIcon className="mr-2" />
                      Trip Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="text-primary" />
                        <span className="font-semibold">{booking.labels.from_city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="text-primary" />
                        <span className="font-semibold">{booking.labels.to_city}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="text-primary" />
                      <span>{departureDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="text-primary" />
                      <span>{moment.utc(booking.departure_date).format("HH:mm")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BuildingIcon className="text-primary" />
                      <span>{typeof booking.operator === 'string' ? booking.operator : booking.operator.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Origin : {booking.platform}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserIcon className="mr-2" />
                      Passenger Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                  {booking?.passengers?.map((passenger: Passenger, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <UserIcon className="mr-2" />
                          Passenger {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Full Name:</span>
                          <span>{passenger.full_name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Email:</span>
                          <span>{passenger.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Phone:</span>
                          <span>{passenger.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Price:</span>
                          <Badge variant="secondary">${passenger.price.toFixed(2)}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCardIcon className="mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Price:</span>
                      <span className="text-2xl font-bold">${booking.price.toFixed(2)}</span>
                    </div>
                    {booking.charge && (
                      <>
                        <div className="space-y-2">
                          <div className="font-semibold">Charge Details:</div>
                          <div className="flex justify-between">
                            <span>Amount Charged:</span>
                            <span>${(booking.charge.amount / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Currency:</span>
                            <span>{booking.charge.currency.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Card:</span>
                            <div className="flex items-center space-x-2">
                              <CreditCardIcon className="text-primary" />
                              <span>{booking.charge.payment_method_details.card.brand.toUpperCase()} **** {booking.charge.payment_method_details.card.last4}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PhoneIcon className="mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MailIcon className="text-primary" />
                      <span>{booking.passengers[0].email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="text-primary" />
                      <span>{booking.passengers[0].email}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Charge ID:</span>
                      <span className="font-mono text-xs bg-gray-100 p-1 rounded">{booking.charge?.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Payment Intent ID:</span>
                      <span className="font-mono text-xs bg-gray-100 p-1 rounded">{booking.metadata.payment_intent_id}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingDetailsPage