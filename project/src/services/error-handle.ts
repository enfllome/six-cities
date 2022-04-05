import { AppRoute } from './../const';
import request from 'axios';
import {store} from '../store';
import {redirectToRoute} from '../store/action';
import {clearErrorAction} from '../store/api-actions';
import {ErrorType} from '../types/error';
import {HTTP_CODE} from '../const';
import { setError } from '../store/reducers/another-process/another-process';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        handleError(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        handleError(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        handleError(response.data.error);
        store.dispatch(redirectToRoute(AppRoute.NotFound));
        break;
    }
  }
};
