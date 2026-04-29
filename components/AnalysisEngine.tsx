"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSearch } from "lucide-react"

interface AnalysisEngineProps {
  isAnalyzing: boolean;
  progress: number;
  targetCompany: string;
  region: string;
}

export function AnalysisEngine({ isAnalyzing, progress, targetCompany, region }: AnalysisEngineProps) {
  if (!isAnalyzing) return null;

  return (
    <Card className="overflow-hidden border-primary/50 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <FileSearch className="w-5 h-5 text-primary" />
          </motion.div>
          Analysis Engine Scanning...
        </CardTitle>
        <CardDescription>
          Deep scanning resume and cross-referencing against {targetCompany.toUpperCase()} standards in the {region.toUpperCase()} region.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanning Animation Area */}
        <div className="relative h-24 bg-muted/30 rounded-md border border-border flex items-center justify-center overflow-hidden">
          {/* Animated Document Lines */}
          <div className="flex flex-col gap-2 w-1/2 opacity-20">
            <div className="h-2 w-full bg-foreground rounded"></div>
            <div className="h-2 w-5/6 bg-foreground rounded"></div>
            <div className="h-2 w-4/6 bg-foreground rounded"></div>
            <div className="h-2 w-full bg-foreground rounded"></div>
          </div>
          
          {/* The Scanner Beam */}
          <motion.div 
            className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_8px_2px_rgba(var(--primary),0.6)]"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="w-full h-3" />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <motion.span
              key={Math.floor(progress / 20)} // Trigger animation every 20%
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {progress < 30 ? "Extracting entities..." : 
               progress < 60 ? "Evaluating keyword density..." : 
               progress < 90 ? "Checking formatting rules..." : 
               "Finalizing report..."}
            </motion.span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
