"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Article } from "@/types/article";
import { ArticleCard } from "./article-card";

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (!articles?.length) return null;

  return (
    <section className="py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Related Courses
          </h2>
          <p className="text-gray-500 mt-2">
            Explore more courses similar to this one
          </p>
        </div>
      </div>

      {/* 🔥 SLIDER */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={article.id || index}>
            <div className="h-full">
              <ArticleCard article={article} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
