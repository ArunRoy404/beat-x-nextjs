const ProfileSectionHeader = ({ title, description }) => {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold text-whitetext">{title}</h2>
            {description && <p className="text-[13px] text-light-gray">{description}</p>}
        </div>
    )
}

export default ProfileSectionHeader
