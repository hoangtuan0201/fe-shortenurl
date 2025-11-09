import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Alert,
  TableContainer,
  Link,
  Stack,
  Divider,
  Button
} from '@mui/material';
import { getAdminUrls } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const PAGE_SIZE = 20; // cố định page size theo yêu cầu
  // Removed delete state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }
        const res = await getAdminUrls(token, page, PAGE_SIZE);
        const list =
          Array.isArray(res?.data) ? res.data :
          Array.isArray(res?.Data) ? res.Data :
          Array.isArray(res?.data?.Data) ? res.data.Data :
          Array.isArray(res) ? res : [];
        setUrls(list);
        setHasNext(Array.isArray(list) && list.length >= PAGE_SIZE);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          navigate('/login', { replace: true });
          return;
        }
        setError('Failed to load URL list');
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [page, navigate]);

  const getId = (u) => u?._id || u?.id;
  const getShortLink = (u) => {
    if (u?.shortLink) return u.shortLink;
    if (u?.code) return `https://shortenurl-35ch.onrender.com/${u.code}`;
    if (u?.shortCode) return `https://shortenurl-35ch.onrender.com/${u.shortCode}`;
    return '';
  };

  // Removed delete handlers

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
          Admin URLs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and monitor shortened links.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: 0, border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'action.selected' : 'grey.50', width: 100 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'action.selected' : 'grey.50' }}>Short Link</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'action.selected' : 'grey.50' }}>Original URL</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'action.selected' : 'grey.50', width: 180 }}>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urls.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography color="text.secondary">No URLs found.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    urls.map((u) => {
                      const id = getId(u);
                      const short = getShortLink(u);
                      return (
                        <TableRow key={id || short} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{id ?? '—'}</Typography>
                          </TableCell>
                          <TableCell>
                            {short ? (
                              <Link href={short} target="_blank" rel="noopener" underline="hover" sx={{ fontFamily: 'monospace' }}>
                                {short}
                              </Link>
                            ) : (
                              <Typography variant="body2" color="text.secondary">—</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 420 }}>
                              {u?.originalUrl || u?.longUrl || ''}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {u?.createdAt ? new Date(u.createdAt).toLocaleString() : ''}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
                <Button variant="contained" disabled={!hasNext} onClick={() => setPage((p) => p + 1)}>Next</Button>
              </Stack>
              <Typography variant="body2" color="text.secondary">Page {page}</Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AdminPage;