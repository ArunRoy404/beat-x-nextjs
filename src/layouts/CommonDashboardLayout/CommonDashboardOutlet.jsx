const CommonDashboardOutlet = ({ children }) => {
    return (
        <div className="flex flex-1 flex-col gap-6 px-6 py-8">
            {children}
        </div>
    );
};

export default CommonDashboardOutlet;