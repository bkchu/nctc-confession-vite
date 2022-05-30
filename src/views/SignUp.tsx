import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useSignUp } from 'queries/auth';

export const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<{
    email: string;
    password: string;
  }>();

  const {
    mutateAsync: signUp,
    isSuccess: isSignUpSuccess,
    isError: isSignUpError,
    isLoading: isSignUpLoading
  } = useSignUp({
    onSuccess: () => {
      const redirectTo =
        new URLSearchParams(location.search.substring(1)).get('redirectTo') ??
        '';

      navigate(redirectTo);
    }
  });

  return (
    <div className="w-1/3 mx-auto mt-20">
      <form
        onSubmit={handleSubmit(async ({ email, password }) => {
          await signUp({ email, password });
        })}
      >
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
        >
          Email Address
        </label>
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-500 dark:text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="email"
              id="email-address-icon"
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="john.doe@nctc.com"
              {...register('email', {
                required: { value: true, message: 'Please type in an email.' },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email address.'
                }
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{errors.email.message}</span>
            </p>
          )}
        </div>
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
        >
          Password
        </label>
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                ></path>
              </svg>
            </div>
            <input
              type="password"
              id="password-icon"
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters.'
                },
                required: { value: true, message: 'Please type in a password.' }
              })}
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{errors.password.message}</span>
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 flex items-center"
        >
          {isSignUpLoading && (
            <svg
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {isSignUpLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p className="text-sm mt-2 font-medium">
        <span className="font-normal">Already a member? </span>
        <Link className="hover:underline" to="/login">
          Login
        </Link>
      </p>
      <p
        className={clsx('text-sm mt-2 font-medium', {
          'text-green-600 dark:text-green-500': isSignUpSuccess,
          'text-red-500 dark:text-red-500': isSignUpError
        })}
      >
        {isSignUpSuccess
          ? `An email confirmation has been sent to ${getValues().email}`
          : isSignUpError
          ? `There was an error signing up.`
          : null}
      </p>
    </div>
  );
};
