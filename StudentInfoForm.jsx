import React from "react";

const groupedStudentList = {
  "Front-End Project": [
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
  "HCI Innovation Project": [
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
  "MIS Student Innovation Project": [
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
  const handleCourseSelect = (e, courseKey) => {
    const name = e.target.value;
    if (!name) return;

    const index = groupedStudentList[courseKey].findIndex(n => n === name);
    const courseShort = courseKey.includes("Front") ? "Front" : courseKey.includes("HCI") ? "HCI" : "MIS";
    const firstName = name.split(" ")[0]; // Or full name, depending on your preference

    const id = `${firstName}-${courseShort}-${index + 1}`;

    setStudent({
      name,
      id,
      courseFromList: courseKey
    });
  };

  const handleClear = () => {
    setStudent({ name: "", id: "", courseFromList: "" });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Select Student by Course</h5>

        {Object.entries(groupedStudentList).map(([courseKey, names]) => (
          <div key={courseKey} className="mb-3">
            <label className="form-label">{courseKey}</label>
            <select
              className="form-select"
              onChange={(e) => handleCourseSelect(e, courseKey)}
              value={student.courseFromList === courseKey ? student.name : ""}
            >
              <option value="">-- Select Student --</option>
              {names.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        ))}

        <label className="form-label">Auto-Generated Student ID</label>
        <input
          type="text"
          className="form-control mb-2"
          value={student.id}
          readOnly
        />

        <button className="btn btn-warning w-100" onClick={handleClear}>
          Clear Selection
        </button>
      </div>
    </div>
  );
}
