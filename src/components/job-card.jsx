import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { deleteJob, saveJob } from '@/api/apiJobs';
import { BarLoader } from 'react-spinners';

const JobCard = ({
    job,
    isMyJob=false,
    savedInit=false,
    onJobSaved=()=>{},
}) => {


    const [saved,setSaved]=useState(savedInit);
    const {
        fn:fnSavedJob,
        data:savedJob,
        loading:loadingSavedJob,
      }=useFetch(saveJob,{alreadySaved:saved});

    const {user}=useUser();

    const handleSaveJob=async()=>{
        await fnSavedJob({user_id:user.id,job_id:job.id});
        onJobSaved();
    }

    const {loading:loadingDeleteJob,fn:fnDeleteJob}=useFetch(deleteJob,{
        job_id:job.id
    });

    const handleDeleteJob=async()=>{
        await fnDeleteJob()
        onJobSaved()
    }

    useEffect(()=>{
        if(savedJob!==undefined)setSaved(savedJob?.length > 0)
    },[savedJob])

  return (
    <Card className="flex flex-col">
        {loadingDeleteJob && (
            <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
        )}
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
            {job.title}
            {!isMyJob && <Trash2Icon fill="red" size={18} className='text-red-300 cursor-pointer' onClick={handleDeleteJob} />}
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
            <div className='flex justify-between'>
                {job.company && <img src={job.company.logo_url} className='h-6'/>}
                <div className='flex gap-2 items-center'>
                    <MapIcon size={15} />{job.location}
                </div>
            </div>
            <hr/>
            {job.description.substring(0,job.description.indexOf("."))}
        </CardContent>
        <CardFooter className="flex gap-2">
            <Link to={`job/${job.id}`} className='flex-1'>
            <Button variant="secondary" className="w-full">
                More details
            </Button>   
            </Link>
            {!isMyJob &&(
                <Button
                variant='outline'
                className='w-15'
                onClick={handleSaveJob}
                disabled={loadingSavedJob}>
                    {saved?(
                        <Heart size={20} stroke='red' fill='red'/>
                    ):(
                        <Heart size={20} />
                    )
                    }
                </Button>
            )}
        </CardFooter>
    </Card>
  )
}

export default JobCard