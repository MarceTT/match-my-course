import { MdInfoOutline } from "react-icons/md";

interface InfoButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

const InfoButton = ({
  onClick,
  label = "¿Qué incluye?",
  className = ""
}: InfoButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-400 hover:text-gray-600 flex items-center ${className}`}
    >
      <span className="text-xs mr-2">{label}</span>
      <MdInfoOutline className="w-5 h-5" />
    </button>
  );
};

export default InfoButton;
