import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

export default function HeaderSection() {
  const bgUrl = rewriteToCDN("https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Escuelas-de-ingles-asociadas-MatchMyCourse.webp");
  return (
    <section className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Escuelas Socias
        </h1>
      </div>
    </section>
  )
}
