interface CoursePriceProps {
  amount: number;
  className?: string;
}

const CoursePrice = ({ amount, className = "" }: CoursePriceProps) => {
  return (
    <div className={`text-2xl font-bold ${className}`}>
      €{amount}
    </div>
  );
};

export default CoursePrice;
