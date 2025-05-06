"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import DialogMatch from "@/app/components/common/DialogMatch"

export default function DialogSection() {
  const [openAsesoria, setOpenAsesoria] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpenAsesoria(true)}
        className="bg-[#FFA500] hover:bg-[#FF9900] text-black font-semibold px-8 py-2 text-xl h-auto rounded-full border border-[#000]"
      >
        Agendar asesoría
      </Button>
      <DialogMatch open={openAsesoria} onOpenChange={setOpenAsesoria} />
    </>
  )
}
