import { Coins } from "lucide-react"

/**
 * Coin balance strip in the profile dropdown (`coinBalance` on /users/me).
 */
const UserProfileMenuCoinBalance = ({ coinBalance }) => {
    return (
        <div className="mx-2 my-1 flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/5 px-3 py-2">
            <Coins className="size-4 shrink-0 text-yellow-warning" />
            <span className="flex-1 text-[12px] text-light-gray">Coin Balance</span>
            <span className="text-[13px] font-semibold text-whitetext">
                {typeof coinBalance === "number" ? coinBalance.toLocaleString() : "-"}
            </span>
        </div>
    )
}

export default UserProfileMenuCoinBalance
