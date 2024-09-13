const Employee = require("../models/employeeSchema");


const moment = require("moment");
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const user_index_get = async (req, res) => {
  try {
    const employees = await Employee.find({});
    console.log(employees);
    res.render("index", {
      employees,
      moment,
    });
  } catch (err) {
    // Handle the error
    console.error("Error fetching employees:", err);
    return res.status(500).send("Server error");
  }
};

const user_view_get = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId: ", userId);

  try {
    const user = await Employee.findById(userId);
    console.log("user: ", user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("user/view", { user, moment });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const user_edit_get = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Employee.findById(userId);
    console.log("User: ", user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("user/edit", { user, moment });
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).send("Internal Server Error");
  }
};

const user_search_post = async (req, res) => {
  const searchText = req.body.searchText;
  const searchQuery = {};

  if (searchText) {
    searchQuery.$or = [
      { firstName: { $regex: searchText, $options: "i" } }, // Case-insensitive search
      { lastName: { $regex: searchText, $options: "i" } },
      { email: { $regex: searchText, $options: "i" } },
      { mobileNumber: { $regex: searchText, $options: "i" } },
      { age: { $regex: searchText, $options: "i" } },
      { country: { $regex: searchText, $options: "i" } },
    ];
  }

  try {
    const users = await Employee.find(searchQuery); // Execute the query
    res.render("user/search", {
      users,
    });
  } catch (err) {
    console.error("Error searching users: ", err);
    res.status(500).send("Internal Server Error");
  }
};

const user_put = async (req, res) => {
  const userId = req.params.userId;

  try {
    const updateResult = await Employee.updateOne({ _id: userId }, req.body);

    if (updateResult.matchedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.redirect("/");
  } catch (e) {
    console.error("Error updating user: ", e);
    res.status(500).send("Internal Server Error");
  }
};

const user_delete = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Employee.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await Employee.deleteOne({ _id: userId });
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting user: ", err);
    res.status(500).send("Internal Server Error");
  }
};

const user_add_get = (req, res) => {
  res.render("user/add", { countries });
};

const user_post = (req, res) => {
  console.log(req.body);
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    age: req.body.age,
    country: req.body.country,
    gender: req.body.gender,
  });
  // Save employee data to MongoDB
  employee
    .save()
    .then(() => {
      console.log("Employee saved to database");
      res.redirect("/"); // Redirect to homepage after successful submission
    })
    .catch((err) => {
      console.error("Error saving employee:", err);
      res.status(500).send("Failed to save employee data.");
    });
};

module.exports = {
  user_index_get,
  user_view_get,
  user_edit_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};
