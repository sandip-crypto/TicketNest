import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VendorDashboard from "./pages/Vendor/Dashboard/Dashboard_Components/VendorDashboard";
import SignIn from "./pages/User/Forms/SignIn";
import SignUp from "./pages/User/Forms/SignUp";
import RedirectToHomePage from "./pages/RedirectToHomePage";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import VendorSignIn from "./pages/Vendor/Forms/VendorSignIn";
import VendorSignUp from "./pages/Vendor/Forms/VendorSignUp";
import AdminProtectedRoute from "./pages/Admin/Dashboard/AdminProtectedRoute";
import UserProtectedRoute from "./pages/User/Dashboard/UserProtectedRoute";
import TheaterLayoutManager from "./pages/Vendor/Dashboard/Dashboard_Components/TheaterLayoutManager";
import AdminDashboardContent from "./pages/Admin/Dashboard/AdminDashboardContent";
import CustomerList from "./pages/Admin/Dashboard/components/CustomerList";
import VendorList from "./pages/Admin/Dashboard/components/VendorList";
import EventList from "./pages/Admin/Dashboard/components/EventList";
import Profile from "./pages/Admin/Dashboard/components/Profile";
import RevenueAnalytics from "./pages/Admin/Dashboard/components/RevenueAnalytics";
import Notifications from "./pages/Admin/Dashboard/components/Notifications";
import PaymentIntegration from "./pages/Admin/Dashboard/components/PaymentIntegration";
import UserManagement from "./pages/Admin/Dashboard/components/UserManagement";
import ContactForm from "./components/Form/ContactForm";
import AboutUs from "./components/pages/AboutUs";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import CookiePolicy from "./components/pages/CookiePolicy";
import Marketing from "./components/pages/Marketing";
import Advertisement from "./components/pages/Advertisement";
import TermsOfUse from "./components/pages/TermsOfUse";
import ContactRequest from "./pages/Admin/Dashboard/components/ContactRequest";
import VendorProtectedRoute from "./pages/Vendor/Dashboard/Dashboard_Components/VendorProtectedRoute";
import MovieForm from "./pages/Vendor/Dashboard/Dashboard_Forms/MovieForm";
import AllEvents from "./pages/Vendor/Dashboard/Dashboard_Components/AllEvents";
import TheaterForm from "./pages/Vendor/Dashboard/Dashboard_Forms/TheaterForm";
import GameForm from "./pages/Vendor/Dashboard/Dashboard_Forms/GameForm";
import ConcertForm from "./pages/Vendor/Dashboard/Dashboard_Forms/ConcertForm";
import ConfirmationModal from "./pages/Vendor/Dashboard/Dashboard_Components/ConfirmationModal";
import Users from "./pages/Vendor/Dashboard/Dashboard_Components/Users";
import Sales from "./pages/Vendor/Dashboard/Dashboard_Components/Sales";
import Analytics from "./pages/Vendor/Dashboard/Dashboard_Components/Analytics";
import Settings from "./pages/Vendor/Dashboard/Dashboard_Components/Settings";
import AddGrocery from "./pages/Vendor/Dashboard/Dashboard_Forms/AddGrocery";
import GroceryList from "./pages/GroceryList";
import Checkout from "./pages/Checkout";
import EventForm from "./pages/Vendor/Dashboard/Dashboard_Forms/EventForm";
import MovieDetails from "./pages/MovieDetails";
import TicketBooking from "./pages/TicketBooking";
import BookingConfirmation from "./pages/BookingConfirmation";
import MoviesSection from "./pages/MoviesSection";
import EventDetails from "./pages/EventDetails";
import EventsSection from "./pages/EventsSection";
import ConcertsSection from "./pages/ConcertsSection";
import EventManagement from "./pages/Admin/Dashboard/components/EventManagement";
import AssociatedVendorsForAMovie from "./pages/AssociatedVendorsForAMovie";
import ConcertDetails from "./pages/ConcertDetails";
import EventTicket from "./pages/EventTicket";
import DragDropGrid from "./pages/DragDropGrid";
import EventSuccess from "./components/payment_gateway/EventSuccess";
import EventFailure from "./components/payment_gateway/EventFailure";
import ConcertSuccess from "./components/payment_gateway/ConcertSuccess";
import ConcertFailure from "./components/payment_gateway/ConcertFailure";
import ConcertTicket from "./pages/ConcertTicket";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ticketnest">
            <Route path="chart" element={<DragDropGrid />} />
            <Route path="layout" element={<TheaterLayoutManager />} />
            <Route path="event-payment-success" element={<EventSuccess />} />
            <Route path="event-payment-failure" element={<EventFailure />} />
            <Route path="event-ticket/:id" element={<EventTicket />} />
            <Route
              path="concert-payment-success"
              element={<ConcertSuccess />}
            />
            <Route
              path="concert-payment-failure"
              element={<ConcertFailure />}
            />
            <Route path="concert-ticket/:id" element={<ConcertTicket />} />

            <Route path="contact-us" element={<ContactForm />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="movies" element={<MoviesSection />} />
            <Route path="events" element={<EventsSection />} />
            <Route path="concerts" element={<ConcertsSection />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route
              path="movie/:movieId/available-vendors"
              element={<AssociatedVendorsForAMovie />}
            />
            <Route path="event/:id" element={<EventDetails />} />
            <Route path="concert/:id" element={<ConcertDetails />} />
            <Route path="book/:movieId/:vendorId" element={<TicketBooking />} />
            <Route
              path="booking/confirmation/:bookingId"
              element={<BookingConfirmation />}
            />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="advertisement" element={<Advertisement />} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="explore/home" element={<HomePage />} />

            {/* User routes */}
            <Route path="user">
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>

            {/* Vendor routes */}
            <Route path="vendor">
              <Route path="sign-in" element={<VendorSignIn />} />
              <Route path="sign-up" element={<VendorSignUp />} />
            </Route>
          </Route>

          {/* Vendor-protected routes */}
          <Route element={<VendorProtectedRoute />}>
            <Route path="/ticketnest/vendor" element={<VendorDashboard />}>
              <Route path="dashboard" element={<AllEvents />}>
                <Route path="create-movie" element={<MovieForm />} />
                <Route path="create-theater" element={<TheaterForm />} />
                <Route path="create-game" element={<GameForm />} />
                <Route path="create-concert" element={<ConcertForm />} />
                <Route path="create-groceries" element={<AddGrocery />} />
                <Route path="create-event" element={<EventForm />} />
                <Route path="users" element={<Users />} />
                <Route path="sales" element={<Sales />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="logout" element={<ConfirmationModal />} />
              </Route>
            </Route>
          </Route>

          {/* Admin-protected routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/ticketnest/admin" element={<AdminDashboard />}>
              <Route path="dashboard" element={<AdminDashboardContent />}>
                <Route path="customers" element={<CustomerList />} />
                <Route path="vendors" element={<VendorList />} />
                <Route path="events" element={<EventList />} />
                <Route path="profile" element={<Profile />} />
                <Route path="analytics" element={<RevenueAnalytics />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="event-management" element={<EventManagement />} />
                <Route path="notifications" element={<Notifications />} />
                <Route
                  path="payment-integration"
                  element={<PaymentIntegration />}
                />
                <Route path="contact-requests" element={<ContactRequest />} />
              </Route>
            </Route>
          </Route>

          {/* Customer-protected routes */}
          <Route element={<UserProtectedRoute />}>
            <Route
              path="/ticketnest/user/dashboard"
              element={<UserDashboard />}
            />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<RedirectToHomePage />} />

          {/* Other standalone routes */}

          <Route path="/ticketnest/groceries" element={<GroceryList />} />
          <Route path="/ticketnest/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
