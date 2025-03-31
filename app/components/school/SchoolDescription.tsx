import React from "react";

interface SchoolDescriptionProps {
  description: string;
}

const SchoolDescription = ({ description }: SchoolDescriptionProps) => {
  if (!description) return null;

  const paragraphs = description
    .split(/\n+/) // divide por 1 o más saltos de línea
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Escuela</h2>
        <div className="space-y-4 text-gray-600">
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text.trim()}</p>
          ))}
        </div>
        <div className="hidden lg:block lg:divide-y-2 lg:divide-gray-300 lg:mt-1">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SchoolDescription;
