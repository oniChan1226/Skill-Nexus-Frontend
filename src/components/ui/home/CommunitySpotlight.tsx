import { IconStar } from "@tabler/icons-react";
import Card, { CardContent } from "../../shared/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const CommunitySpotlight = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer",
      avatar: "/Images/avatars/user-01.jpg",
      content:
        "I traded my design skills for coding lessons. Now I'm a full-stack designer! This platform changed my career.",
      rating: 5,
      skills: "Design → Development",
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Specialist",
      avatar: "/Images/avatars/user-01.jpg",
      content:
        "Learned Spanish from a native speaker by teaching digital marketing. Amazing community and experience!",
      rating: 5,
      skills: "Marketing → Languages",
    },
    {
      name: "Emily Watson",
      role: "Software Engineer",
      avatar: "/Images/avatars/user-01.jpg",
      content:
        "Exchanged programming tutorials for photography lessons. Love how easy it is to connect with like-minded people.",
      rating: 5,
      skills: "Programming → Photography",
    },
    {
      name: "John Doe",
      role: "Frontend Developer",
      avatar: "/Images/avatars/user-01.jpg",
      content:
        "Swapped React mentorship for Figma lessons. Helped both of us grow faster. Love the concept!",
      rating: 5,
      skills: "Frontend → UI Design",
    },
    {
      name: "Anna Smith",
      role: "Illustrator",
      avatar: "/Images/avatars/user-01.jpg",
      content:
        "Taught character illustration while learning about product management. Unexpected but amazing!",
      rating: 5,
      skills: "Art → Product",
    },
  ];

  return (
    <section id="community" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Community Spotlight
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/90">
            See how skill swapping has transformed careers and lives
          </p>
        </div>

        <div className="relative overflow-hidden rounded-md">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            speed={10000}
            allowTouchMove={false}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
            grabCursor={true}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-dark-400 bg-white/40 dark:bg-white/5 h-full">
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className="h-14 w-14 mr-4 rounded-full overflow-hidden">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-white/90">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-white/70 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <IconStar
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <div className="text-xs dark:text-white font-medium tracking-wide px-3 py-1 border border-gray-300 dark:border-dark-400/90 rounded-full">
                        {testimonial.skills}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;
