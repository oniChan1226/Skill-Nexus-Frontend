import { IconStar } from "@tabler/icons-react"
import Card, { CardContent } from "../shared/Card"
import Badge from "../shared/Badge"

const CommunitySpotlight = () => {
      const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I traded my design skills for coding lessons. Now I'm a full-stack designer! This platform changed my career.",
      rating: 5,
      skills: "Design → Development",
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Learned Spanish from a native speaker by teaching digital marketing. Amazing community and experience!",
      rating: 5,
      skills: "Marketing → Languages",
    },
    {
      name: "Emily Watson",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Exchanged programming tutorials for photography lessons. Love how easy it is to connect with like-minded people.",
      rating: 5,
      skills: "Programming → Photography",
    },
  ]

  return (
    <section id="community" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Spotlight</h2>
            <p className="text-lg text-gray-600">See how skill swapping has transformed careers and lives</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {/* <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar> */}
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <IconStar key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Badge  className="text-xs">
                      {testimonial.skills}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default CommunitySpotlight