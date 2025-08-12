import { Button } from "@/components/ui/button"
import { montserrat } from "@/fonts"
import Link from "next/link"
const page =  () => {
  return (
    <>
      <section className="w-full h-screen text-center flex flex-col justify-center gap-2">
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