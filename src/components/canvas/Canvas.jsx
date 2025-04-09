import React from 'react';

const TopViewCar = ({ x, y, width, height, color = '#888' }) => {
  return (
    <g>
      {/* Thân xe */}
      <rect 
        x={x + 3} 
        y={y + 5} 
        width={width - 6} 
        height={height - 10} 
        rx={5} 
        fill={color} 
      />

      {/* Kính chắn gió trước */}
      <rect 
        x={x + 5} 
        y={y + 7} 
        width={width - 10} 
        height={6} 
        rx={2} 
        fill="#444" 
        opacity={0.6} 
      />

      {/* Kính chắn gió sau */}
      <rect 
        x={x + 5} 
        y={y + height - 13} 
        width={width - 10} 
        height={6} 
        rx={2} 
        fill="#444" 
        opacity={0.6} 
      />

      {/* Nội thất / kính mái */}
      <rect 
        x={x + 7} 
        y={y + 14} 
        width={width - 14} 
        height={height - 28} 
        fill="#bbb" 
        opacity={0.4} 
      />

      {/* Đèn hậu */}
      <circle 
        cx={x + 7} 
        cy={y + height - 8} 
        r={2} 
        fill="red" 
      />
      <circle 
        cx={x + width - 7} 
        cy={y + height - 8} 
        r={2} 
        fill="red" 
      />

      {/* Đèn trước */}
      <circle 
        cx={x + 7} 
        cy={y + 8} 
        r={2} 
        fill="#FFBF00" 
      />
      <circle 
        cx={x + width - 7} 
        cy={y + 8} 
        r={2} 
        fill="#FFBF00" 
      />
    </g>
  );
};

export default TopViewCar;
