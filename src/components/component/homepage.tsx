"use client"
import React, { useState } from 'react'
import FlashCard from './FlashCard';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link';

export default function homepage({ session }: any) {
  console.log(session);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashCards, setFlashCards] = useState([]);
  const [title, setTitle] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSavingFlashCards = async () => {
    const res = await fetch(`/dashboard/posttodb/api`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
      body: JSON.stringify({
        title: title,
        email: session.user.email,
        flashCards: flashCards
      })
    })
    if (!res.ok || res.status === 500) {
      console.log(res);
      console.log("error saving data");
      return;
    }
    else if (res.status === 200) {
      const result = await res.json();
      setIsDialogOpen(false);
    }



  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/dashboard/api", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({
        data: prompt
      })
    })
    setLoading(false);

    if (!res.ok) {
      console.log("error generating a response")
      return;
    }
    if (res.status == 200) {
      const result = await res.json();
      const data = result;
      setFlashCards(data.flashcards);
      console.log("result is", data.flashcards[0].front);
    }

  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className=' flex flex-col items-center '>
      <div className='w-3/5 mx-auto mt-20'>
        <form action="#" className='flex flex-col' onSubmit={(e) => { handleSubmit(e) }}>
          <textarea name="prompt" id="prompt" className='text-black pb-60  border-[1px] border-gray-800 shadow-md shadow-gray-100 focus:border-blue-950  focus:outline-none rounded-md ' value={prompt} onChange={(e) => { setPrompt(e.target.value) }} onKeyDown={handleKeyDown}></textarea>
          <button type='submit' className='btn-primary'>Generate Flashcards</button>
        </form>
      </div>
      <div className='flex flex-row flex-wrap gap-x-4 gap-y-3 mt-4 mx-auto w-full max-w-6xl justify-center mb-5'>
        {flashCards.map((element, index) => (
          <div key={index} className=''>
            <FlashCard question={element.front} answer={element.back} />
          </div>
        ))}
      </div>
      {loading && <img src="/rolling3.svg" alt="" className='mx-auto' />}
      <div className='flex flex-row gap-x-2'>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger asChild>
            <button
              disabled={flashCards.length === 0}
              className={`btn-primary mx-auto px-1 py-1 ${flashCards.length === 0 ? 'bg-gray-500 hover:bg-gray-500' : ''}`}
            >
              Save Flashcards
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-bl from-purple-500  to-purple-950">
            <DialogHeader>
              <DialogTitle>Save Cards</DialogTitle>
              <DialogDescription className='font-semibold'>
                enter title for for the cards to save.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right mr-3">
                  Title
                </Label>
                <Input
                  id="name"
                  placeholder='title'
                  className="col-span-3  text-black border-2 focus:border-slate-900 focus:outline-none outline-none"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSavingFlashCards} className='bg-purple-500 font-semibold'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link href={"/dashboard/mycards"}><button className='btn-primary px-2' >View my cards</button></Link>
      </div>

    </div>
  )
}
