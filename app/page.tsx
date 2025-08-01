import { Button } from "@/components/ui/button"
import { montserrat } from "@/fonts"
import Link from "next/link"
const page =  () => {
  return (
    <>
      <section className="w-full h-screen flex flex-col gap-2.5 flex-1 justify-center items-center">
        <h1 className={`${montserrat.className} text-7xl tracking-tighter`}>My Buddy</h1>
        <Link href="/plans">
        <Button
        variant="outline"
        >
        Get started.
        </Button>
        </Link>
      </section>
    </>
  )
}

export default page