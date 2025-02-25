import React from 'react';
import { Grid, Typography, CardMedia, List, ListItem, ListItemText, Divider, Box, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import MyPic from '../assets/mohamedsonbol.png';

const Contact = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3, // Padding for small screens
      }}
    >
      <Paper sx={{ p: 3 }}>
        <Grid container sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CardMedia
              component="img"
              image={MyPic}
              alt="Avatar"
              sx={{
                width: { xs: '200px', sm: '250px', md: '300px' }, // Responsive width
                borderRadius: '50%',
                margin: '0 auto',
              }}
            />
            <Typography variant="h4" sx={{ marginTop: '1em' }}>
              Mohamed Sonbol
            </Typography>
            <Divider sx={{ borderTop: '3px solid #844fb2', width: '50%', margin: '1em auto' }} />

            <Typography
              variant="body1"
              paragraph
              sx={{
                paddingX: '1em',
                textAlign: 'justify',

              }}
            >
              5 years of experience building and maintaining responsive websites. Proficient with JavaScript, excellent interpersonal skills. Ability to work directly with clients to understand requirements with attention to details.
            </Typography>

            <Divider sx={{ borderTop: '3px solid #844fb2', width: '50%', margin: '1em auto' }} />

            <List sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <ListItem sx={{ width: 'auto' }}>
                <EmailIcon sx={{ marginRight: '8px' }} />
                <ListItemText primary="Mhmdezzat.eng@gmail.com" />
              </ListItem>

              <ListItem sx={{ width: 'auto' }}>
                <CodeIcon sx={{ marginRight: '8px', }} />
                <ListItemText
                  primary={
                    <a
                      href="https://codepen.io/mowhocodes"
                      style={{ textDecoration: 'none'}}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      My Codepen
                    </a>
                  }
                />
              </ListItem>

              <ListItem sx={{ width: 'auto' }}>
                <GitHubIcon sx={{ marginRight: '8px',  }} />
                <ListItemText
                  primary={
                    <a
                      href="https://github.com/mohamedsonbol"
                      style={{ textDecoration: 'none',  }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      My Github
                    </a>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Contact;
