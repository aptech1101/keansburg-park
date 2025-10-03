import React from "react";
import QRCode from "react-qr-code";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title?: string;
  className?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 120, title, className }) => {
  if (!value) return null;

  return (
    <div className={className || "text-center"}>
      {title && <h6 className="mb-2">{title}</h6>}
      <div className="border rounded p-2 d-inline-block bg-white">
        <QRCode
          value={value}
          size={size}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
        />
      </div>
      <small className="text-muted d-block mt-1" style={{ wordBreak: "break-all" }}>{value}</small>
    </div>
  );
};

export default QRCodeDisplay;


