
# B Airways Airline Reservation System

This project is a web-based airline reservation system built for **B Airways**, a subsidiary of Virgin Airlines. The platform allows users to book flights, manage bookings, and view flight schedules. It also includes features like user authentication, seat selection, and discount programs for frequent flyers. The system is designed to handle short to medium distance international flights and offers comprehensive reporting tools for flight and passenger data analysis.

## Project Features

- **Flight Booking System:** Enables passengers to book flights across multiple destinations including Indonesia, Sri Lanka, India, Thailand, and Singapore.
- **Flight Management:** Predefined flight schedules with support for real-time updates in case of flight delays.
- **Passenger Categories:** Passengers are categorized into guest, frequent, and gold tiers, with corresponding discounts (5% for Frequent, 9% for Gold).
- **Seat Selection:** Users can select available seats from a predefined seating plan. No overbooking is allowed.
- **Flight Classes:** Ticket prices are determined based on Economy, Business, or Platinum class.
- **Analytical Reports:** Provides management with reports like passengers under 18, booking trends, and revenue generated per aircraft type.
- **Future Expansion:** Supports easy expansion by allowing the addition of new airports and routes.

## Database Design

- The database encapsulates all the features outlined above and is designed to maintain ACID properties, with appropriate foreign and primary keys to ensure data integrity.
- **Entities:** Passengers, Flights, Aircrafts, Airports, Bookings, Schedules.
- **Procedures and Triggers:** Used to maintain consistency, enforce business rules, and produce reports.
  
## Technologies Used

- **Frontend:** Next.js, React
- **Backend:** Node.js, Express.js
- **Database:** MySQL/PostgreSQL
- **Hosting:** Vercel (for frontend), DigitalOcean/AWS (for backend and database)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Installation and Development

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/airline-reservation-system.git
cd airline-reservation-system
npm install
# or
yarn install
# or
pnpm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js/) - Your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
