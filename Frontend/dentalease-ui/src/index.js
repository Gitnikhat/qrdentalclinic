import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import ErrorPage from "./ErrorPage";
import LoginForm from './Components/Authentication/LoginForm';
import Register from './Components/Authentication/Register';
import ForgotPassword from './Components/Authentication/ForgotPassword';

import Managetreatments from './Components/Dashboard/Managetreatments';
import Addtreatments from './Components/Dashboard/Addtreatments';

import { UserProvider } from './Components/Usercontext';

import './index.css';


import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Managesystemusers from './Components/Dashboard/Managesystemusers';
import Addsystemusers from './Components/Dashboard/Addsystemusers';
import Manageslots from './Components/Dashboard/Manageslots';
import Test from './Components/Dashboard/Test';
import Userdashboard from './Components/Dashboard/Userdashboard';
import Manageprofile from './Components/Dashboard/Manageprofile';
import Viewfaq from './Components/Dashboard/Viewfaq';
import Manageappointments from './Components/Dashboard/Manageappointments';
import Bookappointment from './Components/Dashboard/Bookappointment';
import Userbookappointment from './Components/Dashboard/Userbookappointment';
import Userappointment from './Components/Dashboard/Userappointment';
import Monthlyreport from './Components/Dashboard/Monthlyreport';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    css: () => import("./App.css")
  },{
    path: "logout",
    element: <App />,
    errorElement: <ErrorPage />,
    css: () => import("./App.css")
  },
  {
    path: "login",
    element: <LoginForm />,
    css: () => import("./Components/Authentication/authentication.css")
  },
  {
    path: "register",
    element: <Register />,
    css: () => import("./Components/Authentication/authentication.css")
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    css: () => import("./Components/Authentication/authentication.css")
  },
  {
    path: "manage-treatments",
    element: <Managetreatments />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "add-new-treatments",
    element: <Addtreatments />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "manage-systemusers",
    element: <Managesystemusers />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "add-new-system-users",
    element: <Addsystemusers />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "manage-slots",
    element: <Manageslots />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "admindashboard",
    element: <Test />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "patientdashboard",
    element: <Userdashboard />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "manageprofile",
    element: <Manageprofile />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "faqs",
    element: <Viewfaq />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "manageappointments",
    element: <Manageappointments />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "book-appointment",
    element: <Bookappointment />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "appointmentshistory",
    element: <Userbookappointment />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "user-book-appointment",
    element: <Userappointment />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  },
  {
    path: "monthly-report",
    element: <Monthlyreport />,
    css: () => [
      import('./Components/Dashboard/css-utils/bootstrap/css/bootstrap.min.css'), 
      import('./Components/Dashboard/css-utils/bootstrap-icons/bootstrap-icons.css'), 
      import('./Components/Dashboard/css-utils/boxicons/css/boxicons.min.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.snow.css'), 
      import('./Components/Dashboard/css-utils/quill/quill.bubble.css'), 
      import('./Components/Dashboard/css-utils/remixicon/remixicon.css'), 
      import('./Components/Dashboard/css-utils/simple-datatables/style.css'), 
    ]
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
