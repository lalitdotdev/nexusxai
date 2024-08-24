import { HomePage } from "@/components/globalTemplates/Homepage";
import { Icons } from "@/components/atoms/Icons";

export default async function Home() {
    return (
        <main className="mt-10 p-8 ">
            <h1 className=" font-semibold text-3xl mb-4 ">Your
                <span className='relative px-2'>
                    Recommended{' '}
                    <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500' />
                </span>{' '}
                articles</h1>
            {/* <hr className="border-gray-400 my-4" /> */}
            <div className="p-2 ">
                <HomePage />
            </div>

        </main>
    )
}
