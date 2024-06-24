import React from 'react';
import Image from 'next/image';

const Bookmarks = () => {
  return (
    <div className="flex items-start justify-center h-full pt-2">
      <Image src="/Bookmarks.png" alt="Bookmarks" width={50} height={50} />
    </div>
  );
}

export default Bookmarks;
