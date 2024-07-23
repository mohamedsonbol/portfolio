// src/components/Resume.js
import React from 'react';

import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MyPic from '../assets/mohamedsonbol.png';

const skills = [
  { skill: 'HTML5', progress: 100 },
  { skill: 'CSS3', progress: 90 },
  { skill: 'JavaScript', progress: 75 },
  { skill: 'NodeJS', progress: 70 },
  { skill: 'React', progress: 60 },
  { skill: 'MongoDB', progress: 50 },
];

const experiences = [
  {
    startYear: 2021,
    endYear: 'Present',
    location: 'Warsaw, Poland.',
    jobName: 'Accenture',
    jobPosition: 'Digital Technical Analyst',
    jobDescription: `- Providing professional customer service for clients with technical requirements.
    - Debugging websites, analyzing and providing code (JavaScript)
    - Providing guidance on implementing server-to-server integration (API/JSON/JavaScript)
    - Working with my team on developing Google Chrome extensions
    - Created an automated Google Sheet App using Google App Scripts (JavaScript)
    - Communicating and working with team members on daily bases`,
  },
  // Add other experiences here...
];

const education = [
  {
    startYear: 2010,
    endYear: 2013,
    location: 'Sharjah, United Arab Emirates.',
    schoolName: 'Al Shola Private School',
    schoolDescription: 'Successfully graduated with 85% score.',
  },
  // Add other education details here...
];

const Resume = () => {

  
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Avatar alt="Mohamed Sonbol" src={MyPic} sx={{ width: 150, height: 150, mx: 'auto' }} />
            <Typography variant="h4" sx={{ pt: 2 }}>Mohamed Sonbol</Typography>
            <Typography variant="h6" color="textSecondary">Full-stack Web Developer</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">mhmdezzat.eng@gmail.com</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Technologies</Typography>
            <List>
              {[
                'JavaScript',
                'ReactJS',
                'MongoDB',
                'NodeJS',
                'ExpressJS',
                'WordPress',
                'Bootstrap',
                'Git&Github',
                'Bash',
                'RESTful API',
              ].map((tech, index) => (
                <ListItem key={index}>
                  <ListItemText primary={tech} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4">Skills</Typography>
            <List>
              {skills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${skill.skill} (${skill.progress}%)`} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h4">Experience</Typography>
            {experiences.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{exp.jobName}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{exp.startYear} - {exp.endYear} ({exp.location})</Typography>
                <Typography variant="subtitle2">{exp.jobPosition}</Typography>
                <Typography variant="body2" color="textSecondary">{exp.jobDescription}</Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
            <Typography variant="h4">Education</Typography>
            {education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{edu.schoolName}</Typography>
                <Typography variant="subtitle1" >{edu.startYear} - {edu.endYear} ({edu.location})</Typography>
                <Typography variant="body2" color="textSecondary">{edu.schoolDescription}</Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resume;
