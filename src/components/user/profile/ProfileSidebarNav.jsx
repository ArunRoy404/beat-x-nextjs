import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import ProfileSidebarNavItem from "./ProfileSidebarNavItem"

/**
 * Section switcher for the profile page. Scrolls horizontally on small
 * screens and sits as a sticky column from `lg` up.
 */
const ProfileSidebarNav = ({ sections, activeSection, onSelect }) => {
    return (
        <CommonGlassPanel className="w-full shrink-0 p-2 lg:sticky lg:top-6 lg:w-64">
            <nav className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                {sections?.map((section) => (
                    <div key={section?.id} className="shrink-0 lg:w-full">
                        <ProfileSidebarNavItem
                            icon={section?.icon}
                            title={section?.title}
                            isActive={section?.id === activeSection}
                            onClick={() => onSelect(section?.id)}
                        />
                    </div>
                ))}
            </nav>
        </CommonGlassPanel>
    )
}

export default ProfileSidebarNav
