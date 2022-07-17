import { ApolloError, MutationResult } from '@apollo/client';
import { FormikHelpers } from 'formik';
import { Types } from 'src/types';
import { Format } from '../format';
import { useToaster } from '../use-toaster';

export const useFormHelpers = () => {
  const { triggerToast } = useToaster();

  const handleFormSuccess = <T,>(data: {
    success?: { header: string; message: string };
    helpers?: FormikHelpers<T>;
    reset?: MutationResult<T>['reset'] | MutationResult<T>['reset'][];
    toast?: Pick<Types.UI.Toast, 'button'>;
    callback?: () => void;
  }) => {
    const { helpers, success, reset, toast, callback } = data;

    if (helpers) {
      helpers.setSubmitting(false);
      helpers.resetForm();
    }

    if (reset) {
      if (Array.isArray(reset)) {
        for (const func of reset) {
          func();
        }
      } else {
        reset();
      }
    }

    if (success) {
      triggerToast({
        header: success.header,
        message: success.message,
        button: toast?.button,
      });
    }

    if (callback) {
      callback();
    }
  };

  const handleFormError = <T,>(data: {
    error: ApolloError;
    helpers?: FormikHelpers<T>;
    reset?: MutationResult<T>['reset'] | MutationResult<T>['reset'][];
    toast?: Pick<Types.UI.Toast, 'button'>;
    callback?: () => void;
  }) => {
    const { helpers, error, reset, toast, callback } = data;

    if (helpers) {
      helpers.setStatus({ message: error.message });
      helpers.setSubmitting(false);
    }

    if (reset) {
      if (Array.isArray(reset)) {
        for (const func of reset) {
          func();
        }
      } else {
        reset();
      }
    }

    if (error.graphQLErrors.length) {
      for (const graphQLError of error.graphQLErrors) {
        if (graphQLError.extensions.exception.errors) {
          for (const exceptionError in graphQLError.extensions.exception
            .errors) {
            if (exceptionError) {
              triggerToast({
                header: Format.String.humanizeString(exceptionError),
                message: `Please check the "${Format.String.humanizeString(
                  exceptionError,
                )}" field and try again.`,
                button: toast?.button,
              });
            }
          }
        } else {
          triggerToast({
            header: `${Format.String.humanizeString(
              graphQLError.extensions.serviceName ?? 'Unknown',
            )} Error`,
            message: graphQLError.message,
            button: toast?.button,
          });
        }
      }
    }

    if (error.networkError) {
      triggerToast({
        header: 'Network Error',
        message:
          'Something went wrong with this request. Please try again or advise IT staff.',
      });
    }

    if (callback) {
      callback();
    }
  };

  return { handleFormError, handleFormSuccess };
};
