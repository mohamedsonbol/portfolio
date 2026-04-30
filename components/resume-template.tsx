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
      <div ref={ref} className="font-serif w-[210mm] bg-white text-[#4a4a4a] grid grid-cols-12 mx-auto shadow-sm relative before:content-[''] before:absolute before:inset-0 before:left-[66.666667%] before:bg-[#949b8f] before:z-0" style={{ fontSize: '11px' }}>
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
        <div className="col-span-8 px-10 py-12 flex flex-col gap-8 relative z-10">
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
        <div className="col-span-4 text-white px-8 py-12 flex flex-col gap-10 relative z-10">
          
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

export const ClassicResumeTemplate = React.forwardRef<HTMLDivElement, CustomTemplateProps>(
  ({ data, showPhoto }, ref) => {
    const resume = data || {
      name: "MOHAMED SONBOL",
      title: "Technical Specialist",
      summary: "A seasoned professional with expertise in JavaScript, Tag Management Systems, and Analytical platforms.",
      contact: { email: "email@example.com", phone: "+48 732 785 743", location: "Warsaw, Poland", linkedin: "linkedin.com/in/mohamedsonbol" },
      experience: [{ company: "Samsung SDS", role: "TECHNICAL PROJECT MANAGER", date: "Apr 2024 - Jul 2025", location: "", bullets: ["Orchestrated first-party tag implementations."] }],
      education: [{ degree: "COMPUTER SCIENCE", institution: "University of the People", date: "Jan 2021 - Present" }],
      skills: ["Tag Management", "JavaScript", "React"],
      languages: [{ language: "English", proficiency: "Native" }]
    };

    return (
      <div ref={ref} className="font-serif w-[210mm] bg-white text-black mx-auto shadow-sm p-12" style={{ fontSize: '11px', lineHeight: '1.5' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { margin: 0; size: A4 portrait; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}} />
        
        <header className="text-center mb-6 border-b-2 border-black pb-4">
          <h1 className="text-3xl font-bold uppercase mb-1">{resume.name}</h1>
          <div className="text-sm">
            {resume.contact.email} | {resume.contact.phone} | {resume.contact.location} | {resume.contact.linkedin}
          </div>
        </header>

        <section className="mb-6">
          <h2 className="uppercase font-bold text-sm border-b border-gray-400 mb-2">Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="uppercase font-bold text-sm border-b border-gray-400 mb-2">Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold">
                  <span>{exp.role}</span>
                  <span>{exp.date}</span>
                </div>
                <div className="flex justify-between italic mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc pl-5">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="uppercase font-bold text-sm border-b border-gray-400 mb-2">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree}</span> - <span>{edu.institution}</span>
                </div>
                <span className="font-bold">{edu.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="uppercase font-bold text-sm border-b border-gray-400 mb-2">Skills</h2>
          <p>{resume.skills.join(" • ")}</p>
        </section>
      </div>
    );
  }
);
ClassicResumeTemplate.displayName = "ClassicResumeTemplate";

export const MinimalistResumeTemplate = React.forwardRef<HTMLDivElement, CustomTemplateProps>(
  ({ data, showPhoto }, ref) => {
    const resume = data || {
      name: "MOHAMED SONBOL",
      title: "Technical Specialist",
      summary: "A seasoned professional with expertise in JavaScript, Tag Management Systems, and Analytical platforms.",
      contact: { email: "email@example.com", phone: "+48 732 785 743", location: "Warsaw, Poland", linkedin: "linkedin.com/in/mohamedsonbol" },
      experience: [{ company: "Samsung SDS", role: "TECHNICAL PROJECT MANAGER", date: "Apr 2024 - Jul 2025", location: "", bullets: ["Orchestrated first-party tag implementations."] }],
      education: [{ degree: "COMPUTER SCIENCE", institution: "University of the People", date: "Jan 2021 - Present" }],
      skills: ["Tag Management", "JavaScript", "React"],
      languages: [{ language: "English", proficiency: "Native" }]
    };

    return (
      <div ref={ref} className="font-sans w-[210mm] bg-white text-gray-800 mx-auto shadow-sm p-12" style={{ fontSize: '11px', lineHeight: '1.6' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { margin: 0; size: A4 portrait; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}} />
        
        <header className="mb-8">
          <h1 className="text-4xl font-light tracking-wider text-gray-900 mb-2">{resume.name}</h1>
          <h2 className="text-lg text-blue-600 font-medium mb-4">{resume.title}</h2>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>{resume.contact.email}</span>
            <span>{resume.contact.phone}</span>
            <span>{resume.contact.location}</span>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Experience</h3>
              <div className="space-y-5">
                {resume.experience.map((exp, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-gray-800">{exp.role}</h4>
                    <div className="text-blue-600 mb-2">{exp.company} <span className="text-gray-400">| {exp.date}</span></div>
                    <ul className="text-gray-600 space-y-1">
                      {exp.bullets.map((b, i) => <li key={i}>- {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="col-span-4 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">About</h3>
              <p className="text-gray-600">{resume.summary}</p>
            </section>
            
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-sm text-[9px] uppercase tracking-wider">{skill}</span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Education</h3>
              <div className="space-y-3">
                {resume.education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-gray-800">{edu.degree}</div>
                    <div className="text-gray-500">{edu.institution}</div>
                    <div className="text-gray-400 text-[10px]">{edu.date}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
);
MinimalistResumeTemplate.displayName = "MinimalistResumeTemplate";
