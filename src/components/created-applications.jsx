import { getApplications } from '@/api/apiApplications'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import ApplicationCard from './application-card';
import { useUser } from '@clerk/clerk-react';

const CreatedApplications = () => {
  const { isLoaded, user } = useUser();

  const {
    loading: loadingApplications, 
    data: applications,
    fn: fnApplication,
  } = useFetch(getApplications, user ? { user_id: user.id } : null); // Ensure user is available

  useEffect(() => {
    if (isLoaded && user) {   // Fetch only when user is loaded
      fnApplication();
    }
  }, [isLoaded, user]); // Added `user` as a dependency

  if (loadingApplications) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  if (!applications) {  // Handle case when applications are still undefined
    return <p>No applications found.</p>;
  }

  return (
    <div className='flex flex-col gap-2'>
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} isCandidate />
      ))}
    </div>
  );
}

export default CreatedApplications;
