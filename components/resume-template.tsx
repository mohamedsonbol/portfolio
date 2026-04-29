import React from "react";

export interface ParsedResumeData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  experience: {
    company: string;
    role: string;
    date: string;
    location: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    date: string;
  }[];
  skills: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

interface CustomTemplateProps {
  data: ParsedResumeData | null;
  showPhoto?: boolean;
}

export const CustomResumeTemplate = React.forwardRef<HTMLDivElement, CustomTemplateProps>(
  ({ data, showPhoto }, ref) => {
    // Provide sensible defaults if data is still loading
    const resume = data || {
      name: "MOHAMED SONBOL",
      title: "Technical Specialist",
      summary: "A seasoned professional with expertise in JavaScript, Tag Management Systems, and Analytical platforms. Bridging the gap between technical implementation and client-facing strategy.",
      contact: {
        email: "mhmdezzat.eng@gmail.com",
        phone: "+48 732 785 743",
        location: "Warsaw, Poland",
        linkedin: "linkedin.com/in/mohamedsonbol"
      },
      experience: [
        {
          company: "Sauce Labs | Warsaw",
          role: "SUPPORT ENGINEER",
          date: "Jul 2025\nOct 2025",
          location: "",
          bullets: [
            "Developed automated test architectures using Selenium to ensure code quality.",
            "Collaborated on cross-platform test suite designs to streamline QA."
          ]
        },
        {
          company: "Samsung SDS | Warsaw",
          role: "TECHNICAL PROJECT MANAGER",
          date: "Apr 2024\nJul 2025",
          location: "",
          bullets: [
            "Orchestrated first-party tag implementations using Adobe Launch.",
            "Optimized data accuracy and reliability by aligning technical requirements."
          ]
        }
      ],
      education: [
        {
          degree: "COMPUTER SCIENCE",
          institution: "University of the People",
          date: "Jan 2021\nPresent"
        }
      ],
      skills: ["Tag Management", "Google Tag Manager", "JavaScript", "React"],
      languages: [
        { language: "English", proficiency: "Native" },
        { language: "Arabic", proficiency: "Native" }
      ]
    };

    return (
      <div ref={ref} className="font-serif w-[210mm] min-h-[297mm] bg-white text-[#4a4a4a] grid grid-cols-12 mx-auto shadow-sm overflow-hidden relative" style={{ fontSize: '11px' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page {
              margin: 0;
              size: A4 portrait;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}} />
        
        {/* Left Column */}
        <div className="col-span-8 px-10 py-12 flex flex-col gap-8">
          <header className="mb-4">
            <h1 className="text-3xl font-bold tracking-widest text-[#2c4060] uppercase mb-1">{resume.name}</h1>
            <h2 className="text-sm italic text-gray-500">{resume.title}</h2>
          </header>

          <section>
            <h3 className="text-[#a0a69a] tracking-widest uppercase font-bold text-xs mb-6">Experience</h3>
            <div className="space-y-6">
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-20 shrink-0 text-[10px] whitespace-pre-line text-gray-500 font-sans border-l-2 border-gray-300 pl-2 py-1">
                    {exp.date}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#2c4060] uppercase text-xs">{exp.role}</h4>
                    <p className="font-bold text-gray-600 mb-2 text-xs">{exp.company}</p>
                    <ul className="list-disc pl-4 space-y-1 text-[#5c5c5c] font-sans">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[#a0a69a] tracking-widest uppercase font-bold text-xs mb-6">Education</h3>
            <div className="space-y-4">
              {resume.education.map((edu, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-20 shrink-0 text-[10px] whitespace-pre-line text-gray-500 font-sans border-l-2 border-gray-300 pl-2 py-1">
                    {edu.date}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#2c4060] uppercase text-xs">{edu.degree}</h4>
                    <p className="font-bold text-gray-600 text-xs">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-4 bg-[#949b8f] text-white px-8 py-12 flex flex-col gap-10">
          
          {showPhoto && (
            <div className="w-full aspect-square bg-gray-200 overflow-hidden shadow-md">
              <img src="/avatar-portrait.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}

          <section className="space-y-3 text-[10px] font-sans">
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-4">✉</span>
              <span className="truncate">{resume.contact.email || "Email"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-4">⌂</span>
              <span className="truncate">{resume.contact.location || "Location"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-4">☏</span>
              <span className="truncate">{resume.contact.phone || "Phone"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-4">in</span>
              <span className="truncate">{resume.contact.linkedin || "LinkedIn"}</span>
            </div>
          </section>

          <section>
            <h3 className="tracking-widest uppercase font-bold text-xs mb-4 text-[#2c4060]">Summary</h3>
            <p className="text-[10px] leading-relaxed font-sans">{resume.summary}</p>
          </section>

          <section>
            <h3 className="tracking-widest uppercase font-bold text-xs mb-4 text-[#2c4060]">Skills</h3>
            <ul className="list-disc pl-4 space-y-1 text-[10px] font-sans">
              {resume.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="tracking-widest uppercase font-bold text-xs mb-4 text-[#2c4060]">Languages</h3>
            <ul className="list-disc pl-4 space-y-1 text-[10px] font-sans">
              {resume.languages.map((lang, idx) => (
                <li key={idx}>{lang.language} | {lang.proficiency}</li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    );
  }
);
CustomResumeTemplate.displayName = "CustomResumeTemplate";
