"use client"

import React, { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import TransactionTypeBadge from "./TransactionTypeBadge"
import DeleteTransactionDialog from "@/components/dialogs/artist/DeleteTransactionDialog"
import { useArtistRevenueStore } from "@/zustandStore/artist/artistStore/artistRevenueStore"

const STATUS_STYLES = {
    Completed: "border-green-success/20 bg-green-success/10 text-green-success",
    Pending: "border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning",
    Failed: "border-red-error/20 bg-red-error/10 text-red-error",
}

const TransactionHistory = () => {
    const transactions = useArtistRevenueStore((state) => state.transactionHistory)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5

    const totalItems = transactions.length
    const totalPages = Math.ceil(totalItems / pageSize) || 1
    const paginatedTransactions = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <CommonCard className="flex flex-col gap-4 w-full">
            <h3 className="text-whitetext text-[16px] font-semibold z-10 relative">
                Transaction History
            </h3>

            <div className="overflow-x-auto z-10 relative">
                <table className="w-full border-collapse min-w-[640px]">
                    <thead>
                        <tr className="text-left text-dark-gray text-[11px] uppercase tracking-wider">
                            <th className="font-normal pb-3 pr-4">Date</th>
                            <th className="font-normal pb-3 pr-4">Type</th>
                            <th className="font-normal pb-3 pr-4">Description</th>
                            <th className="font-normal pb-3 pr-4">Amount</th>
                            <th className="font-normal pb-3 pr-4">Status</th>
                            <th className="font-normal pb-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTransactions.map((transaction) => {
                            const isPositive = transaction.amount >= 0
                            return (
                                <tr key={transaction.id} className="border-t border-white/[0.05]">
                                    <td className="py-3 pr-4 text-light-gray text-[13px] whitespace-nowrap">
                                        {transaction.date}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <TransactionTypeBadge type={transaction.type} />
                                    </td>
                                    <td className="py-3 pr-4 text-whitetext text-[13px]">
                                        {transaction.description}
                                    </td>
                                    <td className={`py-3 pr-4 text-[13px] font-medium whitespace-nowrap ${isPositive ? "text-green-success" : "text-red-error"}`}>
                                        {isPositive ? "+" : "-"}৳{Math.abs(transaction.amount).toLocaleString()}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium select-none ${STATUS_STYLES[transaction.status] || STATUS_STYLES.Completed}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-right">
                                        <DeleteTransactionDialog transaction={transaction}>
                                            <Button
                                                title="Delete Transaction"
                                                size="icon"
                                                variant="outline"
                                                className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                                            </Button>
                                        </DeleteTransactionDialog>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <CommonPagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="z-10 relative"
            />
        </CommonCard>
    )
}

export default TransactionHistory
