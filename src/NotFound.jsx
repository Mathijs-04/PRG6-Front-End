function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-2">404</h1>
            <h2 className="text-4xl mb-2">There is no page here</h2>
            <img className="mt-4 size-1/12"
                 src="https://png.pngtree.com/png-clipart/20240512/original/pngtree-burning-laptop-on-desk-office-fire-hazard-png-image_15075167.png"
                 alt="404"/>
        </div>
    )
}

export default NotFound;
