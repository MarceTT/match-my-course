"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import DialogMatch from "@/components/common/DialogMatch"

export default function DialogSection() {
  const [openAsesoria, setOpenAsesoria] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpenAsesoria(true)}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition"
      >
        Agendar asesoría
      </Button>
      <DialogMatch open={openAsesoria} onOpenChange={setOpenAsesoria} />
    </>
  )
}
