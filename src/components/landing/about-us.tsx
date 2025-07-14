import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Akshat Jain",
    role: "CEO & Co-Founder",
    image: "/images/akshatspic.jpeg",
    description: "Problem-solving leader leveraging algorithms to optimize logistics, supply chains, and operations."
  },
  {
    name: "Nishit Tomar",
    role: "CTO & Co-Founder",
    image: "/images/nishitspic.jpeg",
    description: "AI engineer who solves real-world problems using logic, code, and smart routing algorithms."
  },
  {
    name: "Raj Bathla",
    role: "CFO & Co-Founder",
    image: "/images/rajspic.jpeg",
    description:
      "Product strategist passionate about creating user-centric solutions for complex logistics challenges."
  },
]

const AboutUs = () => {
  return (
    <section id="about-us" className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">About Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Meet the team behind AlgoMile's revolutionary delivery optimization platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                <p className="text-primary font-medium">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold font-headline mb-4">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            We're on a mission to revolutionize last-mile delivery through intelligent routing algorithms. By combining
            cutting-edge AI with deep logistics expertise, we help businesses reduce costs, improve delivery times, and
            create better experiences for their customers.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
