import { AccountsPage } from './pages';
import AccountPage from './pages/accounts/account-page/account-page';
import { LoginPage } from './pages/auth/login-page/login-page';
import RegisterPage from './pages/auth/register-page/register-page';
import { ResetActivationCodePage } from './pages/auth/reset-activation-code-page/reset-activation-code-page';
import { ResetPasswordPage } from './pages/auth/reset-password-page/reset-password-page';
import { VerifyEmailPage } from './pages/auth/verify-email-page/verify-email-page';
import Dashboard from './pages/dashboard/dashboard';
import { MediasPage } from './pages/media/medias-page/medias-page';
import UserPage from './pages/users/user-page/user-page';
import UsersPage from './pages/users/users-page/users-page';

export interface Route {
  path: string;
  name: string;
  component: () => JSX.Element | null;
  allow: 'AUTHENTICATED' | 'UNAUTHENTICATED' | 'BOTH';
}

const authRoutes: Route[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    allow: 'UNAUTHENTICATED',
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    allow: 'UNAUTHENTICATED',
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPasswordPage,
    allow: 'BOTH',
  },
  {
    path: '/reset-activation-code',
    name: 'Reset Activation Code',
    component: ResetActivationCodePage,
    allow: 'BOTH',
  },
  {
    path: '/verify-email',
    name: 'Verify Email',
    component: VerifyEmailPage,
    allow: 'BOTH',
  },
];

const usersRoutes: Route[] = [
  {
    path: '/users',
    name: 'Users',
    component: UsersPage,
    allow: 'AUTHENTICATED',
  },
  {
    path: '/users/user',
    name: 'User',
    component: UserPage,
    allow: 'AUTHENTICATED',
  },
];

const accountsRoutes: Route[] = [
  {
    path: '/accounts',
    name: 'Accounts',
    component: AccountsPage,
    allow: 'AUTHENTICATED',
  },
  {
    path: '/accounts/account',
    name: 'Account',
    component: AccountPage,
    allow: 'AUTHENTICATED',
  },
];

const mediaRoutes: Route[] = [
  {
    path: '/media',
    name: 'Media',
    component: MediasPage,
    allow: 'AUTHENTICATED',
  },
];

export const routes: Route[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    allow: 'AUTHENTICATED',
  },
  ...authRoutes,
  ...usersRoutes,
  ...accountsRoutes,
  ...mediaRoutes,
];
