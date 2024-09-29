'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/user'
import { API_URL } from '@/environment'
import { Route } from '@/models/route'
import axios from 'axios'
import Select from 'react-select'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface RouteOption {
  value: string;
  label: string;
}

export default function CreateEmployee() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [routes, setRoutes] = useState<RouteOption[]>([])
  const [selectedRoutes, setSelectedRoutes] = useState<RouteOption[]>([])
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      fetchRoutes()
    }
  }, [user])

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`${API_URL}/route/operator/${user?.$id}`)
      const routeOptions: RouteOption[] = response.data.data.map((route: Route) => ({
        value: route._id,
        label: route.code
      }))
      setRoutes(routeOptions)
    } catch (error) {
      console.error('Error fetching routes:', error)
      toast({
        title: "Error",
        description: "Failed to fetch routes. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/driver/create/${user?.$id}`, {
        name,
        email,
        password,
        assigned_routes: selectedRoutes.map(route => route.value),
      })
      toast({
        title: "Success",
        description: "Employee created successfully!",
      })
      // Reset form
      setName('')
      setEmail('')
      setPassword('')
      setSelectedRoutes([])
    } catch (error) {
      console.error('Error creating employee:', error)
      toast({
        title: "Error",
        description: "Failed to create employee. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="routes">Assigned Routes</Label>
        <Select
          isMulti
          options={routes}
          value={selectedRoutes}
          onChange={(selected: any) => setSelectedRoutes(selected as RouteOption[])}
          placeholder="Select routes"
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <Button type="submit" className="w-full">Create Employee</Button>
    </form>
  )
}