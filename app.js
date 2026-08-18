// HUDLE SOUTH MUMBAI COURT AVAILABILITY TRACKER

// AUTHENTIC USER TOKEN (TANAY GANDHI)
const DEFAULT_USER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoiVjNWY3FEM1pOYkdweHhlU2VWRVl6MUZEQjlKcDBvazBKYUlsNWhCb2NZdm1FdVdBbXdVcGlJemwzSWJDIiwic3ViIjoyODAxMDgsImlzcyI6Imh0dHBzOi8vYXBpLmh1ZGxlLmluL2FwaS92MS9vdHAvdmVyaWZ5IiwiaWF0IjoxNzg2OTg1ODg1LCJleHAiOjE4MTgwODk4ODUsIm5iZiI6MTc4Njk4NTg4NSwianRpIjoiRENsbjE4Z1Y4a3hJNU9VOSJ9.iZ-Lmvj2NDv9MJTGqsU4PJk2v9-q7U8VQdpuZBQmx38";

// ALL 22 SOUTH MUMBAI VENUES & INDIVIDUAL COURTS MAP
const INDIVIDUAL_COURTS_DATA = [
  // --- THE WODEHOUSE GYMKHANA (COOPERAGE / NARIMAN POINT) ---
  {
    venueId: "756a61d5-5290-4f09-a6f2-947e1fb1d235",
    facId: "7ba857a0-15b3-4b93-a305-9054fcd988a1",
    venueName: "The Wodehouse Gymkhana",
    courtName: "Padel Court",
    location: "Cooperage / Nariman Pt",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "756a61d5-5290-4f09-a6f2-947e1fb1d235",
    facId: "8949302f-3cc1-4a1e-9006-3128c8e28a04",
    venueName: "The Wodehouse Gymkhana",
    courtName: "Pickleball Court 1",
    location: "Cooperage / Nariman Pt",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "756a61d5-5290-4f09-a6f2-947e1fb1d235",
    facId: "60ca25c5-b6b4-48c2-8b70-da792ac05f42",
    venueName: "The Wodehouse Gymkhana",
    courtName: "Pickleball Court 2",
    location: "Cooperage / Nariman Pt",
    type: "pickleball",
    matrix: {}
  },

  // --- THE CRICKET CLUB OF INDIA (CCI CHURCHGATE) ---
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "a5fe22b5-f8d0-430c-96a9-25094a109020",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Padel Court 1",
    location: "Churchgate",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "1358353a-7a7d-4b19-8a4b-c7acb30940c0",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Padel Court 2",
    location: "Churchgate",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "b4e5c037-754d-4d6e-8a18-e523b263a710",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Padel Court 3",
    location: "Churchgate",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "cc4d0c74-9035-4092-b031-650f42c36f52",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Pickleball Court 1",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "3b4704a2-9bc8-499b-bb8d-fe23c36932ab",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Pickleball Court 2",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "623b702f-ccf7-4b2a-9803-967b68abfd6a",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Pickleball Court 3",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "c7555a38-05f8-42a0-bf82-88fc3d7f96f8",
    facId: "b537ab76-a7a0-4b14-8cb4-0e1ffdde2a6e",
    venueName: "Cricket Club of India (CCI)",
    courtName: "Pickleball Court 4",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },

  // --- RADIO CLUB (COLABA / APOLLO BUNDER / COOPERAGE) ---
  {
    venueId: "e4f0b7e4-cc3a-4ed1-b127-6c25957c8922",
    facId: "1d239289-387e-4918-bf30-8a4cf7241dd7",
    venueName: "Radio Club | Bombay Padel",
    courtName: "Padel Court",
    location: "Colaba / Cooperage",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "e4f0b7e4-cc3a-4ed1-b127-6c25957c8922",
    facId: "ec7d0954-b3c8-4b55-9af0-b2a76416ab5d",
    venueName: "Radio Club | Bombay Padel",
    courtName: "Pickleball Court",
    location: "Colaba / Cooperage",
    type: "pickleball",
    matrix: {}
  },

  // --- BOMBAY GYMKHANA (FORT / AZAD MAIDAN) ---
  {
    venueId: "cfc18b0c-527c-48d5-acd0-f85490d2a446",
    facId: "a86b7802-8355-4f30-961c-654df619461a",
    venueName: "Bombay Gymkhana",
    courtName: "Padel Court 1 (Old)",
    location: "Fort",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "cfc18b0c-527c-48d5-acd0-f85490d2a446",
    facId: "17cdb721-8af8-4319-8340-f650d6b93607",
    venueName: "Bombay Gymkhana",
    courtName: "Padel Court 2 (New)",
    location: "Fort",
    type: "padel",
    matrix: {}
  },

  // --- BREACH CANDY SWIMMING BATH TRUST ---
  {
    venueId: "d0298484-573b-4aef-b78c-7e877ab0448d",
    facId: "af33abde-7308-4a46-bca1-d9ceebf5eccc",
    venueName: "Breach Candy Trust",
    courtName: "Padel Court 1",
    location: "Breach Candy",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "d0298484-573b-4aef-b78c-7e877ab0448d",
    facId: "d8e77f6b-d583-473b-b167-2d0936a556d8",
    venueName: "Breach Candy Trust",
    courtName: "Padel Court 2",
    location: "Breach Candy",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "d0298484-573b-4aef-b78c-7e877ab0448d",
    facId: "9014969c-d9c8-4d2f-bc47-02bbc53f81b2",
    venueName: "Breach Candy Trust",
    courtName: "Pickleball Court",
    location: "Breach Candy",
    type: "pickleball",
    matrix: {}
  },

  // --- PICKLEPRO CLUB PARADISE BREACH CANDY ---
  {
    venueId: "71d75823-1d82-48c9-954f-c3728908492d",
    facId: "e3ade3cd-eb4e-471b-9d77-0da224a215f7",
    venueName: "PicklePro | Paradise",
    courtName: "Pickleball Court",
    location: "Breach Candy",
    type: "pickleball",
    matrix: {}
  },

  // --- SW19 PICKLE (BADHWAR PARK COLABA / COOPERAGE) ---
  {
    venueId: "fc367926-9f8f-4d81-b997-8ce5662f9c0c",
    facId: "accf0646-6069-441a-bdd9-4e4074e604f7",
    venueName: "SW19 Pickle | Badhwar Park",
    courtName: "Court 1",
    location: "Colaba / Cooperage",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "fc367926-9f8f-4d81-b997-8ce5662f9c0c",
    facId: "1c699881-63a9-4cdc-8a54-9f2034a72571",
    venueName: "SW19 Pickle | Badhwar Park",
    courtName: "Court 2",
    location: "Colaba / Cooperage",
    type: "pickleball",
    matrix: {}
  },

  // --- COURTSIDE WORLI ---
  {
    venueId: "9672dd36-168a-40d8-85be-28d7bef3543b",
    facId: "c598e535-9980-47d0-a0eb-ebaf5603b367",
    venueName: "Courtside Padel Social Club",
    courtName: "Isprava Court",
    location: "Worli",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "9672dd36-168a-40d8-85be-28d7bef3543b",
    facId: "d6121c94-0fc9-4368-a93d-edc26583c2cd",
    venueName: "Courtside Padel Social Club",
    courtName: "Court 2",
    location: "Worli",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "9672dd36-168a-40d8-85be-28d7bef3543b",
    facId: "b866b70f-c2a9-4ea0-91bf-1a95f67c15c3",
    venueName: "Courtside Padel Social Club",
    courtName: "Court 3",
    location: "Worli",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "9672dd36-168a-40d8-85be-28d7bef3543b",
    facId: "60d880c0-c7b8-45d2-a0e4-6c0ef836c317",
    venueName: "Courtside Padel Social Club",
    courtName: "Pickleball Court",
    location: "Worli",
    type: "pickleball",
    matrix: {}
  },

  // --- PADEL 360 WORLI ---
  {
    venueId: "b82d19f2-8690-4975-a5d1-5e9ab886e10d",
    facId: "c93e354e-afd1-43a1-ac95-b0d9098946a6",
    venueName: "Padel 360",
    courtName: "Court 1 Padel",
    location: "Worli",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "b82d19f2-8690-4975-a5d1-5e9ab886e10d",
    facId: "dc6616fa-8d06-48e0-a48e-1cd2c8171e78",
    venueName: "Padel 360",
    courtName: "Court 2 Padel",
    location: "Worli",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "b82d19f2-8690-4975-a5d1-5e9ab886e10d",
    facId: "0cab228a-130b-4c64-b5f0-7de6370dd138",
    venueName: "Padel 360",
    courtName: "Court 1 Pickleball",
    location: "Worli",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "b82d19f2-8690-4975-a5d1-5e9ab886e10d",
    facId: "04a757f0-d5a8-4fcc-800a-ea7230b720e8",
    venueName: "Padel 360",
    courtName: "Court 2 Pickleball",
    location: "Worli",
    type: "pickleball",
    matrix: {}
  },

  // --- NSCI PADEL WORLI ---
  {
    venueId: "7d204b7b-8574-4ac7-823a-2f9d77789dc0",
    facId: "24073885-5158-4da6-8deb-883e057fc18b",
    venueName: "NSCI Padel Club",
    courtName: "Court 1",
    location: "Worli",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "7d204b7b-8574-4ac7-823a-2f9d77789dc0",
    facId: "e7c1e55a-dd5d-44d1-89c7-06939454cc35",
    venueName: "NSCI Padel Club",
    courtName: "Court 2",
    location: "Worli",
    type: "padel",
    matrix: {}
  },

  // --- SERVE SOCIETY KOHINOOR DADAR WEST ---
  {
    venueId: "68a8c6d0-b287-412e-b93b-d6bccda98017",
    facId: "38aab321-461d-4313-9a8e-012d5c5ef16e",
    venueName: "Serve Society Kohinoor",
    courtName: "Padel Court 1",
    location: "Dadar West",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "68a8c6d0-b287-412e-b93b-d6bccda98017",
    facId: "8c4831c8-0935-4a20-9934-29e5766d6f3d",
    venueName: "Serve Society Kohinoor",
    courtName: "Padel Court 2",
    location: "Dadar West",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "68a8c6d0-b287-412e-b93b-d6bccda98017",
    facId: "3b7755c5-38c5-4105-bfc7-1e4db631e8a3",
    venueName: "Serve Society Kohinoor",
    courtName: "Padel Court 3",
    location: "Dadar West",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "68a8c6d0-b287-412e-b93b-d6bccda98017",
    facId: "f14a2ecd-9192-47a9-9d01-2f07dcad4b88",
    venueName: "Serve Society Kohinoor",
    courtName: "Pickleball Court",
    location: "Dadar West",
    type: "pickleball",
    matrix: {}
  },

  // --- 7PADEL MALABAR HILL ---
  {
    venueId: "f598bca7-4947-4bf6-bd2d-f741e3abea82",
    facId: "e04e0284-8a02-44c3-ab7b-d7593125dd8c",
    venueName: "7Padel | PDP",
    courtName: "Court 1",
    location: "Malabar Hill",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "f598bca7-4947-4bf6-bd2d-f741e3abea82",
    facId: "d0670d76-57d1-4fe0-8358-05d156f79969",
    venueName: "7Padel | PDP",
    courtName: "Court 2 (Sea Side)",
    location: "Malabar Hill",
    type: "padel",
    matrix: {}
  },

  // --- PICKLE PARTNERS MALABAR HILL ---
  {
    venueId: "754ded61-f8fa-40aa-a1f5-e63a80b02cec",
    facId: "96490d43-43e9-47ea-9ddb-9058ca985644",
    venueName: "Pickle Partners",
    courtName: "Court 1",
    location: "Malabar Hill",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "754ded61-f8fa-40aa-a1f5-e63a80b02cec",
    facId: "4b47d50e-4d58-4e96-a1bc-2c1b05cbb9b0",
    venueName: "Pickle Partners",
    courtName: "Court 2",
    location: "Malabar Hill",
    type: "pickleball",
    matrix: {}
  },

  // --- ATLAS APARTMENTS MALABAR HILL ---
  {
    venueId: "3b685388-933e-4aff-bee7-846c803c4106",
    facId: "391dc16c-a717-4c54-9583-a95a92246347",
    venueName: "Atlas Apartments",
    courtName: "Resident Court",
    location: "Malabar Hill",
    type: "pickleball",
    matrix: {}
  },

  // --- URBAN SPORTS ZONE MAHALAXMI ---
  {
    venueId: "a61ba760-78e1-40fc-a1d9-97523d80da55",
    facId: "2acab5d8-66d6-4aa7-9478-cd0f2527c174",
    venueName: "Urban Sports Zone",
    courtName: "Padel Court 1",
    location: "Mahalaxmi",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "a61ba760-78e1-40fc-a1d9-97523d80da55",
    facId: "50ad9730-91e2-4ab1-a0b5-a4d755ca73c5",
    venueName: "Urban Sports Zone",
    courtName: "Padel Court 2",
    location: "Mahalaxmi",
    type: "padel",
    matrix: {}
  },
  {
    venueId: "a61ba760-78e1-40fc-a1d9-97523d80da55",
    facId: "da2ac0bb-ff1c-4615-92bc-6478b956153a",
    venueName: "Urban Sports Zone",
    courtName: "Pickleball Court",
    location: "Mahalaxmi",
    type: "pickleball",
    matrix: {}
  },

  // --- PLAYOSPORT TARDEO / HAJI ALI ---
  {
    venueId: "9f8a1c64-7501-4ff3-90d1-1cf66e8be6ef",
    facId: "3c8608bf-a35f-4d36-a62b-427adb24ea36",
    venueName: "PlayOSport",
    courtName: "Pickleball Court 1",
    location: "Tardeo",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "9f8a1c64-7501-4ff3-90d1-1cf66e8be6ef",
    facId: "4676b5dd-db54-49dc-b15f-57241f67d727",
    venueName: "PlayOSport",
    courtName: "Court 2",
    location: "Tardeo",
    type: "pickleball",
    matrix: {}
  },

  // --- OCEAN'S EDGE CHURCHGATE / MARINE DRIVE ---
  {
    venueId: "7c5a0e6d-b720-473b-ae91-5af284e01ee6",
    facId: "271964a6-8d2f-49d2-913b-e3793807cf9c",
    venueName: "Ocean's Edge (Jai Hind)",
    courtName: "Ground Floor Court",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "7c5a0e6d-b720-473b-ae91-5af284e01ee6",
    facId: "a57abc12-3474-494b-b829-fc245ee3108c",
    venueName: "Ocean's Edge (Jai Hind)",
    courtName: "Terrace Court 1",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "7c5a0e6d-b720-473b-ae91-5af284e01ee6",
    facId: "7840f388-016a-459e-8523-f87cb1443228",
    venueName: "Ocean's Edge (Jai Hind)",
    courtName: "Terrace Court 2",
    location: "Churchgate",
    type: "pickleball",
    matrix: {}
  },

  // --- SMASH DOCK COLABA ---
  {
    venueId: "f8172f52-47fc-4e19-ba87-f9ae625eccb8",
    facId: "c46d28c1-d832-4554-ab09-13e3ba1cbf90",
    venueName: "Smash Dock",
    courtName: "Court 1",
    location: "Colaba",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "f8172f52-47fc-4e19-ba87-f9ae625eccb8",
    facId: "a88745d4-e0c7-451b-995a-961ff86104c8",
    venueName: "Smash Dock",
    courtName: "Court 2",
    location: "Colaba",
    type: "pickleball",
    matrix: {}
  },

  // --- GLOBAL SPORTS WTC CUFFE PARADE / COLABA ---
  {
    venueId: "b64026f2-7d04-4beb-bbd7-ed7166963787",
    facId: "79574d7e-f38a-46a8-a700-19f0202b6e65",
    venueName: "Global Sports | WTC",
    courtName: "Court 1",
    location: "Cuffe Parade / Colaba",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "b64026f2-7d04-4beb-bbd7-ed7166963787",
    facId: "5585fb69-6ef7-471b-af0d-066e4c6171af",
    venueName: "Global Sports | WTC",
    courtName: "Court 2",
    location: "Cuffe Parade / Colaba",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "b64026f2-7d04-4beb-bbd7-ed7166963787",
    facId: "2a7c49d4-8264-41f6-a68a-177c9d67b6a8",
    venueName: "Global Sports | WTC",
    courtName: "Court 3",
    location: "Cuffe Parade / Colaba",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "b64026f2-7d04-4beb-bbd7-ed7166963787",
    facId: "f3983aa6-2920-4b91-9024-3cdbf456cc22",
    venueName: "Global Sports | WTC",
    courtName: "Court 4",
    location: "Cuffe Parade / Colaba",
    type: "pickleball",
    matrix: {}
  },

  // --- GLOBAL SPORTS LOWER PAREL ---
  {
    venueId: "3e7f36b1-775e-4178-bae8-c1dbcb697809",
    facId: "277c8585-2218-41b1-ab02-875ad0abb0c5",
    venueName: "Global Sports",
    courtName: "Court 1",
    location: "Lower Parel",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "3e7f36b1-775e-4178-bae8-c1dbcb697809",
    facId: "f6ed0b2b-da82-4830-92f3-163c7ffae033",
    venueName: "Global Sports",
    courtName: "Court 2",
    location: "Lower Parel",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "3e7f36b1-775e-4178-bae8-c1dbcb697809",
    facId: "5319184f-6229-4cb4-a05a-8f667ab1f8f9",
    venueName: "Global Sports",
    courtName: "Court 3",
    location: "Lower Parel",
    type: "pickleball",
    matrix: {}
  },

  // --- URBAN SPORTS ZONE LOWER PAREL ---
  {
    venueId: "22ead04d-19cb-4b04-86a6-3e884ac0a7c2",
    facId: "360faa01-0902-4135-97df-250eb75ccfbb",
    venueName: "Urban Sports Zone",
    courtName: "Court 1",
    location: "Peninsula Lower Parel",
    type: "pickleball",
    matrix: {}
  },
  {
    venueId: "22ead04d-19cb-4b04-86a6-3e884ac0a7c2",
    facId: "89b0f2a6-1cfd-4bb5-9d09-cf7f3b9340d0",
    venueName: "Urban Sports Zone",
    courtName: "Court 2",
    location: "Peninsula Lower Parel",
    type: "pickleball",
    matrix: {}
  },

  // --- IRON PICKLEBALL PRABHADEVI ---
  {
    venueId: "4ca191b3-b94b-436b-b276-472ed31e2b67",
    facId: "1d314515-2d82-4269-80b4-c776aac4133a",
    venueName: "Iron Pickleball",
    courtName: "Pickleball Court",
    location: "Prabhadevi",
    type: "pickleball",
    matrix: {}
  },

  // --- SPORTZELLA PAREL ---
  {
    venueId: "47560b35-f9bc-4c10-b3ae-1f4728fb1c8b",
    facId: "5b5df85c-8aee-40aa-b63c-142db78590b6",
    venueName: "Sportzella Arena",
    courtName: "Pickleball Court",
    location: "Parel",
    type: "pickleball",
    matrix: {}
  }
];

// ALL 18 HOURLY TIMESLOTS FROM 6 AM TO 11 PM
const ALL_TIMESLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

let selectedDate = new Date().toISOString().split("T")[0];
let currentSportFilter = "padel"; // DEFAULT TO PADEL (ONLY PADEL OR PICKLEBALL)

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("HUDLE_AUTH_TOKEN")) {
    localStorage.setItem("HUDLE_AUTH_TOKEN", DEFAULT_USER_TOKEN);
  }
  
  renderDatePills();
  renderCalendarMatrix();
  syncAllVenuesLiveSlots();
  initModal();
});

// FILTER OUT PAST TIMESLOTS IF SELECTED DATE IS TODAY
function getVisibleTimeslots(dateStr) {
  const todayStr = new Date().toISOString().split("T")[0];
  if (dateStr !== todayStr) {
    return ALL_TIMESLOTS;
  }
  
  const currentHour = new Date().getHours();
  
  const filtered = ALL_TIMESLOTS.filter(timeStr => {
    const [hStr, period] = timeStr.split(" ");
    let h = parseInt(hStr.split(":")[0], 10);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    
    return h >= currentHour;
  });

  return filtered.length > 0 ? filtered : ALL_TIMESLOTS.slice(-4);
}

// RENDER TIMESLOT TABLE HEADERS
function renderCalendarHeaders(visibleSlots) {
  const headerRow = document.getElementById("calendar-header-row");
  headerRow.innerHTML = `<th class="venue-corner">South Mumbai Venue & Court</th>`;
  
  visibleSlots.forEach(timeStr => {
    const th = document.createElement("th");
    th.textContent = timeStr;
    headerRow.appendChild(th);
  });
}

// RENDER INTERACTIVE DATE PILLS
function renderDatePills() {
  const bar = document.getElementById("date-pills-bar");
  bar.innerHTML = "";
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    
    let label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const btn = document.createElement("button");
    btn.className = `date-pill ${dateStr === selectedDate ? 'active' : ''}`;
    btn.textContent = label;
    btn.onclick = () => {
      selectedDate = dateStr;
      renderDatePills();
      syncAllVenuesLiveSlots();
    };
    bar.appendChild(btn);
  }
}

// SPORT FILTER SWITCHER (ONLY PADEL OR PICKLEBALL)
function setSportFilter(filterMode) {
  currentSportFilter = filterMode;
  
  const padelCount = new Set(INDIVIDUAL_COURTS_DATA.filter(c => c.type === 'padel').map(c => c.venueName)).size;
  const pickleCount = new Set(INDIVIDUAL_COURTS_DATA.filter(c => c.type === 'pickleball').map(c => c.venueName)).size;

  const btnPadel = document.getElementById("filter-btn-padel");
  const btnPickle = document.getElementById("filter-btn-pickle");

  btnPadel.className = `sport-tab ${filterMode === 'padel' ? 'active' : ''}`;
  btnPadel.textContent = `🎾 Padel (${padelCount})`;

  btnPickle.className = `sport-tab ${filterMode === 'pickleball' ? 'active' : ''}`;
  btnPickle.textContent = `🏓 Pickleball (${pickleCount})`;
  
  renderCalendarMatrix();
}

// FETCH LIVE HUDLE SLOTS IN PARALLEL FOR BLAZING FAST SUB-SECOND SPEED
async function syncAllVenuesLiveSlots() {
  const token = localStorage.getItem("HUDLE_AUTH_TOKEN") || DEFAULT_USER_TOKEN;
  const syncStatusText = document.getElementById("sync-status-text");

  syncStatusText.textContent = "Syncing...";

  const fetchPromises = [];

  INDIVIDUAL_COURTS_DATA.forEach(courtObj => {
    courtObj.matrix = {};
    const apiUrl = `/hudle-api/venues/${courtObj.venueId}/facilities/${courtObj.facId}/slots?start_date=${selectedDate}&end_date=${selectedDate}`;
    
    const p = fetch(apiUrl, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "api-secret": "hudle-api1798@prod",
        "x-app-version": "1.0.1",
        "x-app-source": "consumer"
      }
    })
    .then(res => res.ok ? res.json() : null)
    .then(jsonRes => {
      if (jsonRes && jsonRes.data && Array.isArray(jsonRes.data)) {
        parseHudleSlotResponse(courtObj.matrix, jsonRes.data, selectedDate);
      }
    })
    .catch(err => {
      console.warn(`Parallel fetch warning for ${courtObj.courtName}:`, err);
    });

    fetchPromises.push(p);
  });

  await Promise.all(fetchPromises);

  syncStatusText.textContent = "Live Synced ✅";
  setSportFilter(currentSportFilter);
  renderCalendarMatrix();
}

// PARSE HUDLE REST API SLOT JSON RESPONSE INTO COURT TIME MATRIX
function parseHudleSlotResponse(matrixObj, slotsArray, targetDateStr) {
  slotsArray.forEach(slot => {
    if (!slot.start_time || !slot.start_time.startsWith(targetDateStr)) return;

    const timeParts = slot.start_time.split(" ");
    const time24 = timeParts[1] || timeParts[0];
    const timeStr = formatTimeTo12Hr(time24);

    const isAvail = slot.is_available === true && slot.is_booked === false;
    const priceVal = Math.round(parseFloat(slot.price || slot.discounted_price || 0));

    matrixObj[timeStr] = {
      status: isAvail ? "open" : "booked",
      price: priceVal
    };
  });
}

function formatTimeTo12Hr(time24) {
  const [hStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:00 ${ampm}`;
}

// OPEN HUDLE BOOKING PAGE
function openHudleBooking(venueId) {
  window.open(`https://hudle.in/venues/${venueId}`, '_blank');
}

// RENDER CALENDAR MATRIX GROUPED BY VENUE LOCATION WITH DIVIDERS & PAST-TIME FILTERING FOR TODAY
function renderCalendarMatrix() {
  const tbody = document.getElementById("calendar-matrix-body");
  tbody.innerHTML = "";

  const visibleSlots = getVisibleTimeslots(selectedDate);
  renderCalendarHeaders(visibleSlots);

  // Filter courts by sport (padel / pickleball)
  const filteredCourts = INDIVIDUAL_COURTS_DATA.filter(c => {
    if (currentSportFilter === "padel") return c.type === "padel";
    if (currentSportFilter === "pickleball") return c.type === "pickleball";
    return true;
  });

  // Group courts by venueName
  const groupedVenues = {};
  filteredCourts.forEach(c => {
    if (!groupedVenues[c.venueName]) {
      groupedVenues[c.venueName] = {
        venueId: c.venueId,
        name: c.venueName,
        location: c.location,
        type: c.type,
        courts: []
      };
    }
    groupedVenues[c.venueName].courts.push(c);
  });

  // Render grouped venue headers and court rows
  Object.values(groupedVenues).forEach(group => {
    // 1. Venue Section Header Divider Row
    const dividerTr = document.createElement("tr");
    dividerTr.className = "venue-header-row";
    
    const dividerTd = document.createElement("td");
    dividerTd.colSpan = visibleSlots.length + 1;
    dividerTd.innerHTML = `
      <div class="venue-header-content">
        <span class="venue-badge">${group.type === 'padel' ? 'PADEL' : 'PICKLEBALL'}</span>
        <span class="venue-name">${group.name}</span>
        <span class="venue-loc">📍 ${group.location}</span>
      </div>
    `;
    dividerTr.appendChild(dividerTd);
    tbody.appendChild(dividerTr);

    // 2. Individual Court Rows
    group.courts.forEach(c => {
      const tr = document.createElement("tr");
      
      const labelTd = document.createElement("td");
      labelTd.className = "court-label-cell";
      labelTd.innerHTML = `
        <div class="court-name">↳ ${c.courtName}</div>
      `;
      tr.appendChild(labelTd);

      visibleSlots.forEach(timeStr => {
        const slotData = c.matrix[timeStr] || { status: "empty" };
        const td = document.createElement("td");

        if (slotData.status === "open") {
          td.innerHTML = `
            <button class="slot-btn available" onclick="openHudleBooking('${c.venueId}')">
              <span>₹${slotData.price}</span>
            </button>
          `;
        } else if (slotData.status === "booked") {
          td.innerHTML = `
            <button class="slot-btn booked" disabled>
              <span>Booked</span>
            </button>
          `;
        } else {
          td.innerHTML = `
            <button class="slot-btn empty" disabled>
              <span>-</span>
            </button>
          `;
        }
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  });
}

// SETTINGS MODAL
function initModal() {
  const modal = document.getElementById("settings-modal");
  const openBtn = document.getElementById("btn-open-settings");
  const closeBtn = document.getElementById("btn-close-settings");
  const saveBtn = document.getElementById("btn-save-settings");

  openBtn.addEventListener("click", () => modal.classList.add("open"));
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  document.getElementById("hudle-token-input").value = localStorage.getItem("HUDLE_AUTH_TOKEN") || DEFAULT_USER_TOKEN;

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("HUDLE_AUTH_TOKEN", document.getElementById("hudle-token-input").value);
    modal.classList.remove("open");
    syncAllVenuesLiveSlots();
  });
}