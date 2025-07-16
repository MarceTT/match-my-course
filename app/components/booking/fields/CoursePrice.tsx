interface CoursePriceProps {
  amount: number;
  offer?: number;
  className?: string;
  text?: string;
}

const CoursePrice = ({ amount, offer, className = "", text }: CoursePriceProps) => {
  return (
    <div className={`text-2xl font-bold ${className}`}>
      {offer ? (
        <>
          <span className="text-[#16A349] font-extrabold">€{offer}</span>
          <span className="text-sm text-gray-500 line-through ml-2">
            €{amount}
          </span>
        </>
      ) : (
        <>€{amount}</>
      )}
     <p className="text-[0.75rem] text-gray-500 leading-snug mt-1">{text}</p>
    </div>
  );
};

export default CoursePrice;
