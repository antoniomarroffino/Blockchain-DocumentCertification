import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import supsiLogo from "../../assets/supsi-logo.png";

const developers = [
  {
    name: "Antonio Marroffino",
    instagram: "https://instagram.com/anto.marro",
    role: "Full Stack Developer",
    github: "https://github.com/antoniomarroffino",
    linkedin: "https://www.linkedin.com/in/antoniomarroffino",
  },
  {
    name: "Luca Fantò",
    instagram: "https://instagram.com/luca_fanto_",
    role: "Full Stack Developer",
    github: "https://github.com/lucafanto",
    linkedin: "https://www.linkedin.com/in/luca-fant%C3%B2-14197232a/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-base-200 via-base-100 to-base-50 border-t border-base-300 relative overflow-hidden">
      {/* Effetti di background dinamici */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-72 h-72 bg-primary/10 rounded-full -top-32 -left-32 mix-blend-soft-light animate-float"></div>
        <div className="absolute w-64 h-64 bg-secondary/10 rounded-full top-1/2 right-0 mix-blend-soft-light animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        <div className="flex flex-col xl:flex-row gap-12 items-start justify-between">
          {/* Sezione Logo con effetto vetro */}
          <div className="flex flex-col items-start space-y-6 max-w-md">
            <div className="p-4 backdrop-blur-lg bg-base-100/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300/30">
              <img
                src={supsiLogo}
                alt="SUPSI Logo"
                className="h-20 opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-sm text-neutral/70 font-light">
              © {new Date().getFullYear()} CertifyChain
              <br />
              Made with ❤️ and ☕ in Lugano
            </p>
          </div>

          {/* Card Sviluppatori con effetto parallax */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 max-w-4xl">
            {developers.map((dev, index) => (
              <div
                key={dev.name}
                className="group bg-base-100/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300/20 hover:border-primary/20 relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Effetto hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {dev.name}
                      </h3>
                      <p className="text-sm text-neutral/80 mt-1">{dev.role}</p>
                    </div>
                    <div className="flex space-x-3">
                      {[
                        {
                          icon: FaInstagram,
                          href: dev.instagram,
                          color: "#E1306C",
                        },
                        { icon: FaGithub, href: dev.github, color: "#333" },
                        {
                          icon: FaLinkedin,
                          href: dev.linkedin,
                          color: "#0A66C2",
                        },
                      ].map((social) => (
                        <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                          style={
                            {
                              "--hover-color": social.color,
                            } as React.CSSProperties
                          }
                        >
                          <social.icon className="w-5 h-5 text-neutral/80 hover:text-[var(--hover-color)] transition-colors duration-300" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
