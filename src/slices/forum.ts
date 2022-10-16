import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {Nullable, RequestStatus, Topic} from 'types';
import {AxiosError} from 'axios';
import {RootState} from 'store';
import {forumApi} from 'api/ForumAPI';
import {REQUEST_STATUS} from '../constants';

export const getTopics = createAsyncThunk<Topic[], void, {rejectValue: string | undefined}>(
    'forum/getTopics',
    async (_, {rejectWithValue}) => {
        try {
            const response = await forumApi.getTopics();

            return response.data;
        } catch (error) {
            return rejectWithValue((error as AxiosError).response?.statusText);
        }
    },
);

export const selectTopics = (state: RootState): Nullable<Topic[]> => state.forum.data;

export const selectIsTopicsLoading = (
    state: RootState,
): boolean => state.forum.status === REQUEST_STATUS.LOADING;

export const selectTopicById = createSelector([
    selectTopics,
    (_, id?: string) => id,
], (data, id): Nullable<Topic> => {
    if (data) {
        return data.find((item) => item.id === parseInt(id ?? '', 10)) ?? null;
    }

    return null;
});

type ForumSlice = {
    data: Nullable<Topic[]>;
    error: string | undefined;
    status: RequestStatus;
}

const initialState: ForumSlice = {
    data: null,
    error: undefined,
    status: REQUEST_STATUS.PENDING,
};

const forumSlice = createSlice({
    name: 'FORUM',
    initialState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTopics.pending, (state) => {
            state.status = REQUEST_STATUS.LOADING;
            state.error = undefined;
        }).addCase(getTopics.fulfilled, (state, action) => {
            state.status = REQUEST_STATUS.SUCCESS;
            state.data = action.payload;
        }).addCase(getTopics.rejected, (state, action) => {
            state.status = REQUEST_STATUS.ERROR;
            state.error = action.payload;
        });
    },
});

const { reducer } = forumSlice;
export default reducer;
