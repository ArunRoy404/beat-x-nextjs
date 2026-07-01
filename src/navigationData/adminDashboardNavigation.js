export const adminDashboardNavigation = {
  sidebarTitle: "ADMIN CONTROL",
  navMain: [
    {
      category: "Overview",
      items: [
        { 
          title: "Dashboard", 
          navbarTitle: "Music Management",
          url: "/admin/dashboard", 
          iconName: "GridViewIcon",
          subtitle: "Manage all platform music — upload, review, approve"
        },
        { 
          title: "Analytics", 
          navbarTitle: "Platform Analytics",
          url: "/admin/dashboard/analytics", 
          iconName: "Analytics01Icon",
          subtitle: "Platform analytics and performance metrics"
        },
      ],
    },
    {
      category: "Content",
      items: [
        { 
          title: "Music's & Songs", 
          navbarTitle: "Music & Songs",
          url: "/admin/dashboard/music", 
          iconName: "MusicNote01Icon",
          subtitle: "Manage all platform music and songs"
        },
        { 
          title: "Podcasts", 
          navbarTitle: "Podcast Management",
          url: "/admin/dashboard/podcasts", 
          iconName: "PodcastIcon",
          subtitle: "Manage podcasts and episodic audio content"
        },
        { 
          title: "Audiobooks", 
          navbarTitle: "Audiobook Management",
          url: "/admin/dashboard/audiobooks", 
          iconName: "AudioBook01Icon",
          subtitle: "Manage audiobooks and spoken content"
        },
        { 
          title: "Videos & Watch", 
          navbarTitle: "Video Management",
          url: "/admin/dashboard/videos", 
          iconName: "Video01Icon",
          subtitle: "Manage platform videos and watch contents"
        },
      ],
    },
    {
      category: "Users",
      items: [
        { 
          title: "Artist's", 
          navbarTitle: "Artist Management",
          url: "/admin/dashboard/artists", 
          iconName: "Mic01Icon",
          subtitle: "Manage artists and content creators"
        },
        { 
          title: "Users", 
          navbarTitle: "User Management",
          url: "/admin/dashboard/users", 
          iconName: "UserGroupIcon",
          subtitle: "Manage platform users and accounts"
        },
      ],
    },
    {
      category: "Store",
      items: [
        { 
          title: "Shop & Products", 
          navbarTitle: "Shop & Products",
          url: "/admin/dashboard/shop", 
          iconName: "ShoppingBag01Icon",
          subtitle: "Manage shop products and inventory"
        },
        { 
          title: "Tours & Events", 
          navbarTitle: "Tours & Events",
          url: "/admin/dashboard/tours", 
          iconName: "Calendar01Icon",
          subtitle: "Manage live tours and events"
        },
        { 
          title: "Subscriptions", 
          navbarTitle: "Subscription Plans",
          url: "/admin/dashboard/subscriptions", 
          iconName: "CreditCardIcon",
          subtitle: "Manage subscription plans and packages"
        },
        { 
          title: "Orders", 
          navbarTitle: "Order Management",
          url: "/admin/dashboard/orders", 
          iconName: "Package01Icon",
          subtitle: "Manage customer orders and shipments"
        },
        { 
          title: "Revenue", 
          navbarTitle: "Revenue & Earnings",
          url: "/admin/dashboard/revenue", 
          iconName: "MoneyBag01Icon",
          subtitle: "View detailed platform revenue and payout stats"
        },
      ],
    },
    {
      category: "Platform",
      items: [
        { 
          title: "Moderation", 
          navbarTitle: "Content Moderation",
          url: "/admin/dashboard/moderation", 
          iconName: "Shield01Icon",
          subtitle: "Moderate reports and flag content"
        },
        { 
          title: "Sales Reports", 
          navbarTitle: "Sales Reports",
          url: "/admin/dashboard/sales-reports", 
          iconName: "Invoice01Icon",
          subtitle: "Generate and view sales reports"
        },
        { 
          title: "Settings", 
          navbarTitle: "Settings",
          url: "/admin/dashboard/settings", 
          iconName: "Settings05Icon",
          subtitle: "Configure dashboard and layout settings"
        },
      ],
    },
  ],
}
