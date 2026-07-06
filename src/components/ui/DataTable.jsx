"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable({
  columns,
  data,
  tableInstance,
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  cellClassName,
  showBackground = true,
  backgroundImage = "/bg-images/card_bg.png",
  overlayClassName = "bg-black/50",
}) {
  const defaultTable = useReactTable({
    data: data || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
  })

  const table = tableInstance || defaultTable

  return (
    <div className={cn("w-full overflow-x-auto rounded-none relative z-10 bg-transparent", className)}>
      {showBackground && (
        <>
          {/* Background Image Layer (10% Opacity) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-10"
            style={{ 
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Black Overlay */}
          <div className={cn("absolute inset-0 z-0 pointer-events-none", overlayClassName)} />
        </>
      )}

      <Table className={cn("w-full border-collapse text-left relative z-10 border-0", tableClassName)}>
        <TableHeader className={cn("bg-background border-0", headerClassName)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-0 hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead 
                  key={header.id} 
                  className="p-4 text-[16px] font-normal text-light-gray h-auto border-0"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-0">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn("border-0 transition-colors bg-transparent hover:bg-white/[0.02]", rowClassName)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("p-4 border-0 text-light-gray text-[14px]", cellClassName)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-0 hover:bg-transparent">
              <TableCell colSpan={columns?.length || 1} className="h-24 text-center text-muted-foreground border-0">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
