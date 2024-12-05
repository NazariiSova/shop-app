import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Comment } from '../../types/interfaces';

interface CommentState {
  items: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  items: [],
  loading: false,
  error: null
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (productId: number) => {
    const response = await axios.get<Comment[]>(`http://localhost:3001/comments?productId=${productId}`);
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const response = await axios.post<Comment>('http://localhost:3001/comments', comment);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id: number) => {
    await axios.delete(`http://localhost:3001/comments/${id}`);
    return id;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не вдалося завантажити коментарі';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  }
});

export default commentsSlice.reducer;