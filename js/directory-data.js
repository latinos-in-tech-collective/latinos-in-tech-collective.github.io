// Latinos in Tech Collective, directory data.
// This is the only file to edit when groups join or events and resources come in.
// Edit it right in GitHub (pencil icon), commit, and the Directories page updates in a minute or two.
//
// Rules
// 1. Only add a group after it has said yes to being listed.
// 2. Keep items in the same shape as the ones below. Copy one, then change the values.
// 3. Dates use YYYY-MM-DD. Leave "date" empty ("") when the date is not set yet and use "when" for the label.
// 4. Past events stay in the list. The page moves them to "Past" on its own once the date has passed.

window.LITC_GROUPS = [
  {
    name: "Latinos in Tech Collective",
    type: "Network",                 // Network, Professional association, Employee resource group, Student group, Founder community, Nonprofit
    area: "Boston",
    description: "A network of Latino networks, connecting groups across Boston to build collective wealth and ownership.",
    tags: ["Tech", "Entrepreneurship", "Investing", "Ownership"],
    link: "index.html"               // the group's website, or "" if none
  }
  // Template for a new group, remove the slashes and fill in:
  // ,{
  //   name: "",
  //   type: "",
  //   area: "",
  //   description: "",
  //   tags: [],
  //   link: ""
  // }
];

window.LITC_FEED = [
  {
    title: "From Earning to Owning",
    by: "Latinos in Tech Collective",
    kind: "Event",                   // Event, Resource, Funding
    date: "",                        // YYYY-MM-DD once set
    when: "Fall 2026",               // label shown when there is no date yet
    detail: "Date to be announced",
    description: "How money moves from a paycheck into assets, investing basics, and what owning equity in a company means. Open to members of every group in the network.",
    tags: ["Investing", "Ownership", "Finance"],
    link: "join.html#updates"
  },
  {
    title: "Latino Equity Fund FY27 grants",
    by: "The Boston Foundation",
    kind: "Funding",
    date: "2026-10-30",
    detail: "Application deadline",
    description: "One time $50,000 general operating grants for Latinx serving 501(c)(3) organizations in Greater Boston, including entrepreneurial support.",
    tags: ["Funding", "Nonprofits", "Entrepreneurship"],
    link: "https://www.tbf.org/nonprofits/grant-making-initiatives/latino-equity-fund/latino-equity-fund-fy27-applications"
  },
  {
    title: "¡Vamos Massachusetts! report",
    by: "Massachusetts Taxpayers Foundation with We Are ALX and the Mauricio Gastón Institute",
    kind: "Resource",
    date: "",
    when: "2025",
    detail: "Research",
    description: "Latino residents added $30 billion to the Massachusetts economy from 2014 to 2023. Our baseline for tracking progress.",
    tags: ["Research", "Economy", "Data"],
    link: ""
  },
  {
    title: "First community meeting",
    by: "Latinos in Tech Collective",
    kind: "Event",
    date: "2026-08-01",              // CONFIRM the real date
    when: "Summer 2026",
    detail: "Past",
    description: "Our first working session, mapping what the network should build together.",
    tags: ["Community", "Ownership"],
    link: ""
  },
  {
    title: "Launch party at Boston Tech Week",
    by: "Latinos in Tech Collective",
    kind: "Event",
    date: "2026-05-29",
    detail: "Kendall Square",
    description: "More than 100 Latino professionals, founders, and builders in one room.",
    tags: ["Networking", "Tech", "Founders"],
    link: ""
  }
];
