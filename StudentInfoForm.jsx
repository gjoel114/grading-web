import React from "react";

const groupedStudentList = {
  "Front End Dev": [
    "Aaron Benjamin Moran Garcia",
    "Gamolchat Wananiwet",
    "Tain Yan Tun",
    "Vireakboth Lon",
    "Adelaide Silverline Francis",
    "Andrew Philips Kaihatu",
    "Jose Alonso Tiono",
    "Khin Maung Kyaw Zin",
    "Matee Thavonvijit",
    "Mel Reo Latcha Camilo",
    "Pann Ei Ko Ko",
    "Phyoe Kyaw Zin",
    "Praweechai Thararuenroeng",
    "Ricardo Paul",
    "Samantha Jawjong"
  ],
  "HCI Student": [
    "Alleef Zettal Bin Ali",
    "Anisa Marshanda Soeun",
    "Ariunbayar Altanbaatar",
    "Armon Duncan Omondi Ogal",
    "Bolas Monies Salah Esa",
    "Daniel Eliezer Gwizo",
    "Dbjhane Cazzandra Lesmoras Varron",
    "Hset Yiu Paing",
    "Immanuel Thapelo Busani Mlilo",
    "Khin Thitsar Thant",
    "Kyaw Zay Aung",
    "Kyaw Zin Nyein",
    "Mario Rezk Saadalla Rezk",
    "Mark Michael Morley",
    "Matee Thavonvijit",
    "Naung Myint Myat",
    "Naw Khu Paw Moo",
    "Noel Kiplagat Kurgat",
    "Nyi Lynn Htwe",
    "Phone Pyae Kyaw",
    "Poe Ei Ei Khaing",
    "Sandar Win",
    "Saw Joshua",
    "Saw Eh Thalay Htoo",
    "Saw Eh Thaw Wah @Enoch Htun",
    "Saw Ke Blute",
    "Saw Ler Nay Say",
    "Shin Thant Eaindra",
    "Similosakhe Moyo",
    "Siwaporn Waleesila",
    "Sovandaniel Reth",
    "Su Man",
    "Thet Win Htut",
    "Thu Ta Naing",
    "Wai Phyo Aung",
    "William Tinashe Menze"
  ],
  "MIS Student": [
    "Andrew Philips Kaihatu",
    "Aaron Benjamin Moran Garcia",
    "Chen, Yishi",
"Daniel Dal Sian Thang",
"Mario Rezk Saadalla Rezk",
"Phyoe Kyaw Zin",
"Tain Yan Tun",
"Wisa Emad Khamis Barour",
    "Columbus Brown",
    "Peeranat Kongsang",
    "Praweechai Thararuenroeng",
    "Ricardo Paul",
    "Sarah Olivia Gonsolva Gratias",
    "Akari Ohashi",
    "Beecher Carson Doe",
    "Elisha Victor",
    "Glyzel Kate Belnas",
    "Imanuel Raja Gelora Sianturi",
    "Joaina Gan",
    "Joseph Khamis Sabet Mehany",
    "Min Htet Nyunt",
    "Myint Myat Khaing",
    "Nan Thinzar Lin Lin",
    "Nguyen Hoang Anh Duy",
    "Sabatine Emelia Chantique Butarbutar",
    "Saw Si Yan Lin Chit",
    "Sopheak Rithiwong Meas",
    "Teresa Dim Khan Vung",
    "Tran Thai Huong Quynh",
    "Visien Banthavong",
    "Zaki Shamey Zaki Ayoub"
  ]
};

export default function StudentInfoForm({ student, setStudent }) {
  const handleSelectChange = (e) => {
    setStudent({ ...student, name: e.target.value });
  };

  const handleIdChange = (e) => {
    setStudent({ ...student, id: e.target.value });
  };

  const handleClear = () => {
    setStudent({ name: "", id: "" });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="mb-2">
          <label className="form-label">Select Student Name</label>
          <select
            className="form-select mb-2"
            value={student.name}
            onChange={handleSelectChange}
            required
          >
            <option value="">-- Select Student --</option>
            {Object.entries(groupedStudentList).map(([group, names]) => (
              <optgroup key={group} label={group}>
                {names.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </optgroup>
            ))}
          </select>

          <label className="form-label">Student ID</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Student ID"
            value={student.id}
            onChange={handleIdChange}
            required
          />

          <button className="btn btn-warning w-100" onClick={handleClear}>
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
}
