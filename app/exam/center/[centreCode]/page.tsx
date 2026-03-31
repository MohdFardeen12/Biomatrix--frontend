"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface StudentRow {
  rollNo: string;
  name: string;
  walkin: string;
  status: "Present" | "Absent";
}

interface CenterDetails {
  centreCode: string;
  centreName: string;
  city: string;
  totalStudents: number;
  students: StudentRow[];
}

const dummyCenterData: Record<string, CenterDetails> = {
  "156008": {
    centreCode: "156008",
    centreName: "AIWC ACADEMY OF EXCELLENCE JAMSHEDPUR",
    city: "JH-Jamshedpur",
    totalStudents: 5,
    students: [
      { rollNo: "1001", name: "Aman Kumar", walkin: "No", status: "Present" },
      { rollNo: "1002", name: "Riya Singh", walkin: "Yes", status: "Absent" },
      { rollNo: "1003", name: "Mohit Das", walkin: "No", status: "Present" },
      { rollNo: "1004", name: "Sana Khan", walkin: "Yes", status: "Present" },
      { rollNo: "1005", name: "Rohit Shaw", walkin: "No", status: "Absent" },
    ],
  },
  "156018": {
    centreCode: "156018",
    centreName: "DAV PUBLIC SCHOOL AGRA",
    city: "UP-Agra",
    totalStudents: 5,
    students: [
      { rollNo: "2001", name: "Rahul Verma", walkin: "No", status: "Present" },
      { rollNo: "2002", name: "Priya Sharma", walkin: "Yes", status: "Present" },
      { rollNo: "2003", name: "Arjun Yadav", walkin: "No", status: "Absent" },
      { rollNo: "2004", name: "Neha Gupta", walkin: "No", status: "Present" },
      { rollNo: "2005", name: "Karan Singh", walkin: "Yes", status: "Absent" },
    ],
  },
};

export default function CentreDetailsPage() {
  const params = useParams();
  const centreCode = params.centreCode as string;

  const center = dummyCenterData[centreCode];

  if (!center) {
    return (
      <div className="min-h-screen bg-white p-8 font-[Geist,system-ui,sans-serif]">
        <div className="mb-4">
          <Link href="/exam">
            <Button variant="outline" size="sm">← Back to Exam Page</Button>
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 p-6 text-slate-500">
          No center data found for code: <span className="font-semibold">{centreCode}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 font-[Geist,system-ui,sans-serif]">
      {/* Back button */}
      <div className="mb-4">
        <Link href="/exam">
          <Button variant="outline" size="sm">← Back to Exam Page</Button>
        </Link>
      </div>

      {/* Center details card */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white shadow-sm p-5">
        <h1 className="text-lg font-semibold text-slate-800 mb-4">Centre Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Centre Name</p>
            <p className="font-medium text-slate-800 mt-1">{center.centreName}</p>
          </div>

          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Centre Code</p>
            <p className="font-medium text-slate-800 mt-1">{center.centreCode}</p>
          </div>

          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">City</p>
            <p className="font-medium text-slate-800 mt-1">{center.city}</p>
          </div>
        </div>
      </div>

      {/* Student table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="min-w-full border-collapse text-[12px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">S No.</th>
              <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">Roll No</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-500 uppercase">Name</th>
              <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">Walkin</th>
              <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">Present / Absent</th>
            </tr>
          </thead>

          <tbody>
            {center.students.map((student, index) => (
              <tr
                key={student.rollNo}
                className="border-b border-slate-100 hover:bg-slate-50/70"
              >
                <td className="px-3 py-3 text-center text-slate-700">{index + 1}</td>
                <td className="px-3 py-3 text-center text-slate-700">{student.rollNo}</td>
                <td className="px-3 py-3 text-slate-700">{student.name}</td>
                <td className="px-3 py-3 text-center text-slate-700">{student.walkin}</td>
                <td className="px-3 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white text-[11px] font-semibold ${
                      student.status === "Present" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}