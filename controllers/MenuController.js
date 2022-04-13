const menu = [
  {
    mondayMorning: "sev tamatar",
    mondayEvening: "sev tamatar",
  },
  {
    tuesdayMorning: "Gobhi",
    tuesdayEvening: "Gobhi",
  },
  {
    wednesdayMorning: "wed m",
    wednesdayEvening: "wed n",
  },
  {
    thursdayMorning: "",
    thursdayEvening: "",
  },
  {
    fridayMorning: "",
    fridayEvening: "",
  },
  {
    saturdayMorning: "",
    saturdayEvening: "",
  },
  {
    sundaySpecial: "",
  },
];

const getMenu = (req, res, next) => {
  console.log("hello world");
  res.status(200).json(menu);
};

 

const setMenu = (req, res, next) => {
  menu = req.menu;
  res.status(200).json(menu);
};

const updateMenu = (req, res, next) => {
  console.log("Update menu");
};

module.exports = { getMenu, setMenu };
