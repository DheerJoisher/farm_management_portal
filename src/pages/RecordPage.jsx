
import React, { useState } from 'react';
import { Calendar, Plus, Eye, X, Activity, TrendingUp, Bird, Egg, Heart, Thermometer, FileText, Shield, Droplets } from 'lucide-react';
import Navbar from "../components/Navbar"; // adjust path if needed
import Footer from "../components/Footer";
const PoultryManagement = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // All data states
  const [records, setRecords] = useState({
    birds: [],
    feed: [],
    eggs: [],
    medical: [],
    entry: [],
    exit: [],
    sales: [],
    financial: [],
    environmental: []
  });

  // Form states
  const [birdForm, setBirdForm] = useState({
    batchId: '',
    houseNumber: '',
    birdType: 'broiler',
    dateOfArrival: '',
    initialCount: '',
    currentCount: '',
    age: '',
    mortalityRate: '',
    healthStatus: 'healthy'
  });

  const [feedForm, setFeedForm] = useState({
    batchId: '',
    feedType: 'starter',
    quantityConsumed: '',
    costOfFeed: '',
    date: '',
    fcr: ''
  });

  const [eggForm, setEggForm] = useState({
    batchId: '',
    houseNumber: '',
    date: '',
    eggCount: '',
    avgWeight: '',
    shellQuality: 'good',
    defects: '',
    fertilityRate: '',
    hatchability: ''
  });

  const [medicalForm, setMedicalForm] = useState({
    batchId: '',
    type: 'vaccination',
    vaccinationType: '',
    disease: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    date: '',
    resolutionDate: '',
    veterinaryNotes: ''
  });

  const [entryForm, setEntryForm] = useState({
    date: '',
    batchId: '',
    houseNumber: '',
    birdType: 'broiler',
    dateOfArrival: '',
    quantity: '',
    age: '',
    source: '',
    healthStatus: 'healthy'
  });

  const [exitForm, setExitForm] = useState({
    date: '',
    batchId: '',
    quantity: '',
    reason: 'sold',
    weight: '',
    price: ''
  });

  const [salesForm, setSalesForm] = useState({
    date: '',
    type: 'meat',
    batchId: '',
    quantity: '',
    unitPrice: '',
    totalRevenue: '',
    customer: ''
  });

  const [financialForm, setFinancialForm] = useState({
    date: '',
    type: 'expense',
    category: 'feed',
    description: '',
    amount: ''
  });

  const [environmentalForm, setEnvironmentalForm] = useState({
    date: '',
    houseNumber: '',
    temperature: '',
    humidity: '',
    waterConsumption: '',
    maintenanceType: '',
    notes: ''
  });

  const handleSubmit = (type, formData, setFormData, resetData) => {
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...formData
    };

    setRecords(prev => ({
      ...prev,
      [type]: [...prev[type], newRecord]
    }));

    setFormData(resetData);
    setActiveModal(null);
  };

  const Button3D = ({ children, onClick, color = "blue", size = "large" }) => {
    const colorClasses = {
      blue: "bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-blue-800/50",
      darkblue: "bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-blue-900/50",
      lightblue: "bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 shadow-sky-800/50",
      navy: "bg-gradient-to-b from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 shadow-indigo-900/50",
      cyan: "bg-gradient-to-b from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 shadow-cyan-800/50",
      teal: "bg-gradient-to-b from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 shadow-teal-900/50",
      slate: "bg-gradient-to-b from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 shadow-slate-900/50",
      steel: "bg-gradient-to-b from-blue-500 to-slate-600 hover:from-blue-600 hover:to-slate-700 shadow-slate-800/50",
      ocean: "bg-gradient-to-b from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 shadow-teal-800/50"
    };

    const sizeClasses = size === "large" 
      ? "px-6 py-4 text-lg min-w-[180px] h-[70px]"
      : "px-4 py-3 text-sm min-w-[140px] h-[50px]";

    return (
      <button
        onClick={onClick}
        className={`
          text-white font-bold rounded-xl
          ${colorClasses[color]}
          ${sizeClasses}
          shadow-lg hover:shadow-xl
          transform hover:-translate-y-1 active:translate-y-0
          transition-all duration-200 ease-out
          border-t-2 border-white/20
          flex items-center justify-center gap-2
        `}
      >
        {children}
      </button>
    );
  };

  const Modal = ({ title, children, onClose, size = "md" }) => {
    const sizeClasses = {
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl"
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-2xl font-bold text-blue-800">{title}</h2>
            <button onClick={onClose} className="text-blue-500 hover:text-blue-700 p-1">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  const FormField = ({ label, type = "text", value, onChange, options = [], required = true, placeholder = "" }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
        >
          <option value="">{placeholder || "Select..."}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );

  const Dashboard = () => {
    const totalEntries = records.entry.reduce((sum, record) => sum + parseInt(record.quantity || 0), 0);
    const totalExits = records.exit.reduce((sum, record) => sum + parseInt(record.quantity || 0), 0);
    const currentBirdCount = totalEntries - totalExits;
    
    const healthyBirdsFromEntries = records.entry
      .filter(record => record.healthStatus === 'healthy')
      .reduce((sum, record) => sum + parseInt(record.quantity || 0), 0);
    
    // Calculate healthy birds after accounting for exits
    // Assume exits reduce healthy birds proportionally to their health status distribution
    const healthyRatio = totalEntries > 0 ? healthyBirdsFromEntries / totalEntries : 0;
    const healthyBirds = Math.max(0, Math.round(healthyBirdsFromEntries - (totalExits * healthyRatio)));
    
    const totalEggs = records.eggs.reduce((sum, record) => sum + parseInt(record.eggCount || 0), 0);
    const vaccinationRecords = records.medical.filter(r => r.type === 'vaccination').length;
    
    // Calculate mortality rate from exit records with mortality reason
    const mortalityExits = records.exit.filter(r => r.reason === 'mortality').reduce((sum, record) => sum + parseInt(record.quantity || 0), 0);
    const avgMortality = totalEntries > 0 ? ((mortalityExits / totalEntries) * 100).toFixed(1) : 0;
    
    const environmentalRecords = records.environmental.length;

    return (
        
      <div className="space-y-8">
        { }
        <Navbar/>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Poultry Health & Management System</h1>
          <p className="text-lg text-blue-600">Complete health monitoring and maintenance tracking for your poultry operations</p>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Current Birds</p>
                <p className="text-2xl font-bold">{currentBirdCount}</p>
              </div>
              <Bird size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Healthy Birds</p>
                <p className="text-2xl font-bold">{healthyBirds}</p>
              </div>
              <Heart size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Egg Production</p>
                <p className="text-2xl font-bold">{totalEggs}</p>
              </div>
              <Egg size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Vaccinations</p>
                <p className="text-2xl font-bold">{vaccinationRecords}</p>
              </div>
              <Shield size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Avg Mortality %</p>
                <p className="text-2xl font-bold">{avgMortality}%</p>
              </div>
              <Activity size={28} />
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Env Records</p>
                <p className="text-2xl font-bold">{environmentalRecords}</p>
              </div>
              <Thermometer size={28} />
            </div>
          </div>
        </div>

        {/* Recent Health Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <Activity size={24} />
            Health Status Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Active Batches</h4>
              <p className="text-2xl font-bold text-blue-600">{records.entry.length}</p>
              <p className="text-sm text-blue-600">Currently monitored</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Health Rate</h4>
              <p className="text-2xl font-bold text-green-600">
                {currentBirdCount > 0 ? Math.round((healthyBirds / currentBirdCount) * 100) : 0}%
              </p>
              <p className="text-sm text-green-600">Birds in good health</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Medical Events</h4>
              <p className="text-2xl font-bold text-purple-600">{records.medical.length}</p>
              <p className="text-sm text-purple-600">Total medical records</p>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Button3D color="cyan" size="small" onClick={() => setActiveModal('entry')}>
            <Plus size={20} />
            New Entries
          </Button3D>
          
          <Button3D color="darkblue" size="small" onClick={() => setActiveModal('feed')}>
            <Droplets size={20} />
            Feed & Nutrition
          </Button3D>
          
          <Button3D color="lightblue" size="small" onClick={() => setActiveModal('egg')}>
            <Egg size={20} />
            Egg Production
          </Button3D>
          
          <Button3D color="navy" size="small" onClick={() => setActiveModal('medical')}>
            <Heart size={20} />
            Medical Care
          </Button3D>
          
          <Button3D color="teal" size="small" onClick={() => setActiveModal('exit')}>
            <X size={20} />
            Exit Records
          </Button3D>
          
          <Button3D color="slate" size="small" onClick={() => setActiveModal('sales')}>
            <TrendingUp size={20} />
            Production Sales
          </Button3D>
          
          <Button3D color="steel" size="small" onClick={() => setActiveModal('financial')}>
            <FileText size={20} />
            Health Expenses
          </Button3D>
          
          <Button3D color="ocean" size="small" onClick={() => setActiveModal('environmental')}>
            <Thermometer size={20} />
            Environment
          </Button3D>
        </div>
      </div>
    );
  };

  const RecordsView = ({ type, title, data, fields }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">{title} ({data.length})</h2>
      {data.length === 0 ? (
        <p className="text-blue-500 italic">No records yet. Add your first record to start tracking.</p>
      ) : (
        <div className="grid gap-4">
          {data.map(record => (
            <div key={record.id} className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                {fields.map(field => (
                  <div key={field.key}>
                    <strong className="text-blue-700">{field.label}:</strong> 
                    <span className="text-blue-600 ml-1">{record[field.key] || 'N/A'}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-blue-400 mt-2">
                Added: {new Date(record.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const AllRecordsView = () => {
    const recordTypes = [
      { key: 'entry', title: 'New Bird Entry & Health Records', fields: [
        { key: 'date', label: 'Date' },
        { key: 'batchId', label: 'Batch ID' },
        { key: 'houseNumber', label: 'House' },
        { key: 'birdType', label: 'Type' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'healthStatus', label: 'Health Status' },
        { key: 'age', label: 'Age (days)' },
        { key: 'source', label: 'Source' }
      ]},
      { key: 'feed', title: 'Feed & Nutrition Records', fields: [
        { key: 'batchId', label: 'Batch ID' },
        { key: 'feedType', label: 'Feed Type' },
        { key: 'quantityConsumed', label: 'Quantity' },
        { key: 'date', label: 'Date' },
        { key: 'fcr', label: 'FCR' }
      ]},
      { key: 'eggs', title: 'Egg Production & Quality Records', fields: [
        { key: 'batchId', label: 'Batch ID' },
        { key: 'date', label: 'Date' },
        { key: 'eggCount', label: 'Egg Count' },
        { key: 'avgWeight', label: 'Avg Weight' },
        { key: 'shellQuality', label: 'Quality' },
        { key: 'fertilityRate', label: 'Fertility %' }
      ]},
      { key: 'medical', title: 'Medical & Health Care Records', fields: [
        { key: 'batchId', label: 'Batch ID' },
        { key: 'type', label: 'Type' },
        { key: 'vaccinationType', label: 'Vaccination' },
        { key: 'disease', label: 'Disease' },
        { key: 'treatment', label: 'Treatment' },
        { key: 'date', label: 'Date' }
      ]},
      { key: 'environmental', title: 'Environmental & Maintenance Records', fields: [
        { key: 'date', label: 'Date' },
        { key: 'houseNumber', label: 'House' },
        { key: 'temperature', label: 'Temperature' },
        { key: 'humidity', label: 'Humidity' },
        { key: 'waterConsumption', label: 'Water (L)' },
        { key: 'maintenanceType', label: 'Maintenance' }
      ]}
    ];

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Health & Management Records</h1>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-blue-500 hover:text-blue-700 p-2 bg-white rounded-full shadow-lg"
            >
              <X size={28} />
            </button>
          </div>

          <div className="space-y-8">
            {recordTypes.map(recordType => (
              <RecordsView
                key={recordType.key}
                type={recordType.key}
                title={recordType.title}
                data={records[recordType.key]}
                fields={recordType.fields}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (activeTab === 'records') {
    return <AllRecordsView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <Dashboard />

      {/* View All Records Button */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={() => setActiveTab('records')}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 font-semibold"
        >
          <Eye size={20} />
          View All Records
        </button>
      </div>

      {/* Modals */}
      {activeModal === 'bird' && (
        <Modal title="Add Bird Health Record" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <FormField
              label="Batch ID"
              value={birdForm.batchId}
              onChange={(e) => setBirdForm(prev => ({ ...prev, batchId: e.target.value }))}
            />
            <FormField
              label="House/Coop Number"
              value={birdForm.houseNumber}
              onChange={(e) => setBirdForm(prev => ({ ...prev, houseNumber: e.target.value }))}
            />
            <FormField
              label="Bird Type"
              type="select"
              value={birdForm.birdType}
              onChange={(e) => setBirdForm(prev => ({ ...prev, birdType: e.target.value }))}
              options={[
                { value: 'broiler', label: 'Broiler' },
                { value: 'layer', label: 'Layer' },
                { value: 'breeder', label: 'Breeder' }
              ]}
            />
            <FormField
              label="Date of Arrival"
              type="date"
              value={birdForm.dateOfArrival}
              onChange={(e) => setBirdForm(prev => ({ ...prev, dateOfArrival: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Initial Count"
                type="number"
                value={birdForm.initialCount}
                onChange={(e) => setBirdForm(prev => ({ ...prev, initialCount: e.target.value }))}
              />
              <FormField
                label="Current Count"
                type="number"
                value={birdForm.currentCount}
                onChange={(e) => setBirdForm(prev => ({ ...prev, currentCount: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Age (days)"
                type="number"
                value={birdForm.age}
                onChange={(e) => setBirdForm(prev => ({ ...prev, age: e.target.value }))}
              />
              <FormField
                label="Mortality Rate (%)"
                type="number"
                value={birdForm.mortalityRate}
                onChange={(e) => setBirdForm(prev => ({ ...prev, mortalityRate: e.target.value }))}
              />
            </div>
            <FormField
              label="Health Status"
              type="select"
              value={birdForm.healthStatus}
              onChange={(e) => setBirdForm(prev => ({ ...prev, healthStatus: e.target.value }))}
              options={[
                { value: 'healthy', label: 'Healthy' },
                { value: 'sick', label: 'Sick' },
                { value: 'recovering', label: 'Recovering' },
                { value: 'vaccinated', label: 'Recently Vaccinated' },
                { value: 'quarantine', label: 'Quarantine' }
              ]}
            />
            <button
              onClick={() => handleSubmit('birds', birdForm, setBirdForm, {
                batchId: '', houseNumber: '', birdType: 'broiler', dateOfArrival: '',
                initialCount: '', currentCount: '', age: '', mortalityRate: '', healthStatus: 'healthy'
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Bird Health Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'feed' && (
        <Modal title="Add Feed & Nutrition Record" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <FormField
              label="Batch ID"
              value={feedForm.batchId}
              onChange={(e) => setFeedForm(prev => ({ ...prev, batchId: e.target.value }))}
            />
            <FormField
              label="Feed Type"
              type="select"
              value={feedForm.feedType}
              onChange={(e) => setFeedForm(prev => ({ ...prev, feedType: e.target.value }))}
              options={[
                { value: 'starter', label: 'Starter Feed' },
                { value: 'grower', label: 'Grower Feed' },
                { value: 'finisher', label: 'Finisher Feed' },
                { value: 'layer', label: 'Layer Feed' },
                { value: 'breeder', label: 'Breeder Feed' },
                { value: 'medicated', label: 'Medicated Feed' }
              ]}
            />
            <FormField
              label="Date"
              type="date"
              value={feedForm.date}
              onChange={(e) => setFeedForm(prev => ({ ...prev, date: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Quantity Consumed (kg)"
                type="number"
                value={feedForm.quantityConsumed}
                onChange={(e) => setFeedForm(prev => ({ ...prev, quantityConsumed: e.target.value }))}
              />
              <FormField
                label="Cost of Feed ($)"
                type="number"
                step="0.01"
                value={feedForm.costOfFeed}
                onChange={(e) => setFeedForm(prev => ({ ...prev, costOfFeed: e.target.value }))}
                required={false}
              />
            </div>
            <FormField
              label="Feed Conversion Ratio (FCR)"
              type="number"
              step="0.01"
              value={feedForm.fcr}
              onChange={(e) => setFeedForm(prev => ({ ...prev, fcr: e.target.value }))}
              required={false}
            />
            <button
              onClick={() => handleSubmit('feed', feedForm, setFeedForm, {
                batchId: '', feedType: 'starter', quantityConsumed: '', costOfFeed: '', date: '', fcr: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Feed Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'egg' && (
        <Modal title="Add Egg Production Record" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Batch ID"
                value={eggForm.batchId}
                onChange={(e) => setEggForm(prev => ({ ...prev, batchId: e.target.value }))}
              />
              <FormField
                label="House Number"
                value={eggForm.houseNumber}
                onChange={(e) => setEggForm(prev => ({ ...prev, houseNumber: e.target.value }))}
              />
            </div>
            <FormField
              label="Date"
              type="date"
              value={eggForm.date}
              onChange={(e) => setEggForm(prev => ({ ...prev, date: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Daily Egg Count"
                type="number"
                value={eggForm.eggCount}
                onChange={(e) => setEggForm(prev => ({ ...prev, eggCount: e.target.value }))}
              />
              <FormField
                label="Average Weight (g)"
                type="number"
                step="0.1"
                value={eggForm.avgWeight}
                onChange={(e) => setEggForm(prev => ({ ...prev, avgWeight: e.target.value }))}
              />
            </div>
            <FormField
              label="Shell Quality"
              type="select"
              value={eggForm.shellQuality}
              onChange={(e) => setEggForm(prev => ({ ...prev, shellQuality: e.target.value }))}
              options={[
                { value: 'excellent', label: 'Excellent' },
                { value: 'good', label: 'Good' },
                { value: 'fair', label: 'Fair' },
                { value: 'poor', label: 'Poor' }
              ]}
            />
            <FormField
              label="Defects"
              value={eggForm.defects}
              onChange={(e) => setEggForm(prev => ({ ...prev, defects: e.target.value }))}
              required={false}
              placeholder="Any defects noted..."
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Fertility Rate (%)"
                type="number"
                step="0.1"
                value={eggForm.fertilityRate}
                onChange={(e) => setEggForm(prev => ({ ...prev, fertilityRate: e.target.value }))}
                required={false}
              />
              <FormField
                label="Hatchability (%)"
                type="number"
                step="0.1"
                value={eggForm.hatchability}
                onChange={(e) => setEggForm(prev => ({ ...prev, hatchability: e.target.value }))}
                required={false}
              />
            </div>
            <button
              onClick={() => handleSubmit('eggs', eggForm, setEggForm, {
                batchId: '', houseNumber: '', date: '', eggCount: '', avgWeight: '',
                shellQuality: 'good', defects: '', fertilityRate: '', hatchability: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Egg Production Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'medical' && (
        <Modal title="Add Medical & Health Record" onClose={() => setActiveModal(null)} size="lg">
          <div className="space-y-4">
            <FormField
              label="Batch ID"
              value={medicalForm.batchId}
              onChange={(e) => setMedicalForm(prev => ({ ...prev, batchId: e.target.value }))}
            />
            <FormField
              label="Record Type"
              type="select"
              value={medicalForm.type}
              onChange={(e) => setMedicalForm(prev => ({ ...prev, type: e.target.value }))}
              options={[
                { value: 'vaccination', label: 'Vaccination' },
                { value: 'disease', label: 'Disease/Treatment' },
                { value: 'mortality', label: 'Mortality Record' },
                { value: 'veterinary', label: 'Veterinary Visit' },
                { value: 'health_check', label: 'Routine Health Check' }
              ]}
            />
            
            {medicalForm.type === 'vaccination' && (
              <FormField
                label="Vaccination Type"
                value={medicalForm.vaccinationType}
                onChange={(e) => setMedicalForm(prev => ({ ...prev, vaccinationType: e.target.value }))}
                placeholder="e.g., Newcastle, Marek's, Infectious Bronchitis"
              />
            )}
            
            {medicalForm.type === 'disease' && (
              <>
                <FormField
                  label="Disease"
                  value={medicalForm.disease}
                  onChange={(e) => setMedicalForm(prev => ({ ...prev, disease: e.target.value }))}
                />
                <FormField
                  label="Symptoms"
                  type="textarea"
                  value={medicalForm.symptoms}
                  onChange={(e) => setMedicalForm(prev => ({ ...prev, symptoms: e.target.value }))}
                  required={false}
                />
                <FormField
                  label="Diagnosis"
                  value={medicalForm.diagnosis}
                  onChange={(e) => setMedicalForm(prev => ({ ...prev, diagnosis: e.target.value }))}
                  required={false}
                />
                <FormField
                  label="Treatment"
                  type="textarea"
                  value={medicalForm.treatment}
                  onChange={(e) => setMedicalForm(prev => ({ ...prev, treatment: e.target.value }))}
                  required={false}
                />
              </>
            )}
            
            <FormField
              label="Date"
              type="date"
              value={medicalForm.date}
              onChange={(e) => setMedicalForm(prev => ({ ...prev, date: e.target.value }))}
            />
            
            {medicalForm.type === 'disease' && (
              <FormField
                label="Resolution Date"
                type="date"
                value={medicalForm.resolutionDate}
                onChange={(e) => setMedicalForm(prev => ({ ...prev, resolutionDate: e.target.value }))}
                required={false}
              />
            )}
            
            <FormField
              label="Veterinary Notes"
              type="textarea"
              value={medicalForm.veterinaryNotes}
              onChange={(e) => setMedicalForm(prev => ({ ...prev, veterinaryNotes: e.target.value }))}
              required={false}
              placeholder="Additional notes, medicines administered, etc."
            />
            <button
              onClick={() => handleSubmit('medical', medicalForm, setMedicalForm, {
                batchId: '', type: 'vaccination', vaccinationType: '', disease: '', symptoms: '',
                diagnosis: '', treatment: '', date: '', resolutionDate: '', veterinaryNotes: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Medical Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'entry' && (
        <Modal title="Add New Bird Entry" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <FormField
              label="Date"
              type="date"
              value={entryForm.date}
              onChange={(e) => setEntryForm(prev => ({ ...prev, date: e.target.value }))}
            />
            <FormField
              label="Batch ID"
              value={entryForm.batchId}
              onChange={(e) => setEntryForm(prev => ({ ...prev, batchId: e.target.value }))}
            />
            <FormField
              label="Bird Type"
              type="select"
              value={entryForm.birdType}
              onChange={(e) => setEntryForm(prev => ({ ...prev, birdType: e.target.value }))}
              options={[
                { value: 'broiler', label: 'Broiler' },
                { value: 'layer', label: 'Layer' },
                { value: 'breeder', label: 'Breeder' }
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Quantity"
                type="number"
                value={entryForm.quantity}
                onChange={(e) => setEntryForm(prev => ({ ...prev, quantity: e.target.value }))}
              />
              <FormField
                label="Age (days)"
                type="number"
                value={entryForm.age}
                onChange={(e) => setEntryForm(prev => ({ ...prev, age: e.target.value }))}
              />
            </div>
            <FormField
              label="Source"
              value={entryForm.source}
              onChange={(e) => setEntryForm(prev => ({ ...prev, source: e.target.value }))}
              placeholder="Hatchery, farm name, etc."
            />
            <button
              onClick={() => handleSubmit('entry', entryForm, setEntryForm, {
                date: '', batchId: '', quantity: '', age: '', source: '', birdType: 'broiler'
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Entry Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'exit' && (
        <Modal title="Add Exit Record" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <FormField
              label="Date"
              type="date"
              value={exitForm.date}
              onChange={(e) => setExitForm(prev => ({ ...prev, date: e.target.value }))}
            />
            <FormField
              label="Batch ID"
              value={exitForm.batchId}
              onChange={(e) => setExitForm(prev => ({ ...prev, batchId: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Quantity"
                type="number"
                value={exitForm.quantity}
                onChange={(e) => setExitForm(prev => ({ ...prev, quantity: e.target.value }))}
              />
              <FormField
                label="Reason"
                type="select"
                value={exitForm.reason}
                onChange={(e) => setExitForm(prev => ({ ...prev, reason: e.target.value }))}
                options={[
                  { value: 'sold', label: 'Sold' },
                  { value: 'slaughtered', label: 'Slaughtered' },
                  { value: 'mortality', label: 'Mortality' },
                  { value: 'transfer', label: 'Transfer' },
                  { value: 'culling', label: 'Culling' }
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Weight (kg)"
                type="number"
                step="0.1"
                value={exitForm.weight}
                onChange={(e) => setExitForm(prev => ({ ...prev, weight: e.target.value }))}
                required={false}
              />
              <FormField
                label="Price ($)"
                type="number"
                step="0.01"
                value={exitForm.price}
                onChange={(e) => setExitForm(prev => ({ ...prev, price: e.target.value }))}
                required={false}
              />
            </div>
            <button
              onClick={() => handleSubmit('exit', exitForm, setExitForm, {
                date: '', batchId: '', quantity: '', reason: 'sold', weight: '', price: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Exit Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'sales' && (
        <Modal title="Add Production Sales Record" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <FormField
              label="Date"
              type="date"
              value={salesForm.date}
              onChange={(e) => setSalesForm(prev => ({ ...prev, date: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Product Type"
                type="select"
                value={salesForm.type}
                onChange={(e) => setSalesForm(prev => ({ ...prev, type: e.target.value }))}
                options={[
                  { value: 'meat', label: 'Meat/Birds' },
                  { value: 'eggs', label: 'Eggs' },
                  { value: 'manure', label: 'Manure' },
                  { value: 'feathers', label: 'Feathers' },
                  { value: 'other', label: 'Other' }
                ]}
              />
              <FormField
                label="Batch ID"
                value={salesForm.batchId}
                onChange={(e) => setSalesForm(prev => ({ ...prev, batchId: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Quantity"
                type="number"
                value={salesForm.quantity}
                onChange={(e) => setSalesForm(prev => ({ ...prev, quantity: e.target.value }))}
              />
              <FormField
                label="Unit Price ($)"
                type="number"
                step="0.01"
                value={salesForm.unitPrice}
                onChange={(e) => setSalesForm(prev => ({ ...prev, unitPrice: e.target.value }))}
                required={false}
              />
            </div>
            <FormField
              label="Total Revenue ($)"
              type="number"
              step="0.01"
              value={salesForm.totalRevenue}
              onChange={(e) => setSalesForm(prev => ({ ...prev, totalRevenue: e.target.value }))}
              required={false}
            />
            <FormField
              label="Customer"
              value={salesForm.customer}
              onChange={(e) => setSalesForm(prev => ({ ...prev, customer: e.target.value }))}
              required={false}
              placeholder="Customer name or company"
            />
            <button
              onClick={() => handleSubmit('sales', salesForm, setSalesForm, {
                date: '', type: 'meat', batchId: '', quantity: '', unitPrice: '', totalRevenue: '', customer: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Sales Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'financial' && (
        <Modal title="Add Health & Care Expense" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <FormField
              label="Date"
              type="date"
              value={financialForm.date}
              onChange={(e) => setFinancialForm(prev => ({ ...prev, date: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Type"
                type="select"
                value={financialForm.type}
                onChange={(e) => setFinancialForm(prev => ({ ...prev, type: e.target.value }))}
                options={[
                  { value: 'expense', label: 'Health Expense' },
                  { value: 'income', label: 'Health Income' }
                ]}
              />
              <FormField
                label="Category"
                type="select"
                value={financialForm.category}
                onChange={(e) => setFinancialForm(prev => ({ ...prev, category: e.target.value }))}
                options={[
                  { value: 'feed', label: 'Feed & Nutrition' },
                  { value: 'medicine', label: 'Medicine & Vaccines' },
                  { value: 'veterinary', label: 'Veterinary Services' },
                  { value: 'health_supplements', label: 'Health Supplements' },
                  { value: 'maintenance', label: 'Equipment Maintenance' },
                  { value: 'cleaning', label: 'Cleaning & Disinfection' },
                  { value: 'other', label: 'Other Health Costs' }
                ]}
              />
            </div>
            <FormField
              label="Description"
              value={financialForm.description}
              onChange={(e) => setFinancialForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of health expense"
            />
            <FormField
              label="Amount ($)"
              type="number"
              step="0.01"
              value={financialForm.amount}
              onChange={(e) => setFinancialForm(prev => ({ ...prev, amount: e.target.value }))}
            />
            <button
              onClick={() => handleSubmit('financial', financialForm, setFinancialForm, {
                date: '', type: 'expense', category: 'feed', description: '', amount: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Financial Record
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'environmental' && (
        <Modal title="Add Environmental & Maintenance Record" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Date"
                type="date"
                value={environmentalForm.date}
                onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, date: e.target.value }))}
              />
              <FormField
                label="House Number"
                value={environmentalForm.houseNumber}
                onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, houseNumber: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Temperature (°C)"
                type="number"
                step="0.1"
                value={environmentalForm.temperature}
                onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, temperature: e.target.value }))}
                required={false}
              />
              <FormField
                label="Humidity (%)"
                type="number"
                step="0.1"
                value={environmentalForm.humidity}
                onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, humidity: e.target.value }))}
                required={false}
              />
            </div>
            <FormField
              label="Water Consumption (L)"
              type="number"
              step="0.1"
              value={environmentalForm.waterConsumption}
              onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, waterConsumption: e.target.value }))}
              required={false}
            />
            <FormField
              label="Maintenance Type"
              type="select"
              value={environmentalForm.maintenanceType}
              onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, maintenanceType: e.target.value }))}
              required={false}
              options={[
                { value: 'cleaning', label: 'Cleaning' },
                { value: 'disinfection', label: 'Disinfection' },
                { value: 'equipment', label: 'Equipment Maintenance' },
                { value: 'repair', label: 'Repair' },
                { value: 'ventilation', label: 'Ventilation Check' },
                { value: 'water_system', label: 'Water System' }
              ]}
            />
            <FormField
              label="Notes"
              type="textarea"
              value={environmentalForm.notes}
              onChange={(e) => setEnvironmentalForm(prev => ({ ...prev, notes: e.target.value }))}
              required={false}
              placeholder="Additional observations, maintenance details, etc."
            />
            <button
              onClick={() => handleSubmit('environmental', environmentalForm, setEnvironmentalForm, {
                date: '', houseNumber: '', temperature: '', humidity: '', 
                waterConsumption: '', maintenanceType: '', notes: ''
              })}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Environmental Record
            </button>
          </div>
        </Modal>
      )}
      { }
      <Footer/>
    </div>
  );
};

export default PoultryManagement;