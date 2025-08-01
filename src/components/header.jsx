import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'

const Header = () => {

    const [showSignIn,setShowSignIn]=useState(false);
    const {user}=useUser();
    const [search,setSearch]=useSearchParams();
    useEffect(()=>{
        if(search.get("sign-in")){
            setShowSignIn(true);
        }
    },[search]);

    const handleOverlayClick=(e)=>{
        if(e.target===e.currentTarget){
            setShowSignIn(false);
        }
    };

  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
             <img src="./logo-2.webp" className='h-20' />
            </Link>

            <div className="flex gap-8">
            <SignedOut>
            <Button variant="outline" onClick={()=>setShowSignIn(true)}>Login</Button>
            </SignedOut>
          <SignedIn>
            {/* add a condition here */}
            {user?.unsafeMetadata?.role==="recruiter"&&
            (<Link to='/post-job'>
            <Button variant="destructive" className='rounded-full'>
                <PenBox size={20} className='mr-2'/>
                Post a job
            </Button>
            </Link>)}
            <UserButton 
            appearance={{
                elements:{
                    avatarBox:"h-10 w-10"
                }
            }}>
                <UserButton.MenuItems>
                    <UserButton.Link
                    label='My Jobs'
                    labelIcon={<BriefcaseBusinessIcon size={15}/>}
                    href='/my-jobs'
                    />
                    <UserButton.Link
                    label='Saved Jobs'
                    labelIcon={<Heart size={15}/>}
                    href='/saved-jobs'
                    />
                </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          </div>
        </nav>
        {showSignIn&&
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleOverlayClick}>
            <SignIn
            signUpForceRedirectUrl='/onbarding'
            fallbackRedirectUrl='/onboarding'
            />
        </div>}
    </>
  )
}

export default Header