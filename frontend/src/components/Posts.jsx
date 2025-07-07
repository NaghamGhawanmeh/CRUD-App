import { useEffect, useState } from "react";
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
  DialogTitle,
  TextField,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { tokens } from "../theme";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
  updatePostById,
  deletePostById,
} from "../redux/reducers/posts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PostsList = () => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const posts = useSelector((reducers) => reducers.postsReducer.posts);
  const authToken = useSelector((reducers) => reducers.authReducer.token);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/posts/getAllPosts"
      );
      dispatch(setPosts(response.data.posts));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // create or update handler
  const handleSubmit = async (values) => {
    try {
      if (selectedPost) {
        // Update

        const response = await axios.put(
          `http://localhost:5000/posts/updatePostById/${selectedPost._id}`,
          {
            title: values.title,
            description: values.description,
            media: values.media,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        dispatch(updatePostById(response.data.updatedPost));
        console.log(response);

        setMessage(response.data.message);
        setStatus(true);
      } else {
        // Create
        try {
          const response = await axios.post(
            "http://localhost:5000/posts/createPost",
            {
              title: values.title,
              description: values.description,
              media: values.media,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          dispatch(addPost(response.data.post));
          setMessage(response.data.message);
          setStatus(true);
          console.log(response);
        } catch (err) {
          console.log(err);
          setStatus(false);
          setMessage(err.response?.data?.message);
        }
      }

      setOpen(false);
      setSelectedPost(null);
    } catch (err) {
      console.log(err);
      setStatus(false);
      setMessage(err.response?.data?.message);
    }
  };
  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:5000/posts/deletePostById/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      dispatch(deletePostById(postId));
      console.log("Post deleted");
    } catch (err) {
      console.log(err);
      setStatus(false);
      setMessage(err.response?.data?.message);
    }
  };

  return (
    <>
      <Box m="20px">
        <Button
          variant="contained"
          style={{ backgroundColor: colors.greenAccent[500] }}
          onClick={() => {
            setSelectedPost(null);
            setOpen(true);
          }}
        >
          Create Post
        </Button>
      </Box>

      {/* Posts List */}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {posts.map((post) => (
          <Card key={post._id} sx={{ width: 350, m: 2, position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
              }}
              onClick={() => {
                setSelectedPost(post);
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 48,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
              }}
              onClick={() => handleDelete(post._id)}
            >
              <DeleteIcon />
            </IconButton>
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
        <DialogTitle>
          {selectedPost ? "Update Post" : "Create New Post"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: selectedPost?.title || "",
              description: selectedPost?.description || "",
              media: selectedPost?.media ? selectedPost.media[0] : "",
            }}
            enableReinitialize
            validationSchema={Yup.object({
              title: Yup.string().required("Title is required"),
              description: Yup.string().required("Description is required"),
              media: Yup.string().url("Must be a valid URL").nullable(),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (
              <Form>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <TextField
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Post title"
                    fullWidth
                    variant="standard"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <TextField
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Post description"
                    fullWidth
                    variant="standard"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <FormLabel htmlFor="media">Media URL</FormLabel>
                  <TextField
                    id="media"
                    name="media"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    fullWidth
                    variant="standard"
                    value={values.media}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.media && Boolean(errors.media)}
                    helperText={touched.media && errors.media}
                  />
                </FormControl>

                <DialogActions sx={{ mt: 2 }}>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setSelectedPost(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    {selectedPost ? "Update" : "Create"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostsList;
