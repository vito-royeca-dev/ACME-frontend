import React from "react";

interface TdProps {
  text: string | number
}

const Td: React.FC<TdProps> = ({text}) => {
  return <td className="px-6 py-4 whitespace-nowrap">{text}</td>
}

export default Td;