import { useState, useEffect } from 'react';
import { Activity, Heart, Users, Calendar, TrendingUp, AlertCircle, Clock, User, Menu, FileText, Stethoscope, Pill, ClipboardList, Settings, LogOut, X } from 'lucide-react';

function App() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [showChart, setShowChart] = useState(false);
  const [chartPhase, setChartPhase] = useState('chart'); // 'chart', 'loading', 'surprise'

  const handleNurseChart = () => {
    setCurrentView('nurse-chart');
    setShowChart(true);
    setChartPhase('chart');
    
    // Show chart for 1.5 seconds, then loading for 1.5 seconds, then surprise
    setTimeout(() => {
      setChartPhase('loading');
    }, 1500);
    
    setTimeout(() => {
      setShowSurprise(true);
    }, 3000);
  };

  if (showSurprise) {
    return <BirthdaySurprise />;
  }

  return <HospitalDashboard 
    currentView={currentView} 
    setCurrentView={setCurrentView} 
    onNurseChart={handleNurseChart} 
    showChart={showChart}
    chartPhase={chartPhase}
  />;
}

function HospitalDashboard({ currentView, setCurrentView, onNurseChart, showChart, chartPhase }: {
  currentView: string;
  setCurrentView: (view: string) => void;
  onNurseChart: () => void;
  showChart: boolean;
  chartPhase: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { id: 'patients', label: 'Patient Records', icon: <Users className="w-5 h-5" /> },
    { id: 'nurse-chart', label: 'Nurse Chart', icon: <FileText className="w-5 h-5" /> },
    { id: 'medications', label: 'Medications', icon: <Pill className="w-5 h-5" /> },
    { id: 'schedules', label: 'Schedules', icon: <Calendar className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  if (showChart && currentView === 'nurse-chart') {
    return <NurseChart chartPhase={chartPhase} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-slate-800">St. Mary's</h1>
                  <p className="text-sm text-slate-600">Medical Center</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      item.id === 'nurse-chart' ? onNurseChart() : setCurrentView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentView === item.id 
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-slate-100 border-b border-slate-200">
          <div className="p-3 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 flex-shrink-0"
                  >
                    <Menu className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 truncate">
                    {currentView === 'dashboard' ? 'Dashboard' : 
                     currentView === 'patients' ? 'Patient Records' :
                     currentView === 'medications' ? 'Medication Management' :
                     currentView === 'schedules' ? 'Schedule Management' :
                     currentView === 'reports' ? 'Reports & Analytics' :
                     currentView === 'settings' ? 'System Settings' : 'Dashboard'}
                  </h2>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-slate-600 flex-shrink-0">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm whitespace-nowrap">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-600">
                {currentView === 'dashboard' ? 'Emergency & Patient Care Dashboard' :
                 currentView === 'patients' ? 'Patient Information & Medical Records' :
                 currentView === 'medications' ? 'Medication Administration & Inventory' :
                 currentView === 'schedules' ? 'Staff & Patient Scheduling' :
                 currentView === 'reports' ? 'Hospital Analytics & Reports' :
                 currentView === 'settings' ? 'System Configuration & Preferences' : 'Dashboard'}
              </p>
            </div>
          </div>
        </header>

        <div className="p-3 md:p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && <DashboardContent />}
            {currentView === 'patients' && <PatientRecords />}
            {currentView === 'medications' && <MedicationManagement />}
            {currentView === 'schedules' && <ScheduleManagement />}
            {currentView === 'reports' && <ReportsAnalytics />}
            {currentView === 'settings' && <SystemSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const recentPatients = [
    { name: "Maria Santos", age: 34, condition: "Post-Surgery Recovery", room: "ICU-12", status: "Stable", time: "2 hours ago" },
    { name: "John Rodriguez", age: 58, condition: "Cardiac Monitoring", room: "Ward 3A", status: "Improving", time: "5 hours ago" },
    { name: "Ana Reyes", age: 45, condition: "Emergency Admission", room: "ER-5", status: "Critical", time: "7 hours ago" },
    { name: "Carlos Mendoza", age: 29, condition: "Observation", room: "Ward 2B", status: "Stable", time: "12 hours ago" }
  ];

  const priorityAlerts = [
    { type: "Lab Results Ready", patient: "Maria Santos", room: "ICU-12", time: "5 min ago", urgent: false },
    { type: "Blood Pressure Alert", patient: "Ana Reyes", room: "ER-5", time: "12 min ago", urgent: true },
    { type: "Medication Schedule", patient: "John Rodriguez", room: "Ward 3A", time: "20 min ago", urgent: false }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
          <StatCard
          icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
            title="Admitted Patients"
            value="247"
            change="+12 today"
            bgColor="bg-blue-500"
          />
          <StatCard
          icon={<Activity className="w-5 h-5 md:w-6 md:h-6" />}
            title="In Treatment"
            value="142"
            change="+8 today"
            bgColor="bg-green-500"
          />
          <StatCard
          icon={<Heart className="w-5 h-5 md:w-6 md:h-6" />}
            title="ICU/Critical"
            value="18"
            change="-3 today"
            bgColor="bg-red-500"
          />
          <StatCard
          icon={<Calendar className="w-5 h-5 md:w-6 md:h-6" />}
            title="Today's Appointments"
            value="89"
            change="23 remaining"
            bgColor="bg-teal-500"
          />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              Recent Admissions
            </h2>
          <div className="space-y-2 md:space-y-3">
              {recentPatients.map((patient, i) => (
              <div key={i} className="p-2 md:p-3 bg-slate-50 rounded border-l-4" style={{
                  borderColor: patient.status === 'Critical' ? '#ef4444' : patient.status === 'Improving' ? '#3b82f6' : '#10b981'
                }}>
                <div className="flex items-start justify-between mb-1 md:mb-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <User className="w-3 h-3 md:w-4 md:h-4 text-slate-500" />
                    <p className="font-medium text-slate-800 text-sm md:text-base">{patient.name}, {patient.age}</p>
                    </div>
                  <span className={`text-xs px-1 md:px-2 py-0.5 md:py-1 rounded ${
                      patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      patient.status === 'Improving' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                <p className="text-xs md:text-sm text-slate-600 mb-1">{patient.condition}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{patient.room}</span>
                    <span>{patient.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
              Priority Alerts
            </h2>
          <div className="space-y-2 md:space-y-3">
              {priorityAlerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded border-l-4 ${
                  alert.urgent ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'
                }`}>
                <AlertCircle className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 ${
                    alert.urgent ? 'text-red-600' : 'text-amber-600'
                  }`} />
                  <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm md:text-base">{alert.type}</p>
                  <p className="text-xs md:text-sm text-slate-600">{alert.patient} - {alert.room}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

function StatCard({ icon, title, value, change, bgColor }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <div className={`${bgColor} text-white p-2 md:p-3 rounded-lg`}>
          {icon}
        </div>
        <span className="text-xs md:text-sm font-medium text-green-600">{change}</span>
      </div>
      <h3 className="text-slate-600 text-xs md:text-sm font-medium mb-1">{title}</h3>
      <p className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function NurseChart({ chartPhase }: { chartPhase: string }) {
  const patientData = {
    name: "Juan dela Cruz",
    age: 25,
    room: "ICU-15",
    admissionDate: "2024-01-15",
    diagnosis: "Post-operative monitoring",
    vitalSigns: [
      { time: "08:00", bp: "120/80", hr: 72, temp: "98.6°F", o2: "98%" },
      { time: "10:00", bp: "118/78", hr: 68, temp: "98.4°F", o2: "99%" },
      { time: "12:00", bp: "122/82", hr: 70, temp: "98.8°F", o2: "97%" },
      { time: "14:00", bp: "119/79", hr: 69, temp: "98.5°F", o2: "98%" }
    ],
    medications: [
      { name: "Morphine", dose: "2mg", frequency: "Every 4 hours", lastGiven: "13:30" },
      { name: "Antibiotics", dose: "500mg", frequency: "Every 8 hours", lastGiven: "12:00" },
      { name: "Pain Relief", dose: "1 tablet", frequency: "As needed", lastGiven: "14:15" }
    ],
    notes: [
      { time: "08:30", note: "Patient resting comfortably, no complaints of pain", nurse: "Sarah Johnson" },
      { time: "10:45", note: "Vital signs stable, patient alert and responsive", nurse: "Mike Chen" },
      { time: "12:20", note: "Medication administered as scheduled", nurse: "Sarah Johnson" },
      { time: "14:10", note: "Patient requesting additional pain medication", nurse: "Lisa Park" }
    ]
  };

  // Show loading screen
  if (chartPhase === 'loading') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full mx-4">
          <div className="mb-6">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading...</h2>
            <p className="text-slate-600">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 bg-slate-100 border-b border-slate-200">
        <div className="p-3 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                <button 
                  onClick={() => window.history.back()}
                  className="p-2 rounded-lg hover:bg-slate-100 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 truncate">
                  Nurse Chart
                </h2>
              </div>
              <div className="flex items-center gap-1 md:gap-2 text-slate-600 flex-shrink-0">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm whitespace-nowrap">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <p className="text-sm md:text-base text-slate-600">
              Electronic Health Record - Patient Information
            </p>
          </div>
        </div>
      </header>

      <div className="p-3 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-3 md:p-4 lg:p-6 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
              <div className="mb-2 md:mb-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">Patient Chart</h1>
                <p className="text-sm md:text-base text-slate-600">Electronic Health Record</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs md:text-sm text-slate-500">Chart ID: EHR-2024-001</p>
                <p className="text-xs md:text-sm text-slate-500">Last Updated: {new Date().toLocaleString()}</p>
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
            <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm md:text-base">Patient Information</h3>
              <p className="text-xs md:text-sm"><span className="font-medium">Name:</span> {patientData.name}</p>
              <p className="text-xs md:text-sm"><span className="font-medium">Age:</span> {patientData.age}</p>
              <p className="text-xs md:text-sm"><span className="font-medium">Room:</span> {patientData.room}</p>
              <p className="text-xs md:text-sm"><span className="font-medium">Admission:</span> {patientData.admissionDate}</p>
            </div>
            <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm md:text-base">Current Diagnosis</h3>
              <p className="text-xs md:text-sm">{patientData.diagnosis}</p>
            </div>
            <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm md:text-base">Status</h3>
              <span className="inline-block bg-green-100 text-green-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                Stable
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Vital Signs</h3>
              <div className="bg-slate-50 rounded-lg p-3 md:p-4">
                <div className="grid grid-cols-5 gap-1 md:gap-2 text-xs md:text-sm font-medium text-slate-600 mb-2">
                  <div>Time</div>
                  <div>BP</div>
                  <div>HR</div>
                  <div>Temp</div>
                  <div>O2</div>
                </div>
                {patientData.vitalSigns.map((vital, i) => (
                  <div key={i} className="grid grid-cols-5 gap-1 md:gap-2 text-xs md:text-sm py-1 border-b border-slate-200 last:border-b-0">
                    <div>{vital.time}</div>
                    <div>{vital.bp}</div>
                    <div>{vital.hr}</div>
                    <div>{vital.temp}</div>
                    <div>{vital.o2}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Medications</h3>
              <div className="space-y-2 md:space-y-3">
                {patientData.medications.map((med, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 md:p-4">
                    <div className="flex justify-between items-start mb-1 md:mb-2">
                      <h4 className="font-medium text-slate-800 text-sm md:text-base">{med.name}</h4>
                      <span className="text-xs md:text-sm text-slate-500">{med.dose}</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 mb-1">{med.frequency}</p>
                    <p className="text-xs text-slate-500">Last given: {med.lastGiven}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Nursing Notes</h3>
            <div className="space-y-2 md:space-y-3">
              {patientData.notes.map((note, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 md:mb-2">
                    <span className="font-medium text-slate-800 text-sm md:text-base">{note.time}</span>
                    <span className="text-xs md:text-sm text-slate-500">- {note.nurse}</span>
                  </div>
                  <p className="text-slate-700 text-xs md:text-sm">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

function PatientRecords() {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Patient Records</h3>
      <p className="text-sm md:text-base text-slate-600">Patient information and medical records management system.</p>
    </div>
  );
}

function MedicationManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Medication Management</h3>
      <p className="text-sm md:text-base text-slate-600">Medication administration and inventory management.</p>
    </div>
  );
}

function ScheduleManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Schedule Management</h3>
      <p className="text-sm md:text-base text-slate-600">Staff and patient scheduling system.</p>
    </div>
  );
}

function ReportsAnalytics() {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Reports & Analytics</h3>
      <p className="text-sm md:text-base text-slate-600">Hospital analytics and reporting dashboard.</p>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">System Settings</h3>
      <p className="text-sm md:text-base text-slate-600">System configuration and user preferences.</p>
    </div>
  );
}

function BirthdaySurprise() {
  const [showText, setShowText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    // Auto-play the music
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audio.play().catch(e => console.log('Audio play failed:', e));

    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowSecondText(true), 2000);

    const confettiArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setConfetti(confettiArray);

    // Cleanup audio on component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 overflow-hidden relative flex items-center justify-center">

      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute w-3 h-3 animate-fall"
          style={{
            left: `${c.left}%`,
            top: '-20px',
            animationDelay: `${c.delay}s`,
            backgroundColor: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#FFB6C1'][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}

      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 p-4 md:p-8 opacity-50 blur-[0.5px]">
        <img
          src="/In Love Heart Sticker.gif"
          alt="heart"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain animate-float-1 mx-auto self-center"
        />
        <img
          src="/In Love Heart Sticker (1).gif"
          alt="heart"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain animate-float-2 mx-auto self-center"
        />
        <img
          src="/지민 Sticker.gif"
          alt="jimin"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain animate-float-3 mx-auto self-center"
        />
        <img
          src="/V Jin Sticker.gif"
          alt="v jin"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain animate-float-1 mx-auto self-center"
        />
        <img
          src="/J-Hope V Sticker.gif"
          alt="jhope v"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain animate-float-2 mx-auto self-center"
        />
        <img
          src="/Dance V Sticker.gif"
          alt="dance v"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain animate-float-3 mx-auto self-center"
        />
      </div>

      <div className="relative z-20 text-center px-2 sm:px-4 max-w-4xl">
        <div className={`transform transition-all duration-1000 ${showText ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-2 sm:mb-4 md:mb-6 animate-bounce-slow drop-shadow-2xl leading-tight">
            Happy Birthday Guia!
          </h1>
        </div>

        <div className={`transform transition-all duration-1000 delay-500 ${showSecondText ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-white animate-pulse-slow drop-shadow-xl leading-tight">
            Stay Beautiful
          </h2>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-600/30 to-transparent" />
    </div>
  );
}

export default App;
