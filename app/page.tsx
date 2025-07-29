import { Button } from "@/components/ui/button"
import { montserrat } from "@/fonts"
const page = () => {
  return (
    <>
      <section className="w-full h-screen flex flex-col gap-2.5 flex-1 justify-center items-center">
        <h1 className={`${montserrat.className} text-7xl tracking-tighter`}>My Buddy</h1>
        <Button
        variant="outline"
        >Get started.
        </Button>
      </section>
    </>
  )
}

export default page