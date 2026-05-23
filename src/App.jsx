import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPython,
  FaReact,
  FaAward,
  FaCertificate,
  FaPaperPlane,
  FaArrowUp,
} from "react-icons/fa";
import { SiFastapi, SiMysql } from "react-icons/si";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function TypeWriter() {
  const roles = [
    "Python Developer",
    "Full Stack Developer",
    "FastAPI Developer",
    "Data Science Enthusiast",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 140);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 70);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="text-cyan-400">
      {roles[roleIndex].slice(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function SectionTitle({ badge, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-3 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
        {badge}
      </p>
      <h2 className="text-4xl font-black text-white md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}

function ProjectImage({ src, title }) {
  return (
    <div className="relative h-60 overflow-hidden bg-linear-to-br from-cyan-500/20 to-purple-500/20">
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.innerHTML = `<div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;font-size:28px;font-weight:800;color:#67e8f9;background:linear-gradient(135deg,rgba(34,211,238,.15),rgba(168,85,247,.15))">${title}</div>`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-70" />
    </div>
  );
}

export default function App() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [showTop, setShowTop] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const navItems = [
    "about",
    "skills",
    "projects",
    "experience",
    "certificates",
    "contact",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);

      let current = "about";
      navItems.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY + 160 >= section.offsetTop) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setToast("");

    const name = formRef.current.user_name.value.trim();
    const email = formRef.current.user_email.value.trim();
    const message = formRef.current.message.value.trim();
    const botField = formRef.current.bot_field.value;

    if (botField) {
      setSending(false);
      return;
  }

    if (name.length < 3) {
      setToast("Please enter a valid name.");
      setSending(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setToast("Please enter a valid email.");
      setSending(false);
      return;
    }

  if (message.length < 10) {
    setToast("Message should be at least 10 characters.");
    setSending(false);
    return;
  }

  const now = Date.now();

  if (now - lastSentTime < 60000) {
    setToast("Please wait 1 minute before sending another message.");
    setSending(false);
    return;
  }

setLastSentTime(now);

    emailjs
      .sendForm(
        "service_rkxth8d",
        "template_ocwasa4",
        formRef.current,
        "JgK6zVBdY0zBs0fIa"
      )
      .then(
        () => {
          setToast("Message sent successfully!");
          formRef.current.reset();
          setSending(false);
          setTimeout(() => setToast(""), 3500);
        },
        (error) => {
          console.error(error);
          setToast("Failed to send message. Please try email directly.");
          setSending(false);
          setTimeout(() => setToast(""), 3500);
        }
      );
  };

  const skillCategories = [
    {
      title: "Languages",
      items: ["Python", "JavaScript (ES6+)", "SQL", "C"],
      icon: "💻",
    },
    {
      title: "Backend",
      items: [
        "FastAPI",
        "Flask",
        "RESTful APIs",
        "JWT Authentication",
        "WebSockets",
      ],
      icon: "⚙️",
    },
    {
      title: "Frontend",
      items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      icon: "🎨",
    },
    {
      title: "Databases",
      items: ["MySQL", "PostgreSQL", "SQLite"],
      icon: "🗄️",
    },
    {
      title: "Tools",
      items: ["Git", "GitHub", "Docker", "VS Code", "Cisco Packet Tracer"],
      icon: "🛠️",
    },
  ];

  const projects = [
    {
      title: "FraudShield",
      img: "/fraudshield.png",
      tech: ["React", "FastAPI", "MySQL", "Machine Learning"],
      desc: "Real-time fraud detection dashboard with transaction monitoring, risk scoring, fraud alerts, analytics, and reports.",
    },
    {
      title: "Campus Security System",
      img: "/campus-security.png",
      tech: ["Python", "Flask", "OpenCV", "MySQL"],
      desc: "Vehicle monitoring system with number plate recognition, authentication, search, image previews, and entry records.",
    },
    {
      title: "Association Website",
      img: "/association.png",
      tech: ["HTML", "CSS", "JavaScript"],
      desc: "Responsive website for the Computer Science Association with event, team, about, and contact sections.",
    },
    {
      title: "Cisco Network Security",
      img: "/network.png",
      tech: ["Packet Tracer", "VLAN", "ACL", "SSH"],
      desc: "Secure network configuration with VLANs, ACLs, routing, switching, and SSH.",
    },
  ];

  const certificates = [
  {
    title: "HackerRank Python Basic",
    image: "/certificates/hackerrank-python.png",
  },
  {
    title: "EchoBrains Internship",
    image: "/certificates/echobrains.png",
  },
  {
    title: "Infosys Springboard",
    image: "/certificates/infosys.png",
  },
  {
    title: "TATA Forage Cybersecurity",
    image: "/certificates/tata-forage.png",
  },
  {
    title: "Udemy Python Bootcamp",
    image: "/certificates/udemy-python.png",
  },
];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <div className="mx-auto mb-6 h-20 w-20 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />
          <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-4xl font-black text-transparent">
            Rahul M Nayak
          </h1>
          <p className="mt-3 text-slate-400">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#22d3ee33,transparent_30%),radial-gradient(circle_at_bottom_right,#a855f733,transparent_35%)]" />

      {toast && (
        <div className="fixed right-5 top-24 z-[100] rounded-2xl border border-cyan-400/30 bg-[#07111f]/95 px-5 py-3 text-cyan-200 shadow-2xl shadow-cyan-500/20">
          {toast}
        </div>
      )}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
        >
          <FaArrowUp />
        </button>
      )}

      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-xl font-black text-transparent">
            Rahul M Nayak
          </h1>

          <div className="hidden gap-7 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`capitalize transition ${
                  activeSection === item
                    ? "text-cyan-400"
                    : "hover:text-cyan-400"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="mb-5 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              Final-Year CSE Student • Software Developer
            </p>

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
              Hi, I’m <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Rahul M Nayak
              </span>
            </h1>

            <p className="mb-6 text-2xl font-bold md:text-3xl">
              I’m a <TypeWriter />
            </p>

            <p className="mb-8 max-w-xl leading-8 text-slate-400">
              I build full-stack web applications, backend APIs, dashboards, and
              intelligent software systems using Python, FastAPI, React, MySQL,
              and machine learning.
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-xl bg-cyan-400 px-7 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
              >
                View Projects
              </a>

             <a
              href="#contact"
              className="flex items-center gap-2 rounded-xl border border-cyan-400 px-7 py-3 transition hover:bg-cyan-400/10"
              >
              <FaEnvelope /> Get In Touch
            </a>
            </div>

            <div className="flex gap-4 text-2xl">
              <a
                href="https://github.com/RahulN07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-nayak-b0055b27a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rahulnayak1302@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                <FaEnvelope />
                </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-3xl" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
              >
                <div className="absolute -top-5 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl text-cyan-400 backdrop-blur">
                  <FaPython />
                </div>
                <div className="absolute -right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl text-cyan-400 backdrop-blur">
                  <FaReact />
                </div>
                <div className="absolute -bottom-5 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl text-cyan-400 backdrop-blur">
                  <SiFastapi />
                </div>
                <div className="absolute -left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl text-cyan-400 backdrop-blur">
                  <SiMysql />
                </div>
              </motion.div>

              <div className="relative h-full w-full rounded-full bg-linear-to-br from-cyan-400 to-purple-600 p-1 shadow-2xl shadow-cyan-500/30">
                <img
                  src="/profile.jpeg"
                  alt="Rahul"
                  className="relative h-full w-full rounded-full bg-[#050816] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-3 gap-4">
          {[
            ["4+", "Projects"],
            ["14+", "Skills"],
            ["5+", "Certificates"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20"
            >
              <h3 className="text-3xl font-black text-cyan-400">{num}</h3>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-white/5 px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2"
        >
          <div>
            <h2 className="mb-6 text-4xl font-black text-cyan-400">
              About Me
            </h2>
            <p className="leading-8 text-slate-300">
              I am a Computer Science Engineering student from Tontadarya
              College of Engineering, Gadag. I completed a Data Science with
              Python internship at EchoBrains and worked on a real-time fraud
              detection system using Python, FastAPI, React, MySQL, TensorFlow,
              and machine learning.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#050816] p-8 shadow-xl shadow-cyan-500/10">
            <h3 className="mb-5 text-2xl font-bold">Education</h3>
            <p className="mb-3 text-slate-300">
              <b className="text-cyan-400">Degree:</b> B.E. Computer Science
            </p>
            <p className="text-cyan-300">
              Tontadarya College of Engineering, Gadag
            </p>
            <p className="text-slate-400">
              2022 – 2026 | CGPA: 8.56 / 10
            </p>

            <p className="mb-3 mt-4 text-slate-300">
              <b className="text-cyan-400">Location:</b> Gadag, Karnataka
            </p>
            <p className="text-slate-300">
              <b className="text-cyan-400">Focus:</b> Full Stack Development &
              Data Science
            </p>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionTitle
            badge="Technical Expertise"
            title="Skills & Technologies"
            subtitle="Technologies and tools I use to design, develop, and deploy scalable applications."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:border-cyan-400 hover:shadow-cyan-500/10"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-3xl">{category.icon}</div>
                  <h3 className="text-xl font-bold text-cyan-400">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="bg-white/5 px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionTitle
            badge="Portfolio"
            title="Featured Projects"
            subtitle="A few practical projects built using full-stack development, machine learning, networking, and security concepts."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#050816] transition hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <ProjectImage src={project.img} title={project.title} />
                <div className="p-6">
                  <h3 className="mb-3 text-2xl font-black">{project.title}</h3>
                  <p className="mb-5 text-slate-400">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="experience" className="px-6 py-20">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <p className="mb-3 text-sm text-cyan-300">Internship</p>
          <h2 className="mb-5 text-4xl font-black text-cyan-400">
            Experience
          </h2>
          <h3 className="text-2xl font-semibold">EchoBrains</h3>
          <p className="mb-5 text-slate-400">
            Data Science with Python Intern | Jan 2026 – Apr 2026
          </p>
          <p className="leading-8 text-slate-300">
            Built a real-time fraud detection application using Python, FastAPI,
            React, MySQL, TensorFlow, and machine learning models. Worked on
            backend APIs, dashboards, transaction monitoring, and fraud risk
            analysis.
          </p>
        </motion.div>
      </section>

      <section id="certificates" className="bg-white/5 px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionTitle
            badge="Achievements"
            title="Certificates & Award"
            subtitle="Certifications and recognitions that support my technical learning journey."
          />

          <div className="grid gap-6 md:grid-cols-2">
           {certificates.map((cert) => (
            <motion.div
            key={cert.title}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedCertificate(cert)}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#050816] transition hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
          <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-cyan-400/10">
            <FaCertificate className="text-2xl text-cyan-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-cyan-400">{cert.title}</h3>
            <p className="text-sm text-slate-400">Click to view certificate</p>
          </div>
    </div>

  </motion.div>
))}

            <motion.div
              whileHover={{ y: -6 }}
              className="flex items-center gap-4 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 p-6"
            >
              <FaAward className="text-4xl text-yellow-400" />
              <div>
                <h3 className="font-bold text-white">Best Paper Presentation</h3>
                <p className="text-slate-400">Project Symposium 2025, TCE</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="contact" className="bg-[#080817] px-6 py-24">
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2"
        >
          <div className="relative flex min-h-130 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#050816]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#22d3ee22,transparent_45%)]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative h-72 w-72 rounded-full border border-cyan-400/30"
            >
              <div className="absolute inset-6 rounded-full border border-purple-400/30" />
              <div className="absolute inset-12 rounded-full border border-cyan-400/20" />
              <div className="absolute -top-3 left-1/2 h-6 w-6 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/70" />
              <div className="absolute bottom-8 -left-2 h-5 w-5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/70" />
              <div className="absolute right-3 top-24 h-4 w-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/70" />
            </motion.div>

            <div className="absolute h-40 w-40 rounded-full bg-linear-to-br from-cyan-400 to-purple-600 opacity-80 blur-sm" />

            <div className="absolute text-center">
              <h3 className="text-3xl font-black text-white">Let’s Work</h3>
              <p className="mt-2 text-cyan-300">Together</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-5xl font-black md:text-6xl">
              Contact<span className="text-cyan-400">.</span>
            </h2>
            <p className="mb-8 text-slate-400">
              Have an opportunity, project, or collaboration idea? Send me a
              message.
            </p>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <input
                type="text"
                name="bot_field"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />
              
              <input
                name="user_name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-white/10 bg-[#17122d] px-5 py-4 text-white focus:border-cyan-400 focus:outline-none"
              />

              <input
                name="user_email"
                type="email"
                placeholder="Your email"
                required
                className="w-full rounded-xl border border-white/10 bg-[#17122d] px-5 py-4 text-white focus:border-cyan-400 focus:outline-none"
              />

              <textarea
                name="message"
                rows="7"
                placeholder="Your message"
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-[#17122d] px-5 py-4 text-white focus:border-cyan-400 focus:outline-none"
              />

              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300 disabled:opacity-60"
              >
                <FaPaperPlane />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=rahulnayak1302@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-white/20 px-5 py-4 text-cyan-300 transition hover:border-cyan-400"
            >
            ✉ rahulnayak1302@gmail.com
            </a>
              <a
                href="https://github.com/RahulN07"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/20 px-5 py-4 text-cyan-300 transition hover:border-cyan-400"
              >
                GitHub: github.com/RahulN07
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-nayak-b0055b27a/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/20 px-5 py-4 text-cyan-300 transition hover:border-cyan-400"
              >
                LinkedIn: rahul-nayak-b0055b27a
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {selectedCertificate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#050816] p-5 shadow-2xl shadow-cyan-500/20">

            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950 shadow-lg hover:bg-cyan-300"
            >
              ✕
            </button>

            <h3 className="mb-4 text-xl font-bold text-cyan-300">
            {selectedCertificate.title}
            </h3>

            <div className="max-h-[80vh] overflow-auto rounded-2xl bg-white p-4">
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>

      </div>
    </div>
  )}

  <footer className="border-t border-white/10 py-6 text-center text-slate-500">
       © 2026 Rahul M Nayak. All rights reserved.
    </footer>
    </div>
  );
}