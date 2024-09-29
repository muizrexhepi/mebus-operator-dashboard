"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from 'lucide-react';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { createAgency } from '@/actions/agency';
import { useUser } from '@/context/user';

const agencySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  address: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
    street: z.string().optional(),
  }),
  contact: z.object({
    phone: z.string().optional(),
    contact_email: z.string().email('Invalid contact email').optional(),
  }),
  financial_data: z.object({
    percentage: z.number().min(0).max(100).optional(),
    total_sales: z.number().min(0).optional(),
    profit: z.number().min(0).optional(),
    debt: z.number().min(0).optional(),
  }),
  company_metadata: z.object({
    tax_number: z.string().optional(),
    registration_number: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email('Invalid company email').optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
  }),
});

export default function AgencyForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUser();

  const form = useForm({
    resolver: zodResolver(agencySchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      address: { city: '', country: '', street: '' },
      contact: { phone: '', contact_email: '' },
      financial_data: { percentage: 0, total_sales: 0, profit: 0, debt: 0 },
      company_metadata: {
        tax_number: '',
        registration_number: '',
        name: '',
        email: '',
        phone: '',
        country: '',
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof agencySchema>) => {
    setIsLoading(true);
    try {
      const message = await createAgency(values, user?.$id);
      setSuccess(message);
      console.log({ message });
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agency Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} placeholder="Agency Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} type="email" placeholder="email@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} type="password" placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address</h3>
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="City" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Street Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Phone Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} type="email" placeholder="contact@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Financial Data</h3>
            <FormField
              control={form.control}
              name="financial_data.percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} type="number" step="0.01" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company Metadata</h3>
            <FormField
              control={form.control}
              name="company_metadata.tax_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Number</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Tax Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_metadata.registration_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Registration Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_metadata.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Company Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_metadata.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} type="email" placeholder="company@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_metadata.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Company Phone Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_metadata.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Country</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Company Country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormSuccess message={success} />
          <FormError message={error} />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Agency Information"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}