import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='w-screen h-screen flex items-center flex-col justify-center bg-white'>
            <h1 className='text-2xl font-medium'>Page Not found – 404!</h1>
            <div>
                <Link href="/" className='underline text-blue-400'>Go back to Home</Link>
            </div>
        </div>
    )
}