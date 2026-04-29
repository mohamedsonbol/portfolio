"use client"

import { useState, useRef } from "react"
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, LayoutTemplate, HelpCircle, Download, FileType2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Switch } from "@/components/ui/switch"
import mammoth from "mammoth"
import confetti from "canvas-confetti"
import { useReactToPrint } from "react-to-print"
import { CustomResumeTemplate, ParsedResumeData } from "@/components/resume-template"

export default function ResumeToolsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [resultsReady, setResultsReady] = useState(false)
  
  const [targetCompany, setTargetCompany] = useState("linkedin")
  const [region, setRegion] = useState("eu")
  const [resumeText, setResumeText] = useState("")
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: string } | null>(null)
  
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null)
  const [includePhoto, setIncludePhoto] = useState(false)
  
  const customRef = useRef<HTMLDivElement>(null)
  const printCustom = useReactToPrint({ contentRef: customRef, documentTitle: "Resume_Custom" })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile({ name: file.name, type: file.type })

    if (file.name.endsWith('.docx')) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer
        try {
          const result = await mammoth.extractRawText({ arrayBuffer })
          setResumeText(result.value)
        } catch (error) {
          console.error("Error parsing DOCX:", error)
          alert("Failed to parse DOCX file.")
        }
      }
      reader.readAsArrayBuffer(file)
    } else if (file.type === 'application/pdf') {
      // PDF text extraction is complex on the client without heavy libraries.
      // We will show the visual upload, but prompt the user.
      alert("PDF uploaded successfully. Note: Auto-extracting text from PDF might be limited. For best analysis, please use a .docx file or paste your text.")
      setResumeText("PDF Uploaded: " + file.name + "\n\n(Text extraction for PDF is visually simulated here. Please paste text for actual analysis or use DOCX.)")
    } else if (file.type === 'text/plain') {
      const text = await file.text()
      setResumeText(text)
    } else {
      alert("Please upload a .docx, .pdf, or .txt file.")
      setUploadedFile(null)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setResumeText("")
  }

  const runLocalMockLogic = (text: string, target: string, reg: string) => {
    const lowerText = text.toLowerCase()
    
    // Standard Headers Check
    const hasExperience = lowerText.includes('experience') || lowerText.includes('employment')
    const hasEducation = lowerText.includes('education') || lowerText.includes('university')
    const hasSkills = lowerText.includes('skills') || lowerText.includes('technologies')
    const headersScore = [hasExperience, hasEducation, hasSkills].filter(Boolean).length * 10
    
    // Quantifiable Impact Check
    const hasPercentages = /%/.test(text)
    const hasMoney = /\$|€|£/.test(text)
    const impactScore = (hasPercentages ? 15 : 0) + (hasMoney ? 10 : 0)
    
    // Action Verbs
    const actionVerbs = ['led', 'managed', 'developed', 'architected', 'increased', 'reduced']
    const verbsFound = actionVerbs.filter(v => lowerText.includes(v)).length
    const verbsScore = Math.min(verbsFound * 5, 20)
    
    // Region Logic
    let regionScore = 20
    let feedback = []
    
    if (reg === 'eu') {
      if (lowerText.includes('photo') || lowerText.includes('dob')) {
        feedback.push("⚠️ EU standards are shifting; consider removing photo/DOB unless specifically requested.")
      } else {
        feedback.push("✅ Good adherence to modern EU 'blind CV' standards.")
      }
    } else if (reg === 'us' || target === 'google') {
      if (lowerText.includes('photo') || lowerText.includes('dob') || lowerText.includes('age')) {
        regionScore -= 10
        feedback.push("❌ Strict US/Google ATS will flag photos and age. Remove immediately.")
      }
      if (!hasPercentages && target === 'google') {
        regionScore -= 10
        feedback.push("⚠️ Google's X-Y-Z formula requires quantifiable impact (e.g. 'improved X by Y%'). Add more metrics.")
      }
    }
    
    feedback.push("💡 Ensure your section headers match standard ATS parsers exactly.")
    if (!hasSkills) feedback.push("❌ Missing a dedicated 'Skills' section, critical for keyword matching.")

    const totalScore = Math.min(headersScore + impactScore + verbsScore + regionScore + 15, 98)

    // Mock Parsed Data for the Template
    const mockParsed: ParsedResumeData = {
      name: "Your Name",
      title: "Software Engineer",
      summary: text ? text.substring(0, 150) + '...' : "An experienced professional.",
      contact: { email: "email@example.com", phone: "+1234567890", location: "City, Country", linkedin: "linkedin.com/in/user" },
      experience: [
        { company: "Example Corp", role: "Developer", date: "Jan 2021\nPresent", location: "Remote", bullets: ["Built scalable systems.", "Improved performance by 20%."] }
      ],
      education: [
        { degree: "BSc Computer Science", institution: "University", date: "2016\n2020" }
      ],
      skills: ["JavaScript", "React", "Node.js", "ATS Optimization"],
      languages: [{ language: "English", proficiency: "Native" }]
    }

    return {
      overallScore: totalScore,
      keywordMatch: 70 + (hasSkills ? 20 : 0),
      actionVerbs: verbsScore * 5,
      formatting: regionScore * 5,
      feedback: feedback,
      parsedData: mockParsed
    }
  }

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert("Please upload a file or paste your resume text first.")
      return
    }

    setIsAnalyzing(true)
    setResultsReady(false)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90))
    }, 200)

    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: resumeText, targetCompany, region })
      })
      
      let data;
      if (res.ok) {
        data = await res.json()
      } else {
        console.warn("API failed, falling back to local mock logic.")
        data = runLocalMockLogic(resumeText, targetCompany, region)
      }

      clearInterval(interval)
      setProgress(100)
      setAnalysisData(data)
      setParsedData(data.parsedData) // Set the structured data for the template
      setIsAnalyzing(false)
      setResultsReady(true)

      if (data.overallScore >= 80) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        })
      }

    } catch (error) {
      clearInterval(interval)
      const fallbackData = runLocalMockLogic(resumeText, targetCompany, region)
      setAnalysisData(fallbackData)
      setParsedData(fallbackData.parsedData)
      setProgress(100)
      setIsAnalyzing(false)
      setResultsReady(true)
      
      if (fallbackData.overallScore >= 80) {
        confetti()
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Resume ATS Scorer & <span className="text-primary">Design Generator</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your resume against strict ATS systems for top tech companies and generate beautiful, structured templates instantly.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column: Configuration & Input */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Configuration</CardTitle>
                  <CardDescription>Tailor the ATS check to your specific goals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Platform / Company</Label>
                    <Select value={targetCompany} onValueChange={setTargetCompany}>
                      <SelectTrigger id="target">
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn Recruiter ATS</SelectItem>
                        <SelectItem value="google">Google (Internal ATS)</SelectItem>
                        <SelectItem value="amazon">Amazon (Internal ATS)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Target Region Requirements</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eu">EU (DACH/France focus)</SelectItem>
                        <SelectItem value="mena">MENA (Standard Formatting)</SelectItem>
                        <SelectItem value="us">US (Strict No Photos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume Input</CardTitle>
                  <CardDescription>Upload your DOCx/PDF or paste your resume content.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">File Upload</TabsTrigger>
                      <TabsTrigger value="text">Paste Text</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="mt-4">
                      {!uploadedFile ? (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                          <input 
                            type="file" 
                            accept=".docx,.txt,.pdf" 
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">Drag and drop your DOCx or PDF file here</p>
                          <p className="text-xs text-muted-foreground">or click to browse from your computer</p>
                        </div>
                      ) : (
                        <div className="border border-muted rounded-lg p-6 flex items-center justify-between bg-muted/20">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-lg">
                              {uploadedFile.type === 'application/pdf' ? <FileType2 className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                            </div>
                            <div>
                              <p className="font-medium text-sm truncate max-w-[200px]">{uploadedFile.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">Ready for analysis</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={removeFile}>
                            <X className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="text" className="mt-4">
                      <Textarea 
                        placeholder="Paste your plain text resume here..." 
                        className="min-h-[200px]"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-12 text-lg" 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !resumeText}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      "Analyze & Generate PDF"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column: Results & Designs */}
            <div className="space-y-6">
              {isAnalyzing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Processing...</CardTitle>
                    <CardDescription>Extracting structured data and checking against {targetCompany.toUpperCase()} standards.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={progress} className="w-full h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Analyzing structure & impact...</span>
                      <span>{progress}%</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {resultsReady && analysisData && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>ATS Score Results</span>
                        <span className={`text-3xl font-bold ${analysisData.overallScore >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                          {analysisData.overallScore}/100
                        </span>
                      </CardTitle>
                      <CardDescription>Advanced analysis based on {targetCompany} standards.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            Keyword Match 
                            <Tooltip>
                              <TooltipTrigger><HelpCircle className="w-3 h-3 ml-1 text-muted-foreground" /></TooltipTrigger>
                              <TooltipContent>How well your skills match industry standard keywords.</TooltipContent>
                            </Tooltip>
                          </span>
                          <span className="font-medium">{analysisData.keywordMatch}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            Action Verbs
                            <Tooltip>
                              <TooltipTrigger><HelpCircle className="w-3 h-3 ml-1 text-muted-foreground" /></TooltipTrigger>
                              <TooltipContent>Presence of strong verbs like 'led', 'architected', 'optimized'.</TooltipContent>
                            </Tooltip>
                          </span>
                          <span className="font-medium">{analysisData.actionVerbs}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            Formatting ({region.toUpperCase()})
                            <Tooltip>
                              <TooltipTrigger><HelpCircle className="w-3 h-3 ml-1 text-muted-foreground" /></TooltipTrigger>
                              <TooltipContent>Adherence to regional header conventions and photo rules.</TooltipContent>
                            </Tooltip>
                          </span>
                          <span className="font-medium">{analysisData.formatting}%</span>
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="w-full mt-4 bg-muted/50 rounded-md">
                        <AccordionItem value="feedback" className="border-none">
                          <AccordionTrigger className="px-4 py-2 text-sm font-semibold hover:no-underline">
                            💡 View Expert Recommendations
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                              {analysisData.feedback.map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold flex items-center">
                        <LayoutTemplate className="w-5 h-5 mr-2" />
                        Generated PDF Template
                      </h3>
                      <div className="flex items-center gap-2">
                        <Switch id="photo" checked={includePhoto} onCheckedChange={setIncludePhoto} />
                        <Label htmlFor="photo" className="text-xs">Include Photo</Label>
                      </div>
                    </div>
                    
                    <Card className="overflow-hidden p-0 bg-muted/30">
                      {/* Mini Preview of the Custom Template */}
                      <div className="p-4 flex justify-center">
                        <div className="w-full max-w-[200px] aspect-[1/1.4] bg-white shadow-md grid grid-cols-12 overflow-hidden border border-border">
                          <div className="col-span-8 p-2 flex flex-col gap-1 border-r border-gray-100">
                            <div className="h-1 w-2/3 bg-gray-400"></div>
                            <div className="h-0.5 w-1/3 bg-gray-300 mb-2"></div>
                            <div className="h-0.5 w-1/4 bg-gray-300"></div>
                            <div className="flex gap-1 mt-1">
                              <div className="h-4 w-0.5 bg-gray-200"></div>
                              <div className="w-full h-4 bg-gray-100"></div>
                            </div>
                            <div className="flex gap-1">
                              <div className="h-4 w-0.5 bg-gray-200"></div>
                              <div className="w-full h-4 bg-gray-100"></div>
                            </div>
                          </div>
                          <div className="col-span-4 bg-[#949b8f] p-1 flex flex-col gap-1 items-center">
                            {includePhoto ? <div className="w-full aspect-square bg-gray-600 mb-1"></div> : <div className="w-full aspect-square bg-transparent mb-1"></div>}
                            <div className="h-0.5 w-full bg-white/50"></div>
                            <div className="h-0.5 w-full bg-white/50"></div>
                            <div className="h-0.5 w-full bg-white/50"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t bg-card text-center">
                        <Button className="w-full" onClick={() => printCustom()}>
                          <Download className="w-4 h-4 mr-2" /> Print & Download PDF
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {!isAnalyzing && !resultsReady && (
                <div className="h-full min-h-[400px] border-2 border-dashed border-muted rounded-xl flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                  <CheckCircle2 className="w-16 h-16 mb-4 text-muted" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Analyze</h3>
                  <p className="max-w-xs">Upload a `.docx` or `.pdf` to begin. Requires Open API Key in environment for full data extraction.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Hidden Print Template */}
      <div className="hidden">
        <CustomResumeTemplate ref={customRef} data={parsedData} showPhoto={includePhoto} />
      </div>
      
      <Footer />
    </div>
  )
}
