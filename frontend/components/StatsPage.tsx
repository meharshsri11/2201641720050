import { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Log } from '../../loggingMiddleware/errorHandler';
// Import the stats API URL from your constants file
import { STATS_API_URL } from '../constants';

interface ClickData {
  timestamp: string;
  source: string;
  location: string;
}

interface ShortenedUrlStats {
  shortUrl: string;
  originalUrl: string;
  creationDate: string;
  expiryDate: string;
  totalClicks: number;
  clickData: ClickData[];
}

const StatsPage = () => {
  const [stats, setStats] = useState<ShortenedUrlStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      Log('frontend', 'info', 'page', 'Navigated to the statistics page.');
      try {
        setLoading(true);
        // Use the imported API URL
        const response = await fetch(STATS_API_URL);
        if (!response.ok) {
          Log('frontend', 'error', 'api', `Failed to fetch stats. Status: ${response.status}`);
          throw new Error('Failed to fetch stats.');
        }
        const data: ShortenedUrlStats[] = await response.json();
        setStats(data);
        Log('frontend', 'info', 'state', 'Successfully fetched and updated URL stats.');
      } catch (error) {
        Log('frontend', 'fatal', 'handler', `An error occurred while fetching stats: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (stats.length === 0) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        No shortened URLs to display.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {stats.map((urlStats, index) => (
        <Card key={index} sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Short URL: <a href={urlStats.shortUrl} target="_blank" rel="noopener noreferrer">{urlStats.shortUrl}</a>
            </Typography>
            <Typography variant="body1">
              **Original URL:** {urlStats.originalUrl}
            </Typography>
            <Typography variant="body2">
              **Created:** {new Date(urlStats.creationDate).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              **Expires:** {new Date(urlStats.expiryDate).toLocaleString()}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              **Total Clicks:** {urlStats.totalClicks}
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Detailed Click Data:
            </Typography>
            <List>
              {urlStats.clickData.map((click, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText
                    primary={`Timestamp: ${new Date(click.timestamp).toLocaleString()}`}
                    secondary={`Source: ${click.source} | Location: ${click.location}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsPage;