# Travel Trips Client

**Travel Trips Client** is a web application built with **Next.js** that allows users to explore travel destinations, book trips, and view detailed itineraries. The application features a user-friendly interface with server-side rendering (SSR) for faster loading times and SEO optimization. It's designed with **React**, **Redux**, and **TypeScript** on the frontend, integrated with a backend to handle user authentication, trip management, and payment processing.

## Features

### 1. **User Registration and Authentication**
- **Sign Up & Login**: New users can sign up and existing users can log in.
- **Social Login**: Users can log in via Google and Facebook for convenience.
- **JWT Authentication**: Secure token-based authentication for user sessions.

### 2. **Explore Travel Destinations**
- Browse and search for various travel destinations.
- Detailed pages for each destination, including information, images, reviews, and available trips.

### 3. **Trip Booking**
- Users can book trips by selecting a destination and preferred itinerary.
- Option to customize trips and select add-ons (like guided tours or extra amenities).

### 4. **User Profile Management**
- Users can view and update their profile, including personal details, contact information, and past bookings.
- View booking history and upcoming trips.

### 5. **Booking Cart and Checkout**
- Users can add trips to a booking cart for later checkout.
- Secure checkout with multiple payment options and order confirmation.

### 6. **Trip Reviews and Ratings**
- Users can rate and review destinations and trips based on their experience.
- View reviews from other users to make informed decisions about their trip bookings.

### 7. **Real-Time Trip Availability**
- Check for available trips in real-time, with up-to-date availability information.
- Notifications for any trip availability changes.

### 8. **Admin Panel**
- Admins can manage destinations, trips, and user bookings via an intuitive admin dashboard.
- Ability to add, update, and remove destinations and trip packages.

### 9. **Responsive Design**
- Fully responsive web design optimized for desktop, tablet, and mobile devices.
- Seamless user experience across all screen sizes.

### 10. **Payment Gateway Integration**
- Secure online payment through integrated payment gateways.
- Multiple payment methods, including credit/debit cards and digital wallets (e.g., Stripe).

## Technologies Used

- **Frontend:** Next.js, React, Redux, TypeScript, CSS (TailwindCSS, CSS Modules)
- **Backend:** Node.js, Express, MongoDB (for user data and trip management)
- **Authentication:** JWT-based token authentication
- **Payment Gateway:** Stripe, PayPal
- **APIs:** Integrated with third-party APIs for trip availability, reviews, and payment processing

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Alauddin-24434/Travel-Tips-Destination-Guides-client.git
    cd Travel-Tips-Destination-Guides-client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
   - Create a `.env.local` file in the root of the project.
   - Add necessary API keys and configuration for the backend, payment gateways, and other services.

   Example of `.env.local`:


4. Run the development server:

    ```bash
    npm run dev
    ```

    The app should now be available at `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
