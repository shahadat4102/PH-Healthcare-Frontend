

const prefix = "/dashboard"
 export const patientRoutes = [
    {
      title: "Bookings",
      items: [
        {
          title: "My Appointments",
          url: `${prefix}/my-appointments`,
        },
        {
          title: "Payment History",
          url: `${prefix}`,
        },
      ],
    },
    {
      title: "App Settings",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
      ],
    },
  ];