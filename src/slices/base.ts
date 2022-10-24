import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService, { RegisterFormData, LoginFormData } from 'api/AuthAPI';
import UsersService, { UserProfileData, UserPasswordData } from 'api/UsersAPI';
import {Nullable, RequestStatus, UserFullData} from 'types';
import {AxiosError} from 'axios';
import {RootState} from 'store';
import {REQUEST_STATUS} from './constants';
import { setMessage } from './message';

type UserSlice = {
    isLoggedIn: boolean;
    user: Nullable<UserFullData>
    status: RequestStatus;
}

const STATUS_TEXT = {
    REG_SUCCESS: 'Вы зарегистрировались',
    REG_ERROR: 'Ошибка регистрации',
    LOGIN_SUCCESS: 'Вы авторизовались',
    LOGIN_ERROR: 'Ошибка авторизации',
    SUCCESS: 'Данные обновлены',
    ERROR: 'Ошибка обновления',
};

export const register = createAsyncThunk<UserFullData, RegisterFormData>(
    'base/register',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            await AuthService.signUp(data);

            const userInfo = await AuthService.getUserInfo();

            await dispatch(setForumAuth(userInfo.data)).unwrap();

            dispatch(setMessage(STATUS_TEXT.REG_SUCCESS));
            return userInfo.data;
        } catch (error) {
            dispatch(setMessage(STATUS_TEXT.REG_ERROR));

            return rejectWithValue(STATUS_TEXT.REG_ERROR);
        }
    },
);

export const setForumAuth = createAsyncThunk<
    void,
    UserFullData
    >('base/auth', async (data, {rejectWithValue}) => {
        try {
            const response = await AuthService.setForumAuth(data);

            return response.data;
        } catch (error) {
            console.log('Ошибка');

            return rejectWithValue((error as AxiosError).response?.data);
        }
    });

export const login = createAsyncThunk<
    UserFullData,
    LoginFormData,
    {state: RootState}
    >(
        'base/login',
        async (data, {rejectWithValue, dispatch, getState}) => {
            try {
                await AuthService.signIn(data);

                const response = await AuthService.getUserInfo();

                if (!getState().base.isLoggedIn) {
                    await dispatch(setForumAuth(response.data))
                        .unwrap();
                }

                dispatch(setMessage(STATUS_TEXT.LOGIN_SUCCESS));

                return response.data;
            } catch (error) {
                dispatch(setMessage(STATUS_TEXT.LOGIN_ERROR));

                return rejectWithValue(STATUS_TEXT.LOGIN_ERROR);
            }
        },
    );

export const logout = createAsyncThunk<void, void>('base/logout', async () => {
    try {
        await AuthService.logoutOnForum();

        await AuthService.logout();
    } catch (error) {
        console.log('Ошибка');
    }
});

export const getUserInfo = createAsyncThunk<
    UserFullData,
    void,
    {state: RootState}
    >('base/getUserInfo', async (_, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await AuthService.getUserInfo();

            if (!getState().base.isLoggedIn) {
                await dispatch(setForumAuth(response.data))
                    .unwrap();
            }

            return response.data;
        } catch (err) {
            return rejectWithValue((err as AxiosError).response?.data);
        }
    });

export const changeProfile = createAsyncThunk<UserFullData, UserProfileData>(
    'base/changeProfile',
    async (data: UserProfileData, {rejectWithValue, dispatch}) => {
        try {
            const response = await UsersService.changeProfile(data);
            dispatch(setMessage(STATUS_TEXT.SUCCESS));

            return response.data;
        } catch (error) {
            dispatch(setMessage(STATUS_TEXT.ERROR));
            return rejectWithValue(STATUS_TEXT.ERROR);
        }
    },
);

export const changeAvatar = createAsyncThunk<UserFullData, FormData>(
    'base/changeAvatar',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const response = await UsersService.changeAvatar(data);

            return response.data;
        } catch (error) {
            dispatch(setMessage(STATUS_TEXT.ERROR));

            return rejectWithValue(STATUS_TEXT.ERROR);
        }
    },
);

export const changePassword = createAsyncThunk<void, UserPasswordData>(
    'base/changePassword',
    async (data, {rejectWithValue}) => {
        try {
            const response = await UsersService.changePassword(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(STATUS_TEXT.ERROR);
        }
    },
);

export const authYandex = createAsyncThunk(
  "base/yandexAuth",
  async (data: FormData, thunkAPI) => {
    try {
    //   const response = await AuthService.authYandex(data);
    //   if(response.access_token) {
    //     const data = new FormData();
    //     data.append('oauth_token', response.access_token)
    //     const userInfo = await AuthService.yandexGetInfo(data);
    //     if(userInfo.client_id) {
    //       const user = {
    //         'id': userInfo.client_id,
    //         'first_name': userInfo.first_name,
    //         'second_name': userInfo.last_name,
    //         'display_name': userInfo.display_name,
    //         'login': userInfo.login,
    //         'email': userInfo.default_email,
    //         'phone': '',
    //         'avatar': `https://avatars.yandex.net/get-yapic/${userInfo.default_avatar_id}/islands-retina-50`,
    //         'auth': true
    //       } as Object

    //       localStorage.setItem("user", JSON.stringify(user));
    //       thunkAPI.dispatch(setMessage(STATUS_TEXT.LOGIN_SUCCESS));
    //       return { user: user };
    //     }
    return  1; 
    //   }
    } catch (error) {
      thunkAPI.dispatch(setMessage(STATUS_TEXT.ERROR));
      return thunkAPI.rejectWithValue(STATUS_TEXT.ERROR);
    }
  }
);


const initialState: UserSlice = {
    isLoggedIn: false,
    user: null,
    status: REQUEST_STATUS.PENDING,
};

const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = REQUEST_STATUS.LOADING;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(register.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.status = REQUEST_STATUS.ERROR;
            });

        builder.addCase(authYandex.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                // @ts-ignore
                state.user = action.payload?.user;
              });
              builder.addCase(authYandex.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
              });

        builder
            .addCase(login.pending, (state) => {
                state.status = REQUEST_STATUS.LOADING;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.status = REQUEST_STATUS.ERROR;
            });

        builder
            .addCase(getUserInfo.pending, (state) => {
                state.status = REQUEST_STATUS.LOADING;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(getUserInfo.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.status = REQUEST_STATUS.ERROR;
            });

        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.user = null;
        });

        builder
            .addCase(changeProfile.pending, (state) => {
                state.status = REQUEST_STATUS.LOADING;
            })
            .addCase(changeProfile.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(changeProfile.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.status = REQUEST_STATUS.ERROR;
            });

        builder
            .addCase(changeAvatar.pending, (state) => {
                state.status = REQUEST_STATUS.LOADING;
            })
            .addCase(changeAvatar.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.status = REQUEST_STATUS.SUCCESS;
            })
            .addCase(changeAvatar.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.status = REQUEST_STATUS.ERROR;
            });
    },
});

const { reducer } = baseSlice;
export default reducer;
