import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import MyPic from '../assets/mohamedsonbol.png';

const Contact = () => {
  return (
    <Box
      sx={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '2em',
        backgroundColor: '#136a8a', // Assuming contact page background color
        height: '100vh', // Full height
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{margin:"0 auto"}}>
          <CardMedia
            component="img"
            image={MyPic}
            alt="Avatar"
            sx={{ width: '300px', borderRadius: '50%', margin: "0 auto" }}
          />
          <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>Mohamed Sonbol</Typography>
          <Divider sx={{ borderTop: '3px solid #844fb2', width: '50%', margin: 'auto', marginY: '1em' }} />

          <Typography variant="body1" paragraph sx={{ width: '75%', margin: 'auto', paddingTop: '.5em', textAlign: 'justify', color: 'white' }}>
            5 years of experience building and maintaining responsive websites. Proficient with JavaScript, excellent interpersonal skills. Ability to work directly with clients to understand requirements with attention to details.
          </Typography>

          <Divider sx={{ borderTop: '3px solid #844fb2', width: '50%', margin: 'auto', marginY: '1em' }} />

          <List sx={{ display: 'flex', justifyContent: 'center' }}>
            <ListItem>
              <EmailIcon sx={{ marginRight: '8px' }} />
              <ListItemText primary="Mhmdezzat.eng@gmail.com" sx={{ color: 'white' }} />
            </ListItem>

            <ListItem>
              <CodeIcon sx={{ color: 'white', marginRight: '8px' }} />
              <ListItemText
                primary={<a href="https://codepen.io/mowhocodes" style={{ textDecoration: 'none', color: 'white' }}>My Codepen</a>}
              />
            </ListItem>

            <ListItem>
              <GitHubIcon sx={{ color: 'white', marginRight: '8px' }} />
              <ListItemText
                primary={<a href="https://github.com/mohamedsonbol" style={{ textDecoration: 'none', color: 'white' }}>My Github</a>}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact;
