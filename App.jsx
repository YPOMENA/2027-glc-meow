import React, { useState, useMemo, useEffect, useRef } from "react";

// Self-contained React dashboard. No packages other than React are required.
// Bangkok source: 23 November 2026. Personal email/address columns are excluded.
// Applicability follows the reference app plus user-confirmed UAE MEO; Nuha Abujaber is confirmed MO.
const SEED = {
  "rows": [
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Albahar",
      "First Name": "Hisham",
      "Nickname": "Hisham",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/05/2026 12:16"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "almheiri",
      "First Name": "sheikha",
      "Nickname": "Sheikha",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/13/2026 8:31"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Ashadawi",
      "First Name": "Budoor",
      "Nickname": "Budoor",
      "Primary Chapter": "YPO Khaleej Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/21/2026 6:02"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Bakalov",
      "First Name": "Tanya",
      "Nickname": "Tanya",
      "Primary Chapter": "YPO MENA Gulf Regional Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/08/2026 8:36"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Boukather",
      "First Name": "Anthony",
      "Nickname": "Anthony",
      "Primary Chapter": "YPO Emirates Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/04/2026 16:14"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Boukris",
      "First Name": "Stéphane",
      "Nickname": "Stéphane Boukris",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/02/2026 4:10"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Mohamed Ali",
      "First Name": "Mohiuddin",
      "Nickname": "Mohiuddin",
      "Primary Chapter": "YPO Oman Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/14/2026 14:56"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Pragjee",
      "First Name": "Akheel",
      "Nickname": "Akheel",
      "Primary Chapter": "YPO Olive MENA Regional Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/04/2026 22:53"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Shamil",
      "First Name": "Musamer",
      "Nickname": "Musamer",
      "Primary Chapter": "YPO Iraq Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/21/2026 3:47"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Assistant Learning Officer",
      "Last Name": "Shewakramani",
      "First Name": "Nitesh",
      "Nickname": "Nitesh",
      "Primary Chapter": "YPO Dubai Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Assistant Learning Officer",
      "Sessions (Optional)": "Chapter Assistant Learning Officer, Chapter Assistant Learning Officer",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/20/2026 2:49"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Asghar Ali",
      "First Name": "Saad",
      "Nickname": "Saad",
      "Primary Chapter": "YPO Bahrain Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/03/2026 7:18"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Ataya",
      "First Name": "Mona",
      "Nickname": "Mona",
      "Primary Chapter": "YPO Dubai Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/20/2026 1:51"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Daouk",
      "First Name": "Tarek",
      "Nickname": "Tarek",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/02/2026 1:58"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "de Jaroueh",
      "First Name": "Fadi",
      "Nickname": "Fadi",
      "Primary Chapter": "YPO Levant Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/17/2026 7:22"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Gasgous",
      "First Name": "Munaf",
      "Nickname": "Munaf",
      "Primary Chapter": "YPO Iraq Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 11:12"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Haq",
      "First Name": "Emad",
      "Nickname": "Emad",
      "Primary Chapter": "YPO MENA Gulf Regional Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/20/2026 3:40"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Ktari",
      "First Name": "Tahar",
      "Nickname": "Tahar",
      "Primary Chapter": "YPO Tunisia Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 9:55"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Mustafa",
      "First Name": "Muhammad",
      "Nickname": "Muhammad",
      "Primary Chapter": "YPO Capital Pakistan Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/02/2026 11:34"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Pietrek",
      "First Name": "Sascha",
      "Nickname": "Sascha",
      "Primary Chapter": "YPO Emirates Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 23:13"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Chair",
      "Last Name": "Usvat",
      "First Name": "Adriana",
      "Nickname": "Adriana",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Chair Workshop - Integrated",
      "Sessions (Optional)": "Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 13:34"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Forum Officer",
      "Last Name": "Cherfan",
      "First Name": "Adib",
      "Nickname": "Eddy",
      "Primary Chapter": "YPO Lebanon",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Forum Officer",
      "Sessions (Optional)": "Forum Officer Workshop, Forum Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 17:14"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Forum Officer",
      "Last Name": "Dadabai",
      "First Name": "Hatim",
      "Nickname": "Hatim",
      "Primary Chapter": "YPO Bahrain Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Advanced Forum Officer Workshop",
      "Sessions (Optional)": "Advanced Forum Officer Workshop, Advanced Forum Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/23/2026 4:05"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Forum Officer",
      "Last Name": "Pagarani",
      "First Name": "Elena",
      "Nickname": "Elena",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Forum Officer",
      "Sessions (Optional)": "Forum Officer Workshop, Forum Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/06/2026 7:35"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Forum Officer",
      "Last Name": "Sampat",
      "First Name": "Amit",
      "Nickname": "Amit",
      "Primary Chapter": "YPO Oman Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Advanced Forum Officer Workshop",
      "Sessions (Optional)": "Advanced Forum Officer Workshop, Advanced Forum Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/03/2026 2:26"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Forum Officer",
      "Last Name": "Soltysinska",
      "First Name": "Barbara",
      "Nickname": "Barbara Soltysinska",
      "Primary Chapter": "YPO Dubai Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Forum Officer",
      "Sessions (Optional)": "Forum Officer Workshop, Forum Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/21/2026 3:57"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Learning Officer",
      "Last Name": "Aggarwal",
      "First Name": "Suneel",
      "Nickname": "Suneel",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Learning Officer",
      "Sessions (Optional)": "Learning Officer Workshop, Learning Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 13:30"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Learning Officer",
      "Last Name": "Gandhi",
      "First Name": "Vandana",
      "Nickname": "Vandana",
      "Primary Chapter": "YPO Dubai Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Learning Officer",
      "Sessions (Optional)": "Learning Officer Workshop, Learning Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/04/2026 10:11"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Learning Officer",
      "Last Name": "Khan",
      "First Name": "Muhammad Athar",
      "Nickname": "Athar Khan",
      "Primary Chapter": "YPO Capital Pakistan Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Learning Officer",
      "Sessions (Optional)": "Learning Officer Workshop, Learning Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/10/2026 4:38"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Learning Officer",
      "Last Name": "Laghrari",
      "First Name": "Mohamed",
      "Nickname": "Mohamed",
      "Primary Chapter": "YPO Morocco Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Learning Officer - Fast Track Workshop",
      "Sessions (Optional)": "Learning Officer Workshop - Fast Track, Learning Officer Workshop - Fast Track",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/04/2026 11:42"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Learning Officer",
      "Last Name": "Shroff",
      "First Name": "Vikram",
      "Nickname": "Vikram",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Learning Officer - Fast Track Workshop",
      "Sessions (Optional)": "Learning Officer Workshop - Fast Track, Learning Officer Workshop - Fast Track",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 11:12"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Learning Officer",
      "Last Name": "Sumar",
      "First Name": "Shayan",
      "Nickname": "Shayan",
      "Primary Chapter": "YPO Oman Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Learning Officer",
      "Sessions (Optional)": "Learning Officer Workshop, Learning Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/02/2026 7:05"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Member Engagement Officer",
      "Last Name": "Ududec",
      "First Name": "Isabela",
      "Nickname": "Isabela",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Member Engagement Officer",
      "Sessions (Optional)": "Member Engagement Officer Workshop, Member Engagement Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/03/2026 3:32"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Abdallah",
      "First Name": "Hussein",
      "Nickname": "Hussein",
      "Primary Chapter": "YPO Qatar Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/22/2026 10:45"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Al Harthy",
      "First Name": "Mohamed",
      "Nickname": "Mohamed",
      "Primary Chapter": "YPO Oman Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 14:24"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Al Thani",
      "First Name": "Mohammed",
      "Nickname": "Moe",
      "Primary Chapter": "YPO Khaleej Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/17/2026 7:14"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Alsahsah",
      "First Name": "Tala",
      "Nickname": "Tala",
      "Primary Chapter": "YPO Saudi",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 9:34"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Gopinath Nair",
      "First Name": "Rahul",
      "Nickname": "Rahul",
      "Primary Chapter": "YPO Emirates Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 14:26"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "GULENC",
      "First Name": "TUNA",
      "Nickname": "TUNA",
      "Primary Chapter": "YPO UAE Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/03/2026 1:24"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Malik",
      "First Name": "Shahzad",
      "Nickname": "Shahzad",
      "Primary Chapter": "YPO Indus Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/03/2026 14:12"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Midani",
      "First Name": "Zaid",
      "Nickname": "Zaid",
      "Primary Chapter": "YPO Levant Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 23:31"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Qureshi",
      "First Name": "Inam",
      "Nickname": "Inam",
      "Primary Chapter": "YPO MENA Gulf Regional Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/02/2026 2:45"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Sahni",
      "First Name": "Harvinder",
      "Nickname": "Harvinder",
      "Primary Chapter": "YPO Kuwait Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 15:54"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Shahid Ansari",
      "First Name": "Bilal",
      "Nickname": "Bilal",
      "Primary Chapter": "YPO Capital Pakistan Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/15/2026 1:33"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Stojanovic",
      "First Name": "Milos",
      "Nickname": "Milos",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/05/2026 1:53"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Chapter Membership Officer",
      "Last Name": "Viswanathan",
      "First Name": "Kami",
      "Nickname": "Kami",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Chapter Membership Officer",
      "Sessions (Optional)": "Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/21/2026 0:50"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Dual Role Officer",
      "Last Name": "Abujaber",
      "First Name": "Nuha",
      "Nickname": "Nu",
      "Primary Chapter": "YPO Jordan Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Dual Officer Registration",
      "Sessions (Optional)": "Regional Officer Workshop, Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 14:50"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Regional Chair",
      "Last Name": "Abudawood",
      "First Name": "Sarah",
      "Nickname": "Sarah",
      "Primary Chapter": "YPO Khaleej Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Regional Chair",
      "Sessions (Optional)": "Regional Officer Workshop, Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 11:49"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Regional Chair",
      "Last Name": "Chabtini",
      "First Name": "Elias",
      "Nickname": "Elias",
      "Primary Chapter": "YPO Emirates Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Regional Chair",
      "Sessions (Optional)": "Regional Officer Workshop, Chapter Chair Workshop - Integrated, Chapter Chair Workshop - Integrated",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/02/2026 8:09"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Regional Learning Officer",
      "Last Name": "Al Bassam",
      "First Name": "Abdulaziz",
      "Nickname": "Abdulaziz",
      "Primary Chapter": "YPO Saudi",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Regional Learning Officer",
      "Sessions (Optional)": "Regional Officer Workshop, Learning Officer Workshop, Learning Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/01/2026 14:31"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Regional Learning Officer",
      "Last Name": "Barajakly",
      "First Name": "Rashad",
      "Nickname": "Rashad",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Regional Learning Officer",
      "Sessions (Optional)": "Regional Officer Workshop, Learning Officer Workshop - Fast Track, Learning Officer Workshop - Fast Track",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/04/2026 1:41"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Regional Member Engagement Officer",
      "Last Name": "El Jamali",
      "First Name": "Yacine",
      "Nickname": "Yas",
      "Primary Chapter": "YPO Morocco Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Regional Member Engagement Officer",
      "Sessions (Optional)": "Regional Officer Workshop, Member Engagement Officer Workshop, Member Engagement Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/15/2026 8:55"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Regional Membership Officer",
      "Last Name": "Dagher Hayeck",
      "First Name": "Dayala",
      "Nickname": "Dayala",
      "Primary Chapter": "YPO Lebanon",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Regional Membership Officer",
      "Sessions (Optional)": "Regional Officer Workshop, Membership Officer Workshop, Membership Officer Workshop",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/04/2026 1:52"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Workshop Delivery Team",
      "Last Name": "Bannayan",
      "First Name": "Helen",
      "Nickname": "Helen",
      "Primary Chapter": "YPO Jordan Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Workshop Delivery Team",
      "Sessions (Optional)": "",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/10/2026 22:32"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Workshop Delivery Team",
      "Last Name": "Dewji",
      "First Name": "Salim",
      "Nickname": "Salim",
      "Primary Chapter": "YPO Dubai Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Workshop Delivery Team",
      "Sessions (Optional)": "",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/17/2026 9:27"
    },
    {
      "Location": "Bangkok",
      "Registration Type": "Workshop Delivery Team",
      "Last Name": "Hadi",
      "First Name": "Shamsh",
      "Nickname": "Shamsh",
      "Primary Chapter": "YPO Dubai Downtown Integrated",
      "Primary Region": "Middle East/North Africa",
      "Contact Type": "Member",
      "Admission Item": "Workshop Delivery Team",
      "Sessions (Optional)": "",
      "Last Registration Date (GMT-05:00) Eastern [US & Canada]": "11/09/2026 8:39"
    }
  ],
  "chapters": [
    {
      "type": "YPO",
      "name": "YPO Bahrain Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Cairo Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Capital Pakistan Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Dubai Downtown Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Dubai Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Emirates Integrated"
    },
    {
      "type": "YPO Gold",
      "name": "YPO Gold Lebanon"
    },
    {
      "type": "YPO Gold",
      "name": "YPO Gold Pakistan"
    },
    {
      "type": "YPO Gold",
      "name": "YPO Gold Saudi"
    },
    {
      "type": "YPO",
      "name": "YPO Indus Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Iraq Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Jordan Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Khaleej Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Kuwait Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Lebanon"
    },
    {
      "type": "YPO",
      "name": "YPO Levant Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO MENA Gulf Regional Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO MENA One Regional Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Morocco Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Olive MENA Regional Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Oman Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Pakistan"
    },
    {
      "type": "YPO",
      "name": "YPO Palestine Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Qatar Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO Saudi"
    },
    {
      "type": "YPO",
      "name": "YPO Tunisia Integrated"
    },
    {
      "type": "YPO",
      "name": "YPO UAE Integrated"
    }
  ]
};

const DASHBOARD_CSS = ":root{--navy:#002f6c;--ink:#172d4c;--muted:#64748b;--line:#e2e8f0;--green:#237744;--pale:#f4f6fb}*{box-sizing:border-box}body{margin:0;background:var(--pale);font-family:Arial,Helvetica,sans-serif;color:var(--ink);font-size:14px}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #38a6de;outline-offset:3px}header{background:var(--navy);color:white;padding:22px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px}header img{width:132px;height:47px;object-fit:contain;background:white;border-radius:4px;padding:4px}header h1{font-size:25px;letter-spacing:-.5px;margin:2px 0 7px}header p{color:#c2d2e6;font-size:12px;margin:0}.eyebrow{text-transform:uppercase;font-size:10px;letter-spacing:2px;font-weight:bold;color:#97badd}main{max-width:1600px;margin:auto;padding:26px 32px}h2{font-size:19px;margin:0 0 7px}p{line-height:1.6}.muted{color:var(--muted);font-size:12px}.topline,.tools,.tabs,.legend,.actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.topline{justify-content:space-between;margin-bottom:20px}.btn{border:1px solid #ccd6e3;border-radius:6px;background:white;color:var(--navy);font-weight:600;padding:9px 13px;font-size:12px}.btn.primary{background:var(--navy);color:white;border-color:var(--navy)}.btn:hover{filter:brightness(.96)}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:18px 0}.stat{background:white;border:1px solid var(--line);border-radius:9px;padding:18px 20px;border-top:3px solid var(--navy)}.stat strong{display:block;font-size:31px;margin:10px 0 6px}.stat small{font-size:11px;color:var(--muted)}.stat label{font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:10px;color:var(--muted)}.notice{background:#eaf1fa;border-left:3px solid var(--navy);padding:11px 15px;border-radius:4px;font-size:12px;line-height:1.6;margin:12px 0}.notice.amber{background:#fff7e6;border-color:#c78922;color:#755116}.filters{display:grid;grid-template-columns:1.4fr 1.3fr 1fr 1fr 1.2fr 1fr auto;gap:10px;background:white;border:1px solid var(--line);border-radius:9px;padding:16px;margin:20px 0}.filters label,.form label{display:flex;flex-direction:column;gap:7px;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)}input,select{min-width:0;width:100%;border:1px solid #ced8e6;background:white;color:var(--ink);padding:9px;border-radius:5px;font-size:12px}.filters button{align-self:end}.tabs{border-bottom:1px solid #d4deeb;gap:6px;margin-top:22px}.tab{background:none;border:0;border-bottom:3px solid transparent;padding:15px 17px;color:var(--muted);font-weight:bold;font-size:12px}.tab.active{border-bottom-color:var(--navy);color:var(--navy)}.panel{background:white;border:1px solid var(--line);border-radius:0 0 9px 9px;padding:22px;margin-bottom:18px}.panelhead{display:flex;justify-content:space-between;align-items:start;gap:20px;margin-bottom:18px}.tablewrap{overflow:auto;max-height:68vh;border-radius:6px;border:1px solid var(--line)}table{border-collapse:separate;border-spacing:0;width:100%;font-size:12px}th{background:var(--navy);color:white;text-align:left;padding:13px 12px;position:sticky;top:0;z-index:2;font-size:11px;white-space:nowrap}th button{background:none;color:inherit;border:0;padding:0;font:inherit;cursor:pointer}td{padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:middle}tbody tr:nth-child(even){background:#f8fafd}tbody tr:hover{background:#edf3fb}.chapter{background:var(--navy);color:white;position:sticky;left:0;min-width:252px;z-index:1;font-weight:bold;border-bottom:1px solid #244c80}.chapter small{display:block;color:#b8cce3;font-size:10px;margin-top:5px;font-weight:normal}.center{text-align:center}.chip{display:inline-block;font-size:10px;font-weight:bold;border-radius:4px;padding:6px 8px;border:0;white-space:nowrap}.registered{background:#e1f3e6;color:#216c3b}.unregistered{background:#fce9ec;color:#a6374b}.pending{background:#fff0ce;color:#885d05}.na{background:#e8edf4;color:#738096}.cellbtn{border:0;background:none;padding:0;color:inherit;width:100%}.officer{display:block;font-size:10px;color:#52677d;margin-top:5px;max-width:150px;white-space:normal}.coverage{min-width:95px}.bar{height:4px;background:#e4eaf3;border-radius:4px;margin-top:7px;overflow:hidden}.bar i{display:block;background:#368458;height:100%}.legend{font-size:11px;margin-top:16px;gap:18px}.empty{padding:35px;text-align:center;color:var(--muted)}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.rolecard{border:1px solid var(--line);border-radius:7px;padding:18px}.rolecard h3{margin:0 0 14px;font-size:14px}.rolecard .rate{font-size:26px;color:var(--navy);font-weight:bold}.rolecard details{font-size:12px;border-top:1px solid var(--line);padding-top:10px;margin-top:12px}.rolecard summary{cursor:pointer;line-height:1.7}.person{border-bottom:1px solid var(--line);padding:10px 0;font-size:12px;line-height:1.6}.link{border:0;background:none;color:var(--navy);text-align:left;text-decoration:underline;padding:0;font:inherit;cursor:pointer}dialog{border:0;border-radius:10px;box-shadow:0 20px 90px #10244355;max-width:860px;width:94%;padding:28px;color:var(--ink)}dialog::backdrop{background:#142d4f88}dialog h2{padding-right:40px}.close{position:absolute;right:18px;top:14px;border:0;background:#eef2f8;border-radius:50%;width:30px;height:30px;font-size:20px}.detailgrid{display:grid;grid-template-columns:155px 1fr;gap:10px;font-size:13px;line-height:1.6}.detailgrid dt{color:var(--muted)}.detailgrid dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}.record{border:1px solid var(--line);border-radius:7px;padding:17px;margin:14px 0}.form{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}.form label.wide{grid-column:1/-1}#toast{position:fixed;bottom:25px;right:25px;background:var(--navy);color:white;max-width:500px;padding:14px 20px;border-radius:7px;box-shadow:0 8px 30px #1234;z-index:10;display:none}footer{font-size:11px;color:var(--muted);padding:0 32px 25px;line-height:1.7}.gold{color:#ffe19d}details.audit{background:white;border:1px solid var(--line);border-radius:7px;padding:15px;margin-top:18px}summary{cursor:pointer}#preview{line-height:1.7}.historyrow{padding:15px 0;border-bottom:1px solid var(--line)}.historyrow .actions{margin-top:8px}.pill{background:#eaf0f9;border-radius:20px;padding:5px 10px;font-size:11px}input[type=checkbox]{width:auto}.error{color:#a0233b;background:#fff0f2;padding:12px;border-radius:6px}.scope{font-size:10px;color:var(--muted)}@media(max-width:1000px){.filters{grid-template-columns:repeat(3,1fr)}.cards{grid-template-columns:repeat(2,1fr)}main{padding:20px 16px}header{padding:20px 16px}.stats{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.filters,.cards,.form{grid-template-columns:1fr}.stats{gap:8px}.stat{padding:14px}.stat strong{font-size:25px}.tab{padding:13px 8px;font-size:11px}header h1{font-size:19px}header img{width:85px}main{padding:16px 10px}.panel{padding:14px}.detailgrid{grid-template-columns:1fr;gap:4px}.detailgrid dd{margin-bottom:12px}}@media print{header{print-color-adjust:exact}.filters,.actions,.tabs,footer{display:none}.tablewrap{max-height:none;overflow:visible}.chapter,th{position:static;print-color-adjust:exact}main{padding:10px}.panel{padding:0}body{font-size:11px}}\n\n.ypo-dashboard {min-height:100vh;background:#f4f6fb;color:#172d4c;font-family:Arial,Helvetica,sans-serif;font-size:14px}.ypo-toast{position:fixed;bottom:25px;right:25px;background:#002f6c;color:white;max-width:min(500px,90vw);padding:14px 20px;border-radius:7px;box-shadow:0 8px 30px #1234;z-index:10}button:disabled{opacity:.45;cursor:not-allowed}dialog:not([open]){display:none}";

const Core = (() => {
const roles={CC:'Chapter Chair',LO:'Learning Officer',ALO:'Assistant Learning Officer',FO:'Forum Officer',MO:'Membership Officer',MEO:'Member Engagement Officer',SPO:'Spouse/Partner Officer',SFO:'Spouse Forum Officer',Fam:'Family Officer'};
const core=['CC','LO','ALO','FO','MO','MEO'], non=['SPO','SFO','Fam'];
const norm=s=>String(s??'').normalize('NFC').trim().replace(/\s+/g,' ').toLowerCase();
// User-confirmed exception: YPO UAE Integrated has an applicable MEO role.
const applicable=(ch,r)=>r==='MO'?ch.type!=='YPO Gold':r==='MEO'?(ch.type==='YPO Gold'||norm(ch.name)==='ypo uae integrated'):true;
const confirmations=[
 {name:'Isabela Ududec',chapter:'YPO UAE Integrated',role:'MEO',types:['Chapter Member Engagement Officer'],note:'User confirmed Isabela Ududec as registered MEO; MEO applies to YPO UAE Integrated.'},
 {name:'Nuha Abujaber',chapter:'YPO Jordan Integrated',role:'MO',types:['Dual Role Officer','Chapter Membership Officer'],note:'User confirmed Nuha Abujaber as chapter Membership Officer (MO).'}
];
function roleOf(s){s=norm(s).replace(/spouse\s*\/\s*partner/g,'spouse partner'); if(/assistant learning/.test(s))return 'ALO';if(/spouse.*forum/.test(s))return 'SFO';if(/spouse|partner officer/.test(s))return 'SPO';if(/family officer/.test(s))return 'Fam';if(/member engagement/.test(s))return 'MEO';if(/membership officer/.test(s))return 'MO';if(/learning officer/.test(s))return 'LO';if(/forum officer/.test(s))return 'FO';if(/chapter chair/.test(s))return 'CC';return null;}
function cleanRow(row){return Object.fromEntries(Object.entries(row).filter(([k])=>!/(email|phone|address)/i.test(k)).map(([k,v])=>[String(k).replace(/^\uFEFF/,'').trim(),String(v??'').trim()]));}
function isNetworkOfficer(raw,name){
 // Use appointment/registration fields, never a workshop title alone.
 const fields=['Registration Type','Officer Role','Admission Item','Role Scope','Officer Scope','Officer Level','Officer Category','Registration Category'];
 return norm(name)==='karin troy'||fields.some(key=>/\bnetworks?\b/i.test(String(raw[key]||'')));
}
const isIncluded=record=>record.scope!=='Network'&&!record.excluded;
const reportRecords=records=>records.filter(isIncluded);
function process(rows,chapters,location){let seen=new Set(),duplicates=0;const out=[];for(let [index,input] of rows.entries()){
 const raw=cleanRow(input);const fingerprint=JSON.stringify(Object.entries(raw).sort());if(seen.has(fingerprint)){duplicates++;continue;}seen.add(fingerprint);
 const get=(...keys)=>keys.map(k=>raw[k]).find(v=>v)||'';
 const name=get('Full Name','Officer Name')||[get('First Name'),get('Last Name')].filter(Boolean).join(' '), chapter=get('Primary Chapter','Chapter'), type=get('Registration Type','Officer Role'), session=get('Sessions (Optional)','Workshop/session','Workshop','Session'), loc=get('Location','Training location')||location||'';
 const network=isNetworkOfficer(raw,name);
 const ch=chapters.find(c=>norm(c.name)===norm(chapter)), regional=/^regional /i.test(type), delivery=/delivery team/i.test(type), dual=/dual role/i.test(type);
 let role=roleOf(type);const sessionRoles=[...new Set(session.split(/[,;\n]/).map(roleOf).filter(Boolean))];let issues=[];
 if(!ch&&!network)issues.push('Chapter is not in the reference chapter list');if(!name)issues.push('Officer name is missing');if(!['Bangkok','San Diego'].includes(loc))issues.push('Location is missing or unrecognized');
 let scope=network?'Network':regional?'Regional':delivery?'Delivery team':'Chapter';
 if(network||regional||delivery)role=null;
 else if(dual||!role){role=sessionRoles.length===1?sessionRoles[0]:null;issues.push(dual?'Dual-role appointment needs confirmation':'Officer role needs mapping');}
 const confirmation=!network&&confirmations.find(c=>norm(c.name)===norm(name)&&norm(c.chapter)===norm(chapter)&&c.types.some(t=>norm(t)===norm(type)));
 if(confirmation){role=confirmation.role;scope='Chapter';issues=issues.filter(issue=>issue!=='Dual-role appointment needs confirmation'&&issue!=='Officer role needs mapping');}
 if(role&&ch&&!applicable(ch,role))issues.push('Role conflicts with reference chapter applicability');
 if(role&&sessionRoles.length&&(!sessionRoles.includes(role)||sessionRoles.length>1))issues.push('Workshop and officer role need clarification');
 const sourceStatus=get('Registration Status','Status');if(sourceStatus&&!/^(registered|confirmed|active)$/i.test(sourceStatus))issues.push('Source status requires review: '+sourceStatus);
 const date=get('Last Registration Date (GMT-05:00) Eastern [US & Canada]','Registration date','Registration Date');
 const status=issues.length?'Pending Verification':'Registered';
 const id=[norm(name),norm(chapter),norm(type),norm(loc)].join('|');
 out.push({id,sourceRow:index+2,name,chapter:ch?.name||chapter,sourceChapter:chapter,type,role,scope,location:loc,session,displaySession:[...new Set(session.split(/[,;\n]/).map(x=>x.trim()).filter(Boolean))].join('; '),date,status,issues,confirmation:confirmation?.note||'',excluded:network,exclusionReason:network?'Network Officer - excluded from reporting':'',raw});
 }return {records:out,sourceRows:rows.length,duplicates};}
function diff(prev,next){const buckets=arr=>{let m=new Map();for(const r of arr){if(!m.has(r.id))m.set(r.id,[]);m.get(r.id).push(r);}return m;};const a=buckets(prev),b=buckets(next),added=[],missing=[],changed=[];for(const k of new Set([...a.keys(),...b.keys()])){let aa=[...(a.get(k)||[])],bb=[...(b.get(k)||[])];for(let i=aa.length-1;i>=0;i--){const j=bb.findIndex(r=>JSON.stringify(r.raw)===JSON.stringify(aa[i].raw));if(j>=0){aa.splice(i,1);bb.splice(j,1);}}while(aa.length&&bb.length)changed.push({before:aa.shift(),after:bb.shift()});missing.push(...aa);added.push(...bb);}return {added,missing,changed};}
function csv(text){text=text.replace(/^\uFEFF/,'');const sep=(text.split(/\r?\n/)[0].match(/;/g)||[]).length>(text.split(/\r?\n/)[0].match(/,/g)||[]).length?';':',';let rows=[],row=[],field='',quoted=false;for(let i=0;i<text.length;i++){let c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===sep&&!quoted){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(x=>x.trim()))rows.push(row);row=[];field='';}else field+=c;}if(quoted)throw Error('CSV contains an unfinished quoted field.');row.push(field);if(row.some(x=>x.trim()))rows.push(row);if(rows.length<2)throw Error('No registration rows found.');let headers=rows.shift().map(h=>h.trim());if(new Set(headers).size!==headers.length)throw Error('Duplicate column headings found.');return rows.map((r,i)=>{if(r.length!==headers.length)throw Error('Column count differs at CSV row '+(i+2));return Object.fromEntries(headers.map((h,j)=>[h,r[j]]));});}
function cell(ch,r,records,loaded=true){const related=records.filter(x=>isIncluded(x)&&x.chapter===ch.name&&x.role===r&&x.scope==='Chapter');const good=related.filter(x=>x.status==='Registered');return {records:related,status:!applicable(ch,r)?'Not Applicable':good.length?'Registered':related.length||!loaded?'Pending Verification':'Unregistered',conflict:!applicable(ch,r)&&related.length>0};}
// Only these two labels are presented to users; other internal states stay blank.
const visibleStatus=status=>status==='Registered'||status==='Unregistered'?status:'';
function refreshSnapshot(snapshot,chapters){return {...snapshot,records:snapshot.records.map(record=>record.raw?{...process([record.raw],chapters,snapshot.location).records[0],sourceRow:record.sourceRow}:record)};}
const reportingDiff=(prev,next)=>diff(reportRecords(prev),reportRecords(next));
return {roles,core,non,norm,applicable,process,diff,csv,cell,cleanRow,refreshSnapshot,visibleStatus,isIncluded,reportRecords,reportingDiff};
})();


// Creates a downloadable PDF in the browser without third-party packages.
// Canvas uses the browser's Unicode fonts so officer names retain their accents.
const PdfReport = (() => {
  const W = 794, H = 1123, M = 24, NAVY = '#002F6C';
  function wrap(ctx, value, width) {
    const result = [];
    for (const paragraph of String(value ?? '').split('\n')) {
      let line = '';
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        if (ctx.measureText(line ? line + ' ' + word : word).width <= width) { line = line ? line + ' ' + word : word; continue; }
        if (line) { result.push(line); line = ''; }
        // Split very long names/words rather than letting them overlap a column.
        for (const letter of word) {
          if (ctx.measureText(line + letter).width > width && line) { result.push(line); line = ''; }
          line += letter;
        }
      }
      result.push(line);
    }
    return result.length ? result : [''];
  }
  const text = (ctx, value, x, y, color = '#172d4c', font = '12px Arial') => { ctx.fillStyle = color; ctx.font = font; ctx.fillText(String(value), x, y); };
  function bytes(value) { return new TextEncoder().encode(value); }
  function assemblePdf(images) {
    const pieces = [], offsets = [0]; let length = 0;
    const append = value => { const part = typeof value === 'string' ? bytes(value) : value; pieces.push(part); length += part.length; };
    const object = (number, content) => { offsets[number] = length; append(`${number} 0 obj\n`); content(); append('\nendobj\n'); };
    append('%PDF-1.4\n');
    object(1, () => append('<< /Type /Catalog /Pages 2 0 R >>'));
    object(2, () => append(`<< /Type /Pages /Count ${images.length} /Kids [${images.map((_, i) => `${3 + i * 3} 0 R`).join(' ')}] >>`));
    images.forEach((jpeg, i) => {
      const page = 3 + i * 3, image = page + 1, stream = page + 2;
      object(page, () => append(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i} ${image} 0 R >> >> /Contents ${stream} 0 R >>`));
      object(image, () => { append(`<< /Type /XObject /Subtype /Image /Width ${W * 2} /Height ${H * 2} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`); append(jpeg); append('\nendstream'); });
      const commands = `q\n595.28 0 0 841.89 0 0 cm\n/Im${i} Do\nQ\n`;
      object(stream, () => append(`<< /Length ${bytes(commands).length} >>\nstream\n${commands}endstream`));
    });
    const xref = length, count = 3 + images.length * 3;
    append(`xref\n0 ${count}\n0000000000 65535 f \n`);
    for (let i = 1; i < count; i++) append(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
    append(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    return new Blob(pieces, { type: 'application/pdf' });
  }
  async function generate({ chapters, snapshots, location = 'All' }) {
    if (document.fonts?.ready) await document.fonts.ready;
    const records = snapshots.flatMap(s => s.records).filter(r => Core.isIncluded(r) && (location === 'All' || r.location === location));
    const showLocations = location === 'All' && new Set(records.map(r => r.location)).size > 1;
    const loaded = location === 'All' ? ['Bangkok', 'San Diego'].every(l => snapshots.some(s => s.location === l)) : snapshots.some(s => s.location === location);
    const asOf = snapshots.filter(s => location === 'All' || s.location === location).map(s => `${s.location}: ${s.date}`).join(' | ') || 'No report loaded for this location';
    const total = chapters.reduce((sum, ch) => sum + Core.core.filter(r => Core.applicable(ch, r)).length, 0);
    const registered = chapters.reduce((sum, ch) => sum + Core.core.filter(r => Core.applicable(ch, r) && Core.cell(ch, r, records, loaded).status === 'Registered').length, 0);
    const canvas = document.createElement('canvas'); canvas.width = W * 2; canvas.height = H * 2;
    const ctx = canvas.getContext('2d'); if (!ctx) throw Error('PDF drawing is not supported in this browser.');
    ctx.scale(2, 2); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = NAVY; ctx.fillRect(M, 21, 31, 3);
    text(ctx, 'MIDDLE EAST & NORTH AFRICA', M + 42, 26, '#64748b', 'bold 9px Arial');
    text(ctx, 'MENA GLC Registrations 2027', M, 53, NAVY, 'bold 24px Arial');
    text(ctx, 'Bangkok: 15-16 March 2027 | San Diego: 3-4 May 2027', M, 73, '#52677d', '10px Arial');
    ctx.textAlign = 'right';
    text(ctx, `${total ? (registered / total * 100).toFixed(1) : '0.0'}%`, W - M, 52, NAVY, 'bold 29px Arial');
    text(ctx, 'CORE ROLE COVERAGE', W - M, 69, '#64748b', '8px Arial');
    ctx.textAlign = 'left';
    text(ctx, `Data as of ${asOf}`, M, 89, '#52677d', '10px Arial');
    ctx.fillStyle = '#f0f4f9'; ctx.fillRect(M, 98, W - M * 2, 27);
    text(ctx, 'All ' + chapters.length + ' chapters', M + 9, 115, NAVY, 'bold 11px Arial');
    text(ctx, registered + '/' + total + ' core roles registered', M + 153, 115, NAVY, 'bold 11px Arial');
    text(ctx, records.length + ' included records', M + 391, 115, '#52677d', '10px Arial');
    text(ctx, 'Location: ' + location, M + 571, 115, NAVY, 'bold 10px Arial');
    const colors = { Registered: ['#e6f3e9', '#216c3b'], Unregistered: ['#fbecef', '#a6374b'], 'Pending Verification': ['#ffffff', '#52677d'], 'Not Applicable': ['#ffffff', '#738096'] };
    let legendX = M;
    for (const [label, status, width] of [['Names = Registered', 'Registered', 175], ['— Unregistered', 'Unregistered', 145]]) {
      ctx.fillStyle = colors[status][0]; ctx.fillRect(legendX, 134, 11, 11);
      text(ctx, label, legendX + 16, 143, colors[status][1], '9px Arial'); legendX += width;
    }
    if (showLocations) text(ctx, 'B = Bangkok | S = San Diego', M + 365, 143, '#64748b', '9px Arial');
    const widths = [176, 88, 88, 88, 88, 88, 88, 42];
    const plans = [...chapters].sort((a, b) => a.name.localeCompare(b.name)).map(ch => {
      ctx.font = 'bold 10px Arial'; const chapterLines = wrap(ctx, ch.name, widths[0] - 12);
      const cells = Core.core.map((role, i) => {
        const cell = Core.cell(ch, role, records, loaded); ctx.font = '10px Arial';
        const officers = new Map();
        for (const r of cell.records) {
          const key = Core.norm(r.name) + '|' + r.status;
          if (!officers.has(key)) officers.set(key, { name: r.name || 'Name not supplied', locations: new Set() });
          officers.get(key).locations.add(r.location === 'Bangkok' ? 'B' : r.location === 'San Diego' ? 'S' : r.location);
        }
        const lines = [...officers.values()].flatMap(r => wrap(ctx, r.name + (showLocations ? ' ' + [...r.locations].sort().join('/') : ''), widths[i + 1] - 12));
        return { ...cell, lines };
      });
      const height = Math.max(27, chapterLines.length * 12 + 9, ...cells.map(cell => cell.lines.length * 12 + 9));
      const applicable = Core.core.filter(role => Core.applicable(ch, role));
      return { ch, chapterLines, cells, height, coverage: `${applicable.filter(role => Core.cell(ch, role, records, loaded).status === 'Registered').length}/${applicable.length}` };
    });
    const nonCore = records.filter(r => Core.non.includes(r.role) && r.scope === 'Chapter').sort((a, b) => a.chapter.localeCompare(b.chapter));
    ctx.font = '10px Arial';
    const nonCorePlans = nonCore.map(r => wrap(ctx, `${r.chapter} | ${Core.roles[r.role]} | ${r.name || 'Name not supplied'} | ${r.location} | ${r.displaySession || 'Session not supplied'} | ${Core.visibleStatus(r.status)}`, W - M * 2 - 12));
    const bodyHeight = 28 + plans.reduce((sum, row) => sum + row.height, 0) + (nonCore.length ? 28 + nonCorePlans.reduce((sum, lines) => sum + lines.length * 12 + 7, 0) : 0);
    const tableTop = 154;
    const availableHeight = H - tableTop - 64;
    const fit = Math.min(1, availableHeight / bodyHeight);
    // Keep the same horizontal and vertical scale so letters never flatten.
    const left = M + (W - M * 2) * (1 - fit) / 2;
    ctx.save(); ctx.translate(left, tableTop); ctx.scale(fit, fit);
    ctx.fillStyle = NAVY; ctx.fillRect(0, 0, W - M * 2, 28);
    let x = 0;
    ['Chapter', ...Core.core, 'Total'].forEach((label, i) => { text(ctx, label, x + 6, 18, '#ffffff', 'bold 10px Arial'); x += widths[i]; });
    let y = 28;
    for (const row of plans) {
      ctx.fillStyle = '#f5f7fa'; ctx.fillRect(0, y, widths[0], row.height);
      row.chapterLines.forEach((line, i) => text(ctx, line, 6, y + 15 + i * 12, NAVY, 'bold 10px Arial'));
      x = widths[0];
      row.cells.forEach((cell, i) => {
        const [bg, color] = colors[cell.status]; ctx.fillStyle = bg; ctx.fillRect(x + 1, y + 1, widths[i + 1] - 2, row.height - 2);
        if (cell.lines.length) cell.lines.forEach((line, j) => text(ctx, line, x + 6, y + 15 + j * 12, color, '10px Arial'));
        else if (cell.status === 'Unregistered') text(ctx, '—', x + 6, y + 17, color, '10px Arial');
        x += widths[i + 1];
      });
      text(ctx, row.coverage, x + 7, y + 17, NAVY, 'bold 10px Arial');
      ctx.strokeStyle = '#dce3ec'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(0, y + row.height); ctx.lineTo(W - M * 2, y + row.height); ctx.stroke();
      y += row.height;
    }
    if (nonCore.length) {
      text(ctx, 'NON-CORE OFFICER REGISTRATIONS', 0, y + 20, NAVY, 'bold 10px Arial'); y += 28;
      for (const lines of nonCorePlans) { lines.forEach((line, i) => text(ctx, line, 6, y + 11 + i * 12, '#263d59', '10px Arial')); y += lines.length * 12 + 7; }
    }
    ctx.restore();
    const notesY = Math.min(H - 56, tableTop + bodyHeight * fit + 15);
    text(ctx, 'CC Chair | LO Learning | ALO Assistant Learning | FO Forum | MO Membership | MEO Member Engagement', M, notesY, '#64748b', '8px Arial');
    if (!nonCore.length) text(ctx, 'SPO / SFO / Family: no registrations identified. Non-core applicability is unconfirmed.', M, notesY + 13, '#64748b', '8px Arial');
    ctx.strokeStyle = '#dce3ec'; ctx.beginPath(); ctx.moveTo(M, H - 34); ctx.lineTo(W - M, H - 34); ctx.stroke();
    text(ctx, loaded ? 'Registration does not establish attendance. Network, regional and delivery officers are excluded from chapter coverage.' : 'Selected-location data is incomplete; missing registrations await verification. Registration does not establish attendance.', M, H - 19, '#64748b', '8px Arial');
    ctx.textAlign = 'right'; text(ctx, '1 / 1', W - M, H - 19, '#64748b', '8px Arial'); ctx.textAlign = 'left';
    const data = canvas.toDataURL('image/jpeg', .97).split(',')[1];
    return assemblePdf([Uint8Array.from(atob(data), ch => ch.charCodeAt(0))]);
  }
  return { generate };
})();


// Browser-native .xlsx reader for current Edge/Chrome; CSV is also supported.
async function readXlsx(buffer){const view=new DataView(buffer),bytes=new Uint8Array(buffer),decoder=new TextDecoder();let end=-1;for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--)if(view.getUint32(i,true)===0x06054b50){end=i;break;}if(end<0)throw Error('This is not a readable .xlsx file. Save it as Excel Workbook (.xlsx) or CSV.');const n=view.getUint16(end+10,true),files=new Map();let at=view.getUint32(end+16,true);for(let i=0;i<n;i++){if(view.getUint32(at,true)!==0x02014b50)throw Error('Invalid Excel archive.');const method=view.getUint16(at+10,true),size=view.getUint32(at+20,true),ulen=view.getUint32(at+24,true),nl=view.getUint16(at+28,true),el=view.getUint16(at+30,true),cl=view.getUint16(at+32,true),offset=view.getUint32(at+42,true),name=decoder.decode(bytes.slice(at+46,at+46+nl));if(ulen>30000000)throw Error('Workbook sheet exceeds the 30 MB uncompressed limit.');files.set(name,{method,size,offset});at+=46+nl+el+cl;}
 async function xml(path){const f=files.get(path);if(!f)return null;let p=f.offset+30+view.getUint16(f.offset+26,true)+view.getUint16(f.offset+28,true),data=bytes.slice(p,p+f.size);if(f.method===8)data=new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());else if(f.method!==0)throw Error('Excel compression is not supported. Please use CSV.');const doc=new DOMParser().parseFromString(decoder.decode(data),'application/xml');if(doc.querySelector('parsererror'))throw Error('Workbook XML cannot be read.');return doc;}
 const strings=await xml('xl/sharedStrings.xml'),shared=strings?[...strings.getElementsByTagName('si')].map(si=>[...si.getElementsByTagName('t')].map(t=>t.textContent).join('')):[];
 const workbook=await xml('xl/workbook.xml'),rels=await xml('xl/_rels/workbook.xml.rels');if(!workbook||!rels)throw Error('Workbook metadata is missing.');const sheets=[];
 for(const sheet of workbook.getElementsByTagName('sheet')){const relation=[...rels.getElementsByTagName('Relationship')].find(r=>r.getAttribute('Id')===sheet.getAttribute('r:id'));if(!relation)continue;let target=relation.getAttribute('Target');target=target.startsWith('/')?target.slice(1):'xl/'+target;target=target.replace('xl/../','');const doc=await xml(target);if(!doc)continue;let matrix=[...doc.getElementsByTagName('row')].map(row=>{const arr=[];for(const c of row.getElementsByTagName('c')){let ref=c.getAttribute('r').match(/[A-Z]+/)[0],col=0;for(const ch of ref)col=col*26+ch.charCodeAt(0)-64;let type=c.getAttribute('t'),v=c.getElementsByTagName('v')[0]?.textContent||'';arr[col-1]=type==='s'?shared[+v]:type==='inlineStr'?[...c.getElementsByTagName('t')].map(t=>t.textContent).join(''):v;}return arr;}).filter(r=>r.some(x=>x));if(matrix.length<2)continue;const head=matrix.shift().map(h=>String(h??'').trim());sheets.push({name:sheet.getAttribute('name'),rows:matrix.map(row=>Object.fromEntries(head.map((h,i)=>{let val=row[i]??'';if(/registration.*date/i.test(h)&&/^\d+(\.\d+)?$/.test(val)){const d=new Date((+val-25569)*86400000);val=`${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()} ${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;}return [h,String(val)];})))});}
 if(!sheets.length)throw Error('No worksheets containing data were found.');return sheets;}


const STORAGE_KEY = "ypo-mena-glc-2027-react-v1";
const INITIAL_RESULT = Core.process(SEED.rows, SEED.chapters, "Bangkok");
const INITIAL_SNAPSHOT = { id: "bangkok-2026-11-23", date: "2026-11-23", location: "Bangkok", filename: "BKK_23 NOV(Registrant Details).csv", mode: "complete", ...INITIAL_RESULT };
const TOTAL_APPLICABLE = SEED.chapters.reduce((sum, ch) => sum + Core.core.filter(role => Core.applicable(ch, role)).length, 0);
const STATUS_CLASS = { Registered: "registered", Unregistered: "unregistered" };
const STATUS_ICON = { Registered: "✓", Unregistered: "○" };
const DATES = { Bangkok: "15–16 March 2027", "San Diego": "3–4 May 2027" };
const percentage = (n, d) => d ? `${(n / d * 100).toFixed(1)}%` : "—";
const normalize = Core.norm;
const todayDubai = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
function dateNumber(value) {
  const m = String(value || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
  return m ? Date.UTC(+m[3], +m[1] - 1, +m[2], +(m[4] || 0), +(m[5] || 0)) : Date.parse(value) || 0;
}
function downloadFile(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename; document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function snapshotCoverage(snapshot) {
  return SEED.chapters.reduce((sum, chapter) => sum + Core.core.filter(role => Core.applicable(chapter, role) && Core.cell(chapter, role, snapshot.records).status === "Registered").length, 0);
}
function previousSnapshot(snapshot, snapshots) {
  return snapshots.filter(s => s.location === snapshot.location && s.id !== snapshot.id && (s.date < snapshot.date || s.date === snapshot.date && snapshots.indexOf(s) < snapshots.indexOf(snapshot)))
    .sort((a, b) => b.date.localeCompare(a.date) || snapshots.indexOf(b) - snapshots.indexOf(a))[0];
}
function StatusBadge({ status }) { if (!Core.visibleStatus(status)) return null; return <span className={`chip ${STATUS_CLASS[status]}`}>{STATUS_ICON[status]} {status}</span>; }
function OfficerRecord({ record: r }) {
  const fields = {
    "Chapter": r.chapter, "Source officer role": r.type,
    "Mapped chapter role": r.role ? Core.roles[r.role] : "No chapter role assigned", "Scope": r.scope, "Reporting": r.excluded ? r.exclusionReason : "Included",
    "Training location": r.location, "Training dates": DATES[r.location] || "Not supplied",
    "Workshop / session": r.displaySession || "Not supplied", "Registration date": r.date || "Not supplied",
    "Source time zone": "Eastern GMT−05:00, retained as supplied", "Source row": r.sourceRow,
    "Verification notes": r.issues.join("; ") || r.confirmation || "No mapping issues identified"
  };
  return <article className="record"><h3>{r.name || "Name not supplied"}</h3><StatusBadge status={r.status} /><dl className="detailgrid">{Object.entries(fields).map(([label, value]) => <React.Fragment key={label}><dt>{label}</dt><dd>{value}</dd></React.Fragment>)}</dl></article>;
}

export default function App() {
  const [snapshots, setSnapshots] = useState(() => {
    if (typeof window === "undefined") return [INITIAL_SNAPSHOT];
    try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); return Array.isArray(saved) && saved.length && saved.every(s => Array.isArray(s.records)) ? saved.map(s => Core.refreshSnapshot(s, SEED.chapters)) : [INITIAL_SNAPSHOT]; }
    catch { return [INITIAL_SNAPSHOT]; }
  });
  const [storageOK, setStorageOK] = useState(true);
  const [filters, setFilters] = useState({ chapter: "", name: "", role: "All", location: "Bangkok", status: "All", sort: "coverage-desc" });
  const [tab, setTab] = useState(0);
  const [report, setReport] = useState("current");
  const [tableSort, setTableSort] = useState({ key: "name", direction: 1 });
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState("");
  const [savingPdf, setSavingPdf] = useState(false);
  const [importForm, setImportForm] = useState({ location: "Bangkok", date: todayDubai(), mode: "complete", filename: "", sheet: 0, sheets: [] });
  const [importError, setImportError] = useState("");
  const [reading, setReading] = useState(false);
  const dialogRef = useRef(null);
  const restoreRef = useRef(null);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots)); setStorageOK(true); } catch { setStorageOK(false); } }, [snapshots]);
  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(""), 6500); return () => clearTimeout(timer); }, [message]);
  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; if (modal && !dialog.open) dialog.showModal(); else if (!modal && dialog.open) dialog.close(); }, [modal]);

  const selected = useMemo(() => report !== "current" ? snapshots.filter(s => s.id === report) : ["Bangkok", "San Diego"].map(location => snapshots.filter(s => s.location === location).sort((a, b) => b.date.localeCompare(a.date) || snapshots.indexOf(b) - snapshots.indexOf(a))[0]).filter(Boolean), [snapshots, report]);
  const model = useMemo(() => {
    const locationLoaded = filters.location === "All" ? selected.length === 2 : selected.some(s => s.location === filters.location);
    const sourceRecords = selected.flatMap(s => s.records).filter(r => (filters.location === "All" || r.location === filters.location) && normalize(r.name).includes(normalize(filters.name)));
    const records = Core.reportRecords(sourceRecords);
    let chapters = SEED.chapters.filter(ch => normalize(ch.name).includes(normalize(filters.chapter)) && (!filters.name || records.some(r => r.chapter === ch.name)));
    const roleKeys = (tab === 2 ? Core.non : Core.core).filter(role => filters.role === "All" || filters.role === role);
    const getCell = (ch, role) => { const cell = Core.cell(ch, role, records, locationLoaded); if (Core.non.includes(role) && !cell.records.length) cell.status = "Pending Verification"; return cell; };
    const slots = chapters.flatMap(ch => roleKeys.map(role => ({ ch, role, ...getCell(ch, role) }))).filter(cell => filters.status === "All" || cell.status === filters.status);
    if (filters.status !== "All") chapters = chapters.filter(ch => slots.some(cell => cell.ch.name === ch.name));
    const applicable = slots.filter(cell => Core.core.includes(cell.role) && Core.applicable(cell.ch, cell.role));
    const coverage = ch => { const matching = applicable.filter(cell => cell.ch.name === ch.name); return { registered: matching.filter(cell => cell.status === "Registered").length, applicable: matching.length }; };
    chapters = [...chapters].sort((a, b) => { if (filters.sort === "name") return a.name.localeCompare(b.name); const x = coverage(a), y = coverage(b); return (filters.sort === "coverage-asc" ? 1 : -1) * ((x.applicable ? x.registered / x.applicable : 0) - (y.applicable ? y.registered / y.applicable : 0)) || a.name.localeCompare(b.name); });
    const details = sourceRecords.filter(r => normalize(r.chapter).includes(normalize(filters.chapter)) && (filters.role === "All" || r.role === filters.role) && (tab !== 2 || Core.non.includes(r.role)) && (filters.status === "All" || r.status === filters.status));
    return { records, chapters, roleKeys, getCell, applicable, coverage, details, registered: applicable.filter(cell => cell.status === "Registered"), pending: slots.filter(cell => cell.status === "Pending Verification") };
  }, [selected, filters, tab]);
  const sortedDetails = useMemo(() => [...model.details].sort((a, b) => tableSort.direction * (tableSort.key === "date" ? dateNumber(a.date) - dateNumber(b.date) : String(a[tableSort.key] || "").localeCompare(String(b[tableSort.key] || ""), undefined, { numeric: true }))), [model.details, tableSort]);
  const missingLocations = ["Bangkok", "San Diego"].filter(location => !selected.some(s => s.location === location));
  const flagged = model.details.filter(r => r.issues.length);
  const changeFilter = (key, value) => setFilters(current => ({ ...current, [key]: value }));
  const openRecords = (records, title) => setModal({ kind: "records", title, records });
  const exportDetails = () => {
    const columns = ["Officer name", "Chapter", "Officer role", "Mapped role", "Scope", "Training location", "Training dates", "Workshop/session", "Registration date (Eastern GMT-05:00)", "Registration status", "Verification notes"];
    const safe = value => { let text = String(value ?? ""); if (/^[=+@\-\t\r]/.test(text)) text = "'" + text; return '"' + text.replace(/"/g, '""') + '"'; };
    const rows = model.details.map(r => [r.name, r.chapter, r.confirmation && r.role ? Core.roles[r.role] : r.type, r.role, r.scope, r.location, DATES[r.location] || "Not supplied", r.displaySession, r.date, Core.visibleStatus(r.status), [r.exclusionReason, ...r.issues].filter(Boolean).join("; ")]);
    downloadFile("YPO-MENA-GLC-2027-registrations.csv", "\uFEFF" + [columns, ...rows].map(row => row.map(safe).join(",")).join("\r\n"), "text/csv;charset=utf-8");
    setMessage("Exported the registration records in the current filtered view.");
  };
  async function saveAllChaptersPdf() {
    setSavingPdf(true);
    try {
      const pdf = await PdfReport.generate({ chapters: SEED.chapters, snapshots: selected, location: filters.location });
      downloadFile('YPO-MENA-GLC-2027-All-Chapters-' + filters.location.replace(/\s+/g, '-') + '.pdf', pdf, "application/pdf");
      setMessage("PDF saved for all 27 chapters, including every officer name. Uses the selected report and location; other filters are ignored.");
    } catch (error) { setMessage("Could not save PDF: " + error.message); }
    finally { setSavingPdf(false); }
  }
  const importPreview = useMemo(() => {
    if (!importForm.sheets.length) return null;
    try {
      if (!importForm.date) throw Error("Choose the report's data-as-of date.");
      const rows = importForm.sheets[importForm.sheet]?.rows;
      if (!rows?.length) throw Error("This worksheet contains no registration rows.");
      const keys = Object.keys(rows[0]);
      if (!keys.some(k => ["Primary Chapter", "Chapter"].includes(k)) || !keys.some(k => ["Registration Type", "Officer Role"].includes(k)) || !keys.some(k => ["Full Name", "Officer Name", "First Name"].includes(k))) throw Error("Required headings: Primary Chapter (or Chapter), Registration Type (or Officer Role), and First Name / Last Name (or Full Name).");
      const processed = Core.process(rows, SEED.chapters, importForm.location);
      if (processed.records.some(r => r.location !== importForm.location)) throw Error("The file contains a different or mixed location. Import each location separately.");
      const prior = snapshots.filter(s => s.location === importForm.location && s.date <= importForm.date).sort((a, b) => b.date.localeCompare(a.date) || snapshots.indexOf(b) - snapshots.indexOf(a))[0];
      let records = processed.records;
      if (importForm.mode === "incremental" && prior) { const identities = new Set(records.map(r => r.id)); records = [...prior.records.filter(r => !identities.has(r.id)), ...records]; }
      return { ...processed, records, prior, delta: prior ? Core.reportingDiff(prior.records, records) : null };
    } catch (error) { return { error: error.message }; }
  }, [importForm, snapshots]);
  async function readImport(event) {
    const file = event.target.files?.[0]; if (!file) return;
    setReading(true); setImportError(""); setImportForm(current => ({ ...current, sheets: [], filename: file.name, sheet: 0 }));
    try {
      if (file.size > 20000000) throw Error("Choose a file smaller than 20 MB.");
      const sheets = /\.xlsx$/i.test(file.name) ? await readXlsx(await file.arrayBuffer()) : /\.csv$/i.test(file.name) ? [{ name: file.name, rows: Core.csv(await file.text()) }] : null;
      if (!sheets) throw Error("Choose a .csv or .xlsx file. Save older .xls files as .xlsx first.");
      setImportForm(current => ({ ...current, sheets, filename: file.name, sheet: 0 }));
    } catch (error) { setImportError(error.message); } finally { setReading(false); }
  }
  function saveImport() {
    if (!importPreview || importPreview.error || reading) return;
    const { prior, delta, ...processed } = importPreview;
    const snapshot = { ...processed, id: globalThis.crypto?.randomUUID?.() || `snapshot-${Date.now()}-${Math.random()}`, location: importForm.location, date: importForm.date, filename: importForm.filename, mode: importForm.mode };
    setSnapshots(current => [...current, snapshot]); setReport("current"); setModal(null);
    setMessage("Weekly snapshot saved. Review Data quality & weekly changes for the comparison.");
  }
  async function restoreHistory(event) {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data.version !== 1 || !Array.isArray(data.snapshots) || !data.snapshots.length) throw Error("Unsupported backup format.");
      const restored = data.snapshots.map(s => {
        if (!s.id || !/^\d{4}-\d{2}-\d{2}$/.test(s.date) || !["Bangkok", "San Diego"].includes(s.location) || !Array.isArray(s.records) || !s.records.every(r => r.raw)) throw Error("Invalid snapshot in backup.");
        return { id: s.id, date: s.date, location: s.location, filename: s.filename || "Restored report", mode: s.mode || "complete", ...Core.process(s.records.map(r => r.raw), SEED.chapters, s.location), sourceRows: s.sourceRows ?? s.records.length, duplicates: s.duplicates ?? 0 };
      });
      setSnapshots(current => [...current, ...restored.filter(s => !current.some(existing => existing.id === s.id))]); setMessage("History backup restored and merged.");
    } catch (error) { setMessage("Could not restore history: " + error.message); }
    event.target.value = "";
  }
  function renderMatrix(nonCore = false) {
    const keys = (nonCore ? Core.non : Core.core).filter(role => filters.role === "All" || filters.role === role);
    return <><div className="panelhead"><div><h2>{nonCore ? "Non-core officer registrations" : "Training registrations by core role"}</h2><div className="muted">{nonCore ? "SPO · Spouse/Partner Officer | SFO · Spouse Forum Officer | Fam · Family Officer. Absent roles await applicability verification." : "One count per chapter-role combination. Click a role to see every matching officer and session."}</div></div><span className="pill">{model.chapters.length} chapters</span></div>
      <div className="tablewrap"><table><thead><tr><th>Chapter</th>{keys.map(role => <th key={role} className="center">{role}<br /><span style={{ fontSize: 9, fontWeight: "normal" }}>{Core.roles[role]}</span></th>)}{!nonCore && <th>Registered</th>}</tr></thead><tbody>{model.chapters.map(ch => {
        const coverage = model.coverage(ch);
        return <tr key={ch.name}><td className="chapter">{ch.name}<small className={ch.type === "YPO Gold" ? "gold" : ""}>{ch.type}</small></td>{keys.map(role => {
          const cell = model.getCell(ch, role); const visible = filters.status === "All" || cell.status === filters.status;
          return <td key={role} className="center">{visible ? <button className="cellbtn" title={cell.records.map(r => `${r.name} · ${r.displaySession}`).join("\n") || Core.visibleStatus(cell.status)} onClick={() => openRecords(cell.records, `${ch.name} · ${Core.roles[role]}`)}><StatusBadge status={cell.status} />{cell.conflict && <span className="officer" style={{ color: "#996309" }}>⚠ Registration requires review</span>}{cell.records.map((record, i) => <span className="officer" key={`${record.id}-${i}`}>{record.name || "Name not supplied"}</span>)}</button> : <span className="muted">Filtered out</span>}</td>;
        })}{!nonCore && <td className="coverage"><b>{coverage.registered}/{coverage.applicable}</b><div className="bar"><i style={{ width: `${coverage.applicable ? coverage.registered / coverage.applicable * 100 : 0}%` }} /></div></td>}</tr>;
      })}</tbody></table>{(!keys.length || !model.chapters.length) && <div className="empty">No matching chapters or roles. Adjust or reset filters.</div>}</div><div className="legend">{Object.keys(STATUS_CLASS).map(status => <StatusBadge key={status} status={status} />)}</div></>;
  }
  function renderRoles() {
    return <><div className="panelhead"><div><h2>Role breakdown</h2><div className="muted">Expand a category to review registered officers and follow-up chapters. Counts reflect the current filters.</div></div></div><div className="cards">{Core.core.filter(role => filters.role === "All" || filters.role === role).map(role => {
      const slots = model.applicable.filter(cell => cell.role === role), registered = slots.filter(cell => cell.status === "Registered"), followup = slots.filter(cell => cell.status !== "Registered");
      const officers = model.details.filter(r => r.role === role && r.scope === "Chapter" && r.status === "Registered" && slots.some(cell => cell.ch.name === r.chapter));
      const pendingSlots = slots.filter(cell => cell.status === "Pending Verification");
      return <section className="rolecard" key={role}><h3>{role} <span className="muted">{Core.roles[role]}</span></h3><span className="rate">{percentage(registered.length, slots.length)}</span><p className="muted">{registered.length} of {slots.length} applicable chapters registered</p><div className="bar"><i style={{ width: `${slots.length ? registered.length / slots.length * 100 : 0}%` }} /></div>
        <details><summary>{slots.length} applicable chapters</summary>{slots.map(cell => <div className="person" key={cell.ch.name}>{cell.ch.name}</div>)}</details>
        <details><summary>{registered.length} registered chapters · {officers.length} officer records</summary>{officers.map((r, i) => <div className="person" key={`${r.id}-${i}`}><button className="link" onClick={() => openRecords([r], "Individual registration")}>{r.name}</button><br />{r.chapter}<br />{r.location} · {r.displaySession}</div>)}{!officers.length && <p>No matching registrations.</p>}</details>
        <details><summary>{followup.length} chapters without confirmed registration</summary>{followup.map(cell => <div className="person" key={cell.ch.name}>{cell.ch.name}<br /><StatusBadge status={cell.status} /></div>)}{!followup.length && <p>No follow-up chapters in this view.</p>}</details>
      </section>;
    })}</div>{filters.role !== "All" && Core.non.includes(filters.role) && <p className="empty">Select a core role, or open Non-core officers.</p>}</>;
  }
  function renderDetails() {
    const columns = { name: "Officer name", chapter: "Chapter", type: "Officer role", location: "Location", displaySession: "Workshop / session", date: "Registration date¹", status: "Registration status" };
    return <><div className="panelhead"><div><h2>Registration details</h2><div className="muted">{sortedDetails.length} source records. Network Officers are excluded from counts and chapter coverage; their source records remain visible here.</div></div><button className="btn" onClick={exportDetails}>↓ Export CSV</button></div><div className="tablewrap"><table><thead><tr>{Object.entries(columns).map(([key, label]) => <th key={key}><button onClick={() => setTableSort(current => ({ key, direction: current.key === key ? -current.direction : 1 }))}>{label} {tableSort.key === key ? tableSort.direction === 1 ? "↑" : "↓" : "↕"}</button></th>)}</tr></thead><tbody>{sortedDetails.map((r, i) => <tr key={`${r.id}-${i}`}><td><button className="link" onClick={() => openRecords([r], "Individual registration")}>{r.name || "Name not supplied"}</button></td><td>{r.chapter}</td><td>{r.confirmation && r.role ? Core.roles[r.role] : r.type}<div className="scope">{r.scope}{r.excluded ? " · Excluded from reporting" : r.role ? ` · ${r.role}` : ""}</div></td><td>{r.location}</td><td style={{ minWidth: 210 }}>{r.displaySession || "Not supplied"}</td><td style={{ whiteSpace: "nowrap" }}>{r.date || "Not supplied"}</td><td><StatusBadge status={r.status} /></td></tr>)}</tbody></table>{!sortedDetails.length && <div className="empty">No matching source records. Unregistered roles have no officer record.</div>}</div><p className="muted">¹ The source supplies Last Registration Date, retained in Eastern GMT−05:00. It may represent an update rather than the original booking date.</p></>;
  }
  const stats = [
    ["Chapters in view", model.chapters.length, "27 chapters in reference roster"],
    ["Registered role coverage", percentage(model.registered.length, model.applicable.length), `${model.registered.length} / ${model.applicable.length} applicable core role slots in filtered view`],
    ["Matching registration records", Core.reportRecords(model.details).length, "Network Officers excluded"],
    ["Chapters fully registered", model.chapters.filter(ch => { const c = model.coverage(ch); return c.applicable > 0 && c.registered === c.applicable; }).length, "All selected applicable core roles registered"]
  ];
  return <div className="ypo-dashboard">
    <style>{DASHBOARD_CSS}</style>
    <header><div><div className="eyebrow">Middle East & North Africa</div><h1 style={{ fontWeight: 800 }}>MENA GLC Registrations 2027</h1><p>Bangkok · 15–16 March 2027 &nbsp; | &nbsp; San Diego · 3–4 May 2027</p></div></header>
    <main><div className="topline"><div><span className="eyebrow" style={{ color: "#64748b" }}>Registration intelligence</span><p className="muted" style={{ margin: "6px 0 0" }}>Data as of <b>{selected.map(s => `${s.location}: ${s.date}`).join(" · ")}</b></p></div><div className="actions"><button className="btn" disabled={savingPdf} onClick={saveAllChaptersPdf} title="Includes every chapter and officer name for the selected report and location, regardless of chapter, officer, role or status filters.">{savingPdf ? "Saving PDF…" : "↓ Save PDF — all chapters"}</button><button className="btn" onClick={() => setModal({ kind: "history", title: "Weekly history & backups" })}>Weekly history & backups</button><button className="btn" onClick={exportDetails}>↓ Export CSV</button><button className="btn primary" onClick={() => { setImportForm({ location: filters.location === "San Diego" ? "San Diego" : "Bangkok", date: todayDubai(), mode: "complete", filename: "", sheet: 0, sheets: [] }); setImportError(""); setModal({ kind: "import", title: "Import weekly registration report" }); }}>↑ Import weekly report</button></div></div>
      <div className="notice">{missingLocations.length > 0 && <><b>{missingLocations.join(" and ")} data not loaded.</b> </>}Registration tracking for the 2027 cycle. {missingLocations.length > 0 ? "Unregistered means no matching record in the loaded location data; coverage across both locations is incomplete. " : "Both locations have an imported report. "}{filters.name && "Officer search limits coverage to matching names. "}All metrics reflect the active filters. {!storageOK && <b>Browser storage unavailable. Export history before closing.</b>}</div>
      <div className="stats">{stats.map(([label, value, note]) => <div className="stat" key={label}><label>{label}</label><strong>{value}</strong><small>{note}</small></div>)}</div>
      <div className="filters"><label>Chapter<input type="search" placeholder="Search chapters…" value={filters.chapter} onChange={e => changeFilter("chapter", e.target.value)} /></label><label>Officer name<input type="search" placeholder="Search officers…" value={filters.name} onChange={e => changeFilter("name", e.target.value)} /></label><label>Officer role<select value={filters.role} onChange={e => changeFilter("role", e.target.value)}><option value="All">All officer roles</option>{Object.entries(Core.roles).map(([key, value]) => <option key={key} value={key}>{key} · {value}</option>)}</select></label><label>Training location<select value={filters.location} onChange={e => changeFilter("location", e.target.value)}>{["All", "Bangkok", "San Diego"].map(value => <option key={value}>{value}</option>)}</select></label><label>Registration status<select value={filters.status} onChange={e => changeFilter("status", e.target.value)}>{["All", ...Object.keys(STATUS_CLASS)].map(value => <option key={value}>{value}</option>)}</select></label><label>Chapter order<select value={filters.sort} onChange={e => changeFilter("sort", e.target.value)}><option value="coverage-desc">Coverage: high to low</option><option value="coverage-asc">Coverage: low to high</option><option value="name">Chapter name</option></select></label><button className="btn" onClick={() => setFilters({ chapter: "", name: "", role: "All", location: "Bangkok", status: "All", sort: "coverage-desc" })}>Reset</button></div>
      <div style={{ maxWidth: 430 }}><label className="muted" htmlFor="ypo-report-view">Report / historical snapshot</label><select id="ypo-report-view" style={{ marginTop: 6 }} value={report} onChange={e => setReport(e.target.value)}><option value="current">Current combined report</option>{[...snapshots].reverse().map(s => <option key={s.id} value={s.id}>{s.location} · {s.date} · {s.filename}</option>)}</select></div>
      <nav className="tabs" role="tablist" aria-label="Dashboard views">{["Core role registrations", "Role breakdown", "Non-core officers", "Registration details"].map((label, i) => <button key={label} role="tab" aria-selected={tab === i} className={`tab ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>0{i + 1} &nbsp; {label}</button>)}</nav>
      <section className="panel" aria-live="polite">{tab === 0 ? renderMatrix() : tab === 1 ? renderRoles() : tab === 2 ? renderMatrix(true) : renderDetails()}</section>
      <details className="audit"><summary><b>Data quality & weekly changes</b> <span className="muted">· {flagged.length} flagged matching records</span></summary><p className="muted">Network Officer registrations, including Karin Troy, are excluded from reporting. Regional appointments do not establish a chapter appointment. Repeated session labels within a row are displayed once. Email and contact-address columns are excluded from saved and exported dashboard data.</p>{selected.map(s => { const prior = previousSnapshot(s, snapshots), delta = prior ? Core.reportingDiff(prior.records, s.records) : null; return <div className="notice" key={s.id}><b>{s.location} · {s.date}</b> — {s.filename}<br />{snapshotCoverage(s)}/{TOTAL_APPLICABLE} applicable core chapter roles registered ({percentage(snapshotCoverage(s), TOTAL_APPLICABLE)}).<br />{s.sourceRows} source rows → {Core.reportRecords(s.records).length} included records; {s.records.filter(r => !Core.isIncluded(r)).length} Network Officers excluded; {s.duplicates} exact duplicate rows suppressed.<br />{delta ? `Compared with ${prior.date}: ${delta.added.length} new, ${delta.changed.length} changed, ${delta.missing.length} absent from latest report. Coverage change: ${snapshotCoverage(s) - snapshotCoverage(prior)} role slots. Missing records are not assumed cancelled.` : "Initial baseline; no earlier snapshot for comparison."}</div>; })}
        {flagged.map((r, i) => <div className="person" key={`${r.id}-${i}`}><button className="link" onClick={() => openRecords([r], "Verification details")}>{r.name}</button> · {r.chapter}<br />{r.issues.join("; ")}</div>)}
        <p className="muted">Applicability from the reference app: CC, LO, ALO and FO apply to all 27 chapters. MO applies to 24 YPO chapters; MEO to 3 YPO Gold chapters plus YPO UAE Integrated, as confirmed by the user. Isabela Ududec is registered MEO; Nuha Abujaber is registered MO. Non-core applicability is not established by the reference.</p>
      </details>
    </main><footer>YPO MENA · GLC 2027 Registration Dashboard<br />Registration does not establish training attendance. History is saved in this browser; export a backup after each weekly update.</footer>
    <dialog ref={dialogRef} onCancel={() => setModal(null)} onClose={() => setModal(null)}><button className="close" aria-label="Close" onClick={() => setModal(null)}>×</button><h2>{modal?.title}</h2>
      {modal?.kind === "records" && <>{modal.records.length ? modal.records.map((r, i) => <OfficerRecord key={`${r.id}-${i}`} record={r} />) : <p>No matching registration has been identified. Officer and session details are not available.</p>}</>}
      {modal?.kind === "import" && <><p className="muted">Import each training location separately. Preview the changes, then save the snapshot. CSV and modern Excel Workbook (.xlsx) files are supported.</p><div className="form"><label>Training location<select value={importForm.location} onChange={e => setImportForm(current => ({ ...current, location: e.target.value }))}><option>Bangkok</option><option>San Diego</option></select></label><label>Data as of<input type="date" value={importForm.date} onChange={e => setImportForm(current => ({ ...current, date: e.target.value }))} /></label><label className="wide">Report type<select value={importForm.mode} onChange={e => setImportForm(current => ({ ...current, mode: e.target.value }))}><option value="complete">Complete snapshot — replace this location's current records</option><option value="incremental">Incremental update — retain prior records absent from this file</option></select></label><label className="wide">Registration file<input key={modal.kind + importForm.location} type="file" accept=".csv,.xlsx" onChange={readImport} disabled={reading} /></label>{importForm.sheets.length > 0 && <label className="wide">Worksheet<select value={importForm.sheet} onChange={e => setImportForm(current => ({ ...current, sheet: +e.target.value }))}>{importForm.sheets.map((sheet, i) => <option key={i} value={i}>{sheet.name}</option>)}</select></label>}</div>
        {reading && <p>Reading file…</p>}{(importError || importPreview?.error) && <p className="error">{importError || importPreview.error}</p>}{importPreview && !importPreview.error && <div className="notice"><b>{importPreview.sourceRows} source rows · {importPreview.records.length} resulting records</b><br />{importPreview.duplicates} exact duplicates suppressed · {importPreview.records.filter(r => r.status === "Pending Verification").length} records need verification.<br />{importPreview.delta ? `${importPreview.delta.added.length} new · ${importPreview.delta.changed.length} changed · ${importPreview.delta.missing.length} absent compared with ${importPreview.prior.date}.` : "First report for this location; creates a baseline."}<br />{importForm.mode === "complete" ? "Complete snapshot replaces this location's records. Absent records are not labelled cancellations." : "Incremental update retains prior records not mentioned. Include all current rows for any incoming person/role identity."}<br />Report date: {importForm.date}. The current view uses the latest dated report.</div>}<div className="actions" style={{ justifyContent: "flex-end", marginTop: 20 }}><button className="btn primary" disabled={reading || !importPreview || !!importPreview.error || !!importError} onClick={saveImport}>Save weekly snapshot</button></div></>}
      {modal?.kind === "history" && <><p>Snapshots are saved in this browser on this device. Export a backup after every update. Restore it when moving to another browser or computer.</p><div className="actions"><button className="btn primary" onClick={() => downloadFile("YPO-GLC-2027-history.json", JSON.stringify({ version: 1, snapshots }, null, 2), "application/json")}>↓ Export full history backup</button><button className="btn" onClick={() => restoreRef.current?.click()}>Restore history backup</button><input ref={restoreRef} type="file" accept=".json" hidden onChange={restoreHistory} /></div>{[...snapshots].reverse().map(s => { const prior = previousSnapshot(s, snapshots), delta = prior ? Core.reportingDiff(prior.records, s.records) : null; return <div className="historyrow" key={s.id}><b>{s.location} · {s.date}</b> <span className="muted">{s.filename}</span><p className="muted">{Core.reportRecords(s.records).length} included records · {snapshotCoverage(s)}/{TOTAL_APPLICABLE} core roles registered · {s.mode === "incremental" ? "Incremental update" : "Complete snapshot"}{delta && ` · ${delta.added.length} new / ${delta.changed.length} changed / ${delta.missing.length} absent`}</p><div className="actions"><button className="btn" onClick={() => { setReport(s.id); changeFilter("location", s.location); setModal(null); }}>View snapshot</button>{delta && <button className="btn" onClick={() => setModal({ kind: "comparison", title: `${s.location}: ${prior.date} → ${s.date}`, delta })}>Compare records</button>}</div></div>; })}</>}
      {modal?.kind === "comparison" && ["added", "changed", "missing"].map(key => <section key={key}><h3>{{ added: "New registrations", changed: "Changed registrations", missing: "Absent from latest report — not confirmed cancellations" }[key]} ({modal.delta[key].length})</h3>{modal.delta[key].map((record, i) => key === "changed" ? <div className="record" key={i}><h4>Before</h4><OfficerRecord record={record.before} /><h4>After</h4><OfficerRecord record={record.after} /></div> : <OfficerRecord key={i} record={record} />)}</section>)}
    </dialog>{message && <div className="ypo-toast" role="status">{message}</div>}
  </div>;
}
