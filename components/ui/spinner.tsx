import React from "react";

export const Spinner: React.FC<{ size?: string; color?: string }> = ({ size = "24px", color = "#4A90E2" }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTop: `4px solid transparent`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
  );
};

export default Spinner;

// Add CSS for spinner animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
