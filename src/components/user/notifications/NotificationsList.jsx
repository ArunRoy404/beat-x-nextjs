import NotificationRow from "./NotificationRow"

const GROUP_LABELS = {
    yesterday: "YESTERDAY",
}

const NotificationsList = ({ notifications }) => {
    const todayNotifications = notifications.filter((n) => n.group === "today")
    const yesterdayNotifications = notifications.filter((n) => n.group === "yesterday")

    return (
        <div className="flex w-full flex-col gap-6">
            {todayNotifications.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                    {todayNotifications.map((notification) => (
                        <NotificationRow key={notification.id} notification={notification} />
                    ))}
                </div>
            )}

            {yesterdayNotifications.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                    <span className="text-sm text-light-gray">{GROUP_LABELS.yesterday}</span>
                    {yesterdayNotifications.map((notification) => (
                        <NotificationRow key={notification.id} notification={notification} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotificationsList
