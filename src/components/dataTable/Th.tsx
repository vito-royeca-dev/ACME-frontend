import React from "react";

interface ThProps {
  text: string
}

const Th: React.FC<ThProps> = ({text}) => {
  return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{text}</th>
}

export default Th;