import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image src="" alt="logo" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            PRODUCTIFY
          </p>
        </Link>

        <p className="text-sm text-gray-400">@ 2026 PRODUCTIFY.</p>
        <p className="text-sm text-gray-400">All rights reserved</p>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/" className="hover:text-gray-100">Homepage</Link>
        <Link href="/" className="hover:text-gray-100">Contact</Link>
        <Link href="/" className="hover:text-gray-100">Terms of Service</Link>
        <Link href="/" className="hover:text-gray-100">Privacy Policy</Link>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/" className="hover:text-gray-100">All Products</Link>
        <Link href="/" className="hover:text-gray-100">New Arrivals</Link>
        <Link href="/" className="hover:text-gray-100">Best Sellers</Link>
        <Link href="/" className="hover:text-gray-100">Sale</Link>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/" className="hover:text-gray-100">About</Link>
        <Link href="/" className="hover:text-gray-100">Contact</Link>
        <Link href="/" className="hover:text-gray-100">Blog</Link>
        <Link href="/" className="hover:text-gray-100">Affiliate Program</Link>
      </div>
    </div>
  );
};

export default Footer;
