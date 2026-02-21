"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const SearchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname(); //give the current path

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(SearchParams);
    params.set("sort", value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Sory by:</span>
      <select
        name="sort"
        id="sort"
        className="ring-1 ring-gray-200 shadow-md p-1 rounded-sm"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="desc">Price: Low to high</option>
        <option value="asc">Price: High to low</option>
      </select>
    </div>
  );
};

export default Filter;
