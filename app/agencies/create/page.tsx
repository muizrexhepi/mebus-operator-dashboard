import AgenciesTable from '@/components/agencies/AgenciesTable'
import AgencyForm from '@/components/forms/create-agency-form'
import { API_URL } from '@/environment';
import axios from 'axios';
import React from 'react'



const page = async () => {
    const operator_id = "66cba19d1a6e55b32932c59b";
  
    const res = await axios.get(
      `${API_URL}/agency/operator/${operator_id}`
    );
    const agencies = res.data?.data;
  
    console.log({ bardh: res.data.data });

    return (
        <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-10">
        <h1 className="text-2xl font-bold mb-6">Agency management</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <AgencyForm />
          </div>
          <div className="w-full lg:w-2/3">
            <AgenciesTable agencies={agencies} />
          </div>
        </div>
      </div>
    )
}

export default page
