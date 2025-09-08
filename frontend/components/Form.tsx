import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type FormProps = {
  loading: boolean;
  url: string;
  setInputUrl: (value: string) => void;
  handleSubmit: () => void;
  setValidity: (value: number | null) => void;
  setShortcode: (value: string) => void;
};

const Form = ({ url, setInputUrl, handleSubmit, loading, setValidity, setShortcode }: FormProps) => {
  const handleValidityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValidity(value === '' ? null : Number(value));
  };

  const handleShortcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShortcode(e.target.value);
  };

  return (
    <Box
      sx={{
        width: { md: "30%", xs: "100%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        bgcolor: "primary.main",
        color: "white",
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        URL SHORTENER
      </Typography>
      <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          fullWidth
          label="Enter long URL"
          variant="outlined"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputUrl(e.target.value)}
          sx={{ mb: 2, bgcolor: "white" }}
        />
        <TextField
          fullWidth
          label="Optional Validity Period (minutes)"
          variant="outlined"
          type="number"
          onChange={handleValidityChange}
          sx={{ mb: 2, bgcolor: "white" }}
        />
        <TextField
          fullWidth
          label="Optional Custom Shortcode"
          variant="outlined"
          onChange={handleShortcodeChange}
          sx={{ mb: 2, bgcolor: "white" }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2, p: 2, bgcolor: "blue.800", "&:hover": { bgcolor: "blue.900" } }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "SUBMIT"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;