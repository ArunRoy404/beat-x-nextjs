import DownloadRow from "./DownloadRow"

const DownloadsTable = ({ items }) => {
    return (
        <div className="flex w-full flex-col gap-2 rounded-[16px] bg-slate-800/40 p-4 backdrop-blur-[20px]">
            <div className="hidden w-full items-center px-4 py-2 text-xs font-semibold text-light-gray sm:flex">
                <span className="flex-1">TITLE &amp; ARTIST</span>
                <span className="flex-1 text-center">FORMAT</span>
                <span className="flex-1 text-center">SIZE</span>
                <span className="flex-1 text-right">STATUS</span>
            </div>

            <div className="flex w-full flex-col gap-2">
                {items.map((item) => (
                    <DownloadRow key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default DownloadsTable
