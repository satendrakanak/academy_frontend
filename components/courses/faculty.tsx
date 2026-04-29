"use client";

import Image from "next/image";

const faculty = [
  {
    name: "Dr. Amit Sharma",
    role: "Clinical Nutrition Expert",
    image: "/assets/faculty-1.jpg",
  },
  {
    name: "Dr. Neha Verma",
    role: "Health & Lifestyle Coach",
    image: "/assets/faculty-2.jpg",
  },
  {
    name: "Dr. Rahul Singh",
    role: "Diet & Wellness Specialist",
    image: "/assets/faculty-3.jpg",
  },
  {
    name: "Dr. Priya Kapoor",
    role: "Senior Nutrition Consultant",
    image: "/assets/faculty-4.jpg",
  },
];

export default function Faculty() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 mb-2">Our Experts</p>

          <h2 className="text-4xl font-bold text-gray-900">Meet Our Faculty</h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Learn from industry experts with years of real-world experience.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {faculty.map((item, index) => (
            <div key={index} className="group text-center">
              {/* IMAGE */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* NAME */}
              <h3 className="font-semibold text-gray-900 text-lg">
                {item.name}
              </h3>

              {/* ROLE */}
              <p className="text-sm text-gray-500 mt-1">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
