import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { tokens } from "../theme";
import { useFormik } from "formik";
import * as Yup from "yup";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/posts/getAllPosts"
      );
      setPosts(response.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Formik config
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      media: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      media: Yup.string().url("Must be a valid URL").nullable(),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
      setOpen(false);
    },
  });

  return (
    <>
      <Box m="20px">
        <Button
          variant="contained"
          style={{ backgroundColor: colors.greenAccent[500] }}
          onClick={() => setOpen(true)}
        >
          Create Post
        </Button>
      </Box>

      {/* Posts List */}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {posts.map((post) => (
          <Card key={post._id} sx={{ width: 350, m: 2 }}>
            {post.media && post.media.length > 0 && (
              <CardMedia
                component="img"
                height="200"
                image={post.media[0]}
                alt={post.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {post.description}
              </Typography>
              <Box>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <Chip
                      key={index}
                      label={comment.comment}
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No comments
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Dialog with Formik */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details below to create a new post.
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              margin="dense"
              name="media"
              label="Media URL (optional)"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.media}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.media && Boolean(formik.errors.media)}
              helperText={formik.touched.media && formik.errors.media}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostsList;
