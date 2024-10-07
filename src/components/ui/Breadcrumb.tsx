"use client";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CSSProperties } from 'react';

// Define the home breadcrumb item
const home: BreadcrumbItemType = {
  title: (
    <>
      <HomeOutlined />
      <span><Link href="/">Home</Link></span>
    </>
  ),
};

const Breadcrumb = ({ style }: { links?: BreadcrumbItemType[]; style?: CSSProperties }) => {
  const pathname = usePathname(); // Safely get the pathname on the client side
  const [clientPath, setClientPath] = useState<string | null>(null);

  useEffect(() => {
    // Set the client path only when the component mounts on the client side
    setClientPath(pathname);
  }, [pathname]);

  if (!clientPath) {
    return null; // Return null during SSR or when client path is not set
  }

  // Split the pathname and generate links for each path segment
  const pathElements = clientPath.split('/').filter(path => path); // Filter out empty strings
  const links: BreadcrumbItemType[] = pathElements.map((path, index) => {
    const href = '/' + pathElements.slice(0, index + 1).join('/');
    return {
      title: <Link href={href}>{path}</Link>,
      href,
    };
  });

  // Merge home with dynamically generated links
  const updatedLinks: BreadcrumbItemType[] = [home, ...links];

  return (
    <AntBreadcrumb
      items={updatedLinks}
      className="font-medium text-sm"
      style={style}
    />
  );
};

export default Breadcrumb;
