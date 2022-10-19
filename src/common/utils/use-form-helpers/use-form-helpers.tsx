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
      helpers.setStatus(error.message);
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
          triggerToast({
            header: `${Format.String.humanizeString(
              graphQLError.extensions.serviceName ?? 'Unknown',
            )} Error`,
            message: graphQLError.message,
            button: toast?.button,
          });

          helpers?.setErrors(graphQLError.extensions.exception.errors);
        } else if (graphQLError.extensions.errors) {
          triggerToast({
            header: `${Format.String.humanizeString(
              graphQLError.extensions.serviceName ?? 'Unknown',
            )} Error`,
            message: graphQLError.message,
            button: toast?.button,
          });

          helpers?.setErrors(graphQLError.extensions.errors);
        } else if (graphQLError.extensions.response?.body.errors) {
          triggerToast({
            header: 'Error',
            message: 'Please try agian.',
            button: toast?.button,
          });

          const { errors = [] } = graphQLError.extensions.response.body;

          let formErrors = {};

          for (const err of errors) {
            const regexp = /at "(.*)";/i;
            const regexpGroups = regexp.exec(err.message) ?? [];
            if (regexpGroups[1]) {
              const locationArray = regexpGroups[1].split('.');
              delete locationArray[0];
              const formError = locationArray.reduceRight((res, key, i) => {
                if (i === locationArray.length - 1) {
                  return { [key]: err.message };
                }
                return { [key]: res };
              }, {});

              formErrors = Object.assign(formErrors, formError);
            }
          }
          helpers?.setErrors(formErrors);
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
        message: 'Something went wrong. Please try again.',
      });
    }

    if (callback) {
      callback();
    }
  };

  return { handleFormError, handleFormSuccess };
};
