const CommonTableContainer = ({ children, headerChildren }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Search and Filters Bar */}
            {
                !!headerChildren && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full z-10 relative">
                        {headerChildren}
                    </div>
                )
            }

            {/* Reusable DataTable */}
            {children}
        </div>
    );
};

export default CommonTableContainer;