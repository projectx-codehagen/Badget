"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

// @ts-ignore
const PropertiesTable = ({ properties }) => {
  const [sortKey, setSortKey] = useState("createdAt"); // default sort key
  const [sortOrder, setSortOrder] = useState("desc"); // default sort order
  const [filter, setFilter] = useState("");

  // Sort and filter the properties
  const sortedFilteredProperties = properties
    // @ts-ignore
    .filter((property) =>
      property.address.toLowerCase().includes(filter.toLowerCase()),
    )
    // @ts-ignore
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // @ts-ignore
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Filter by address..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 w-full rounded-md border-2 px-4 py-2"
      />
      <Table>
        <TableCaption>A list of your properties.</TableCaption>
        <thead>
          <TableRow>
            <TableHead onClick={() => toggleSort("address")}>Address</TableHead>
            <TableHead onClick={() => toggleSort("createdAt")}>
              Date Added
            </TableHead>
          </TableRow>
        </thead>
        <TableBody>
          {/* @ts-ignore */}
          {sortedFilteredProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <Link href={`/property/${property.id}`}>
                  {property.address}
                </Link>
              </TableCell>
              <TableCell>
                {new Date(property.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PropertiesTable;
