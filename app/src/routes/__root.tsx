import { createRootRoute,  Outlet } from '@tanstack/react-router'
export const Route = createRootRoute({
    component: () => <Index />
})


function Index () {



    return (
        <div className='h-screen w-screen'>
            <Outlet/>
        </div>
    )
}