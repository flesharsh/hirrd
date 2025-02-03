import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import comapnies from "../data/companies.json"
import faqs from "../data/faq.json"
import Autoplay from 'embla-carousel-autoplay'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const LandingPage = () => {
  return (
   <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
    <section className='text-center'>
      <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold  sm:text-6xl lg:text-8xl tracking-tighter py-4'>
        Find your dream job {""}
         <span className='flex items-center gap-2 sm:gap-6'>
          and get {""}
           <img 
           src="./logo.png" 
           alt="Hirrd logo" 
           className='h-14 sm:h-24 lg:h-32' 
           />
          </span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore the thousands of job listings or find the perfect candidate
        </p>
    </section>
    <div className='flex gap-6 justify-center'>
      <Link to='/jobs'>
      <Button variant="blue" size="xl">Find Jobs</Button>
      </Link>
      <Link to='/post-job'>
      <Button variant="destructive" size="xl">Post a job</Button>
      </Link>
    </div>
    {/* {carousel} */}
    <Carousel 
    plugins ={[Autoplay({delay:2000,})]}
    className="w-full py-10">
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
      {comapnies.map(({name,id,path})=>{
        return (
        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
          <img 
          src={path} 
          alt={name}
          className='h-9 sm:h-14 object-contain' />
        </CarouselItem>);
      }) }
      </CarouselContent>
    </Carousel>

    {/* banner */}
    <img src="/banner.jpeg" alt="" className='w-full' />

    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {/* cards */}
      <Card>
        <CardHeader>
          <CardTitle>For Job Seekers</CardTitle>
        </CardHeader>
        <CardContent>
          Search and apply for jobs, track application, and more
        </CardContent>
    </Card>
    <Card>
        <CardHeader>
          <CardTitle>For Employers</CardTitle>
        </CardHeader>
        <CardContent>
          Post Jobs, manage application, and find the best candidates.
        </CardContent>
    </Card>
    </section>

    {/* accordian */}
    <Accordion type="single" collapsible>
      {faqs.map((faq,index)=>{
      return (
      <AccordionItem key={index} value={`item-${index +1}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
      );
      })}
  </Accordion>

   </main>
  )
}

export default LandingPage