import { useLang } from "@/context/LanguageContext";
import { Quote, Star } from "lucide-react";

const reviewData = [
  {
    name: "Jetha Shahru",
    avatar: "JS",
    rating: 5,
    date: "March 2024",
    text: "I have been a patient here for over 3 years. Dr. Mashru is incredibly knowledgeable and takes time to listen. The staff is always welcoming and professional. Highly recommend!",
  },
  {
    name: "Asha Shahru",
    avatar: "AS",
    rating: 5,
    date: "February 2024",
    text: "Very satisfied with the care I received. The clinic is well-maintained and the doctor addresses all concerns thoroughly. I appreciate the inclusive and compassionate environment.",
  },
  {
    name: "Atan Diler",
    avatar: "AD",
    rating: 4,
    date: "January 2024",
    text: "Good clinic, experienced doctor, and convenient location near Charni Road. Appointment process is smooth. Waiting time can be a bit long during peak hours but worth the wait.",
  },
  {
    name: "Priya Mehta",
    avatar: "PM",
    rating: 5,
    date: "December 2023",
    text: "Extremely professional and warm atmosphere. Dr. Mashru was patient and explained everything clearly. I felt completely comfortable and cared for throughout my visit.",
  },
  {
    name: "Rajan Bose",
    avatar: "RB",
    rating: 5,
    date: "November 2023",
    text: "One of the best clinics in Girgaon. Clean facilities, knowledgeable staff, and the doctor truly cares about patient wellbeing. Appreciate the LGBTQ+ inclusive approach.",
  },
  {
    name: "Sunita Patil",
    avatar: "SP",
    rating: 4,
    date: "October 2023",
    text: "Convenient location near HN Reliance Hospital. Doctor is thorough and the consultation was detailed. Affordable for the quality of care provided. Will definitely return.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(count);
        const half = !filled && i === Math.ceil(count) && count % 1 !== 0;
        return (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              filled
                ? "text-amber-400 fill-amber-400"
                : half
                  ? "text-amber-400 fill-amber-400/50"
                  : "text-muted-foreground/40"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ReviewsSection() {
  const { t } = useLang();

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full">
              {t.reviews.badge}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground text-balance">
              {t.reviews.heading}
            </h2>
            <p className="mt-3 text-muted-foreground text-base">
              {t.reviews.subheading}
            </p>
          </div>

          {/* Overall rating pill */}
          <div
            data-ocid="reviews.overall_rating"
            className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-3 shadow-subtle shrink-0"
          >
            <div className="text-center">
              <p className="font-display font-bold text-4xl text-foreground leading-none">
                4.5
              </p>
              <StarRating count={4.5} />
              <p className="text-xs text-muted-foreground mt-1">85 reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div
          data-ocid="reviews.list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviewData.map((r, i) => (
            <div
              key={r.name}
              data-ocid={`reviews.item.${i + 1}`}
              className="bg-card rounded-2xl p-6 border border-border shadow-subtle hover:shadow-elevated transition-smooth flex flex-col gap-4"
            >
              <Quote className="w-6 h-6 text-accent/40" />
              <p className="text-foreground text-sm leading-relaxed flex-1">
                {r.text}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-xs">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <StarRating count={r.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* See all link */}
        <div className="text-center mt-8">
          <a
            href="https://mumbaiclinic.com"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="reviews.see_all_link"
            className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline transition-smooth"
          >
            {t.reviews.seeAll} →
          </a>
        </div>
      </div>
    </section>
  );
}
